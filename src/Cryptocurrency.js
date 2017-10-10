import React from 'react';
import fetch from 'node-fetch';

import {getExchangeRate
} from './components/helperFunctions';

import Currency from './components/Currency';
import Feed from './components/Feed';

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
    this.addFeed = this.addFeed.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.addCoin = this.addCoin.bind(this);
    this.removeCoins = this.removeCoins.bind(this);
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

    setTimeout(() => {
    getCoinAndValue(this.state.currencyIds);
    getExchangeRate().then((data) => this.setState({
      exchangeRate: data
    }));
    },500);

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

  addFeed() {
    if (this.twitterInputRef.value) {
    this.setState({
      feeds: this.state.feeds.concat(this.twitterInputRef.value)
    });
    localStorage.setItem('feeds', this.state.feeds.concat(this.twitterInputRef.value));
    this.twitterInputRef.value = null;
    }
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
    console.log('getting new coin, beep, boop, beep');
    const id = this.currencyInputRef.value.toUpperCase();
    const IdList = this.state.currencyIds.concat(id);
    if (this.state.currencyIds.includes(id)) {
      this.currencyInputRef.value = null;
      alert('This is a repeat request!');
    }
    else
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
          changeInDay: data.cap24hrChange,
          id:data.id
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

  removeCoin(id) {
    const index = this.state.currencyIds.indexOf(id);
    const savedList = localStorage.getItem('currencies').split(',');
    localStorage.removeItem('currencies');
    localStorage.setItem('currencies', (savedList.slice(0, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      currencyIds: this.state.currencyIds.slice(0, index).concat(this.state.currencyIds.slice(index + 1)),
      currencies: this.state.currencies.slice(0, index).concat(this.state.currencies.slice(index + 1))
  });
  console.log(this.state)
  }

  removeCoins() {
    localStorage.removeItem('currencies');
  }


  render() {
    return (
      <div className="section">
          <div>
            <div>
        <h2>Cryptocurrency widgit</h2>
        <input ref={ref => this.currencyInputRef = ref}  placeholder="Please you coin Id"/>
        <button onClick={() => this.addCoin()}>Add Coin</button>
        <button onClick={() => this.removeCoins()}>Reset coins</button>
        <table>
          <tr>
            <td>Coin</td>
            <td>Worth</td>
            <td>Change in 24 hours</td>
            <td>Amount</td>
            <td>Your total</td>
            <td>Remove</td>
          </tr>
  
          {this.state.currencies ? this.state.currencies.map((coin) => 
              <Currency id={coin.id} coin={coin.name} price={coin.price} changeInDay={coin.changeInDay} exchangeRate={this.state.exchangeRate} state={this.state} handleInputChange={this.handleInputChange} removeCoin={this.removeCoin}/>
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
        <button onClick={this.addFeed}>Add feed</button>
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