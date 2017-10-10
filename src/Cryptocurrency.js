import React from 'react';
import fetch from 'node-fetch';

import {
} from './components/helperFunctions';

import Currency from './components/Currency';
import Feed from './components/Feed';

const fetch = require('node-fetch');

class Cryptocurrency extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyIds: [],
      currencies: [],
      feeds: [],
      exchangeRate: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.addCoin = this.addCoin.bind(this);
    this.removeCoin = this.removeCoin.bind(this);
  }
  componentDidMount() {

    if (localStorage.getItem('currencies')) this.setState({
      currencyIds: localStorage.getItem('currencies').split(',')
    });

    if (localStorage.getItem('feeds')) this.setState({
      feeds: this.state.feeds.concat(localStorage.getItem('feeds').split(','))
    });

   const getCoinAndValue = () => 
   this.state.currencyIds.forEach((coinID) => {
      fetch(`http://coincap.io/page/${coinID}`)
      .then((response) => response.json())
              .then((data) => {
                  return {
                  name: data.display_name,
                  price: data.price_usd,
                  changeInDay: data.cap24hrChange,
                  id:data.id
                  };
              })
              .then((data) => { 
                const newData = (this.state.currencies) ? this.state.currencies.concat([data]) : [data];
            this.setState({
              currencies: newData
              });
            this.setState({
              [data.name + 'value']: data.price
    });
            this.setState({
              [data.name]: null
            });
          });
      });

   const updateValue = () => {
    this.state.currencyIds.forEach((coinID) => {
    fetch(`http://coincap.io/page/${coinID}`)
    .then((response) => response.json())
            .then((data) => {
              this.setState({[data.name + 'value']: data.price});
            });
      });
  };

   const getExchangeRate = () => fetch('http://api.fixer.io/latest?symbols=USD&base=GBP')
    .then((response) => response.json())
    .then((data) =>
        data.rates.USD
    )
    .then((data) => this.setState({exchangeRate:data}));
    getCoinAndValue(this.state.currencyIds);
    getExchangeRate();
    setInterval(() => {
      console.log(this.state);
      updateValue(this.state.currencyIds);
      getExchangeRate().then((data) => this.setState({
        exchangeRate: data
      }));
    }, 30000);

  }

  handleInputChange(name, value) {
     value.match(/^[0-9]+$/) ?
        this.setState({
        [name]: value
      }) :
    this.setState({
      [name]: null
    });
  }

  onClick() {
    this.setState({
      feeds: this.state.feeds.concat(this.twitterInputRef.value)
    });
    localStorage.setItem('feeds', this.state.feeds.concat(this.twitterInputRef.value));
    this.twitterInputRef.value = null;
  }

  removeFeed(profile) {
      const index = this.state.feeds.indexOf(profile);
      const savedList = localStorage.getItem('feeds').split(',');
      localStorage.removeItem('feeds');
    localStorage.setItem('feeds', (savedList.slice(0, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      feeds: this.state.feeds.slice(0, index).concat(this.state.feeds.slice(index + 1))
    });
  }

  addCoin() {
    const id = this.currencyInputRef.value.toUpperCase();
    const IdList = this.state.currencyIds.concat(id);

    fetch(`http://coincap.io/page/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.display_name) {
          this.currencyInputRef.value = null;
          throw new Error('Invalid Coin');
  }
        return {
          name: data.display_name,
          price: data.price_usd,
          changeInDay: data.cap24hrChange
        };
      })
      .then((data) => {
        const newData = (this.state.currencies) ? this.state.currencies.concat([data]) : [data];
        localStorage.setItem('currencies', this.state.currencyIds.concat(id));
        this.setState({
          currencies: newData
        });
        this.setState({
          [data.name + 'value']: data.price
        });
        this.setState({
          [data.name]: null
        });
        this.setState({
          currencyIds: IdList
        });
        return data;
      })
      .then(() => this.currencyInputRef.value = null)
      .catch((err) => console.log(err));

  }

  removeCoin() {
    localStorage.removeItem('currencies');
  }


  render() {
    return (
      <div className="section">
          <div>
            <div>
        <h2>Cryptocurrency widgit</h2>
        <table>
          <tr>
            <td>Coin</td>
            <td>Worth</td>
            <td>Change in 24 hours</td>
            <td>Amount</td>
            <td>Your total</td>
          </tr>
  
          {this.state.currencies ? this.state.currencies.map((coin) => 
              <Currency coin={coin.name} price={coin.price} changeInDay={coin.changeInDay} exchangeRate={this.state.exchangeRate} state={this.state} handleInputChange={this.handleInputChange}/>
          ) : null}

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>£{this.state.currencies ? this.state.currencies.reduce((acc,coin) => {
                acc += Number((this.state[coin.name]) / Number(this.state.exchangeRate)) * Number(this.state[(coin.name) + 'value']); 
                return acc;                            
              },0).toFixed(2) : null}
            </td>
          </tr>
        </table>
        <div>
        <input ref={ref => this.twitterInputRef = ref}  placeholder="twitter feed..."/>
        <button onClick={this.onClick}>Add feed</button>
        </div>
        {this.state.feeds.map((profile) => <Feed removeFeed={this.removeFeed} profile={profile}/>

        )}
            </div>
            </div>
      </div>
    );
  }
}

export default Cryptocurrency;