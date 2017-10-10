import React from 'react';
import fetch from 'node-fetch';

import {getExchangeRate
} from './components/helperFunctions';

import Currency from './components/Currency';
import Feed from './components/Feed';
import NewCoin from './components/NewCoin';
import TableTop from './components/TableTop';
import TableBottom from './components/TableBottom';
import NewFeed from './components/NewFeed';
import image from './background-image.jpg';

class Cryptocurrency extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyIds: [],
      currencies: [],
      feeds: [],
      exchangeRate: null
    };
    this.styles = {
      backgroundImage: `url(${image})`
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addFeed = this.addFeed.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.addCoin = this.addCoin.bind(this);
    this.removeCoin = this.removeCoin.bind(this);
    this.resetCoin = this.resetCoin.bind(this);
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
        .then((data) => this.setState({[data.name + 'value']: data.price}));
      });
    };

    setTimeout(() => {
      getCoinAndValue(this.state.currencyIds);
      getExchangeRate().then((data) => this.setState({exchangeRate: data}));
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
     value.match(/^[0-9.]+$/) ?
        this.setState({
        [name]: value
      }) :
    this.setState({
      [name]: null
    });
  }

  addFeed(feed) {
    if (feed) {
      this.setState({
        feeds: this.state.feeds.concat(feed)
      });
      localStorage.setItem('feeds', this.state.feeds.concat(feed));
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

  addCoin(id) {
    console.log('getting new coin, beep, boop, beep');
    id = id.toUpperCase();
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
      .catch((err) => console.log(err));
  }

  removeCoin(id) {
    console.log('removing coin ' + id);
    const index = this.state.currencyIds.indexOf(id);
    const savedList = localStorage.getItem('currencies').split(',');
    localStorage.removeItem('currencies');
    localStorage.setItem('currencies', (savedList.slice(0, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      currencyIds: this.state.currencyIds.slice(0, index).concat(this.state.currencyIds.slice(index + 1)),
      currencies: this.state.currencies.slice(0, index).concat(this.state.currencies.slice(index + 1))
    });
    console.log(this.state);
  }

  resetCoin() {
    localStorage.removeItem('currencies');
  }

  render() {
    return (
          <div className="background" style={this.styles}>
            <div className="section">
              <div className="add_coin">
                <h2>Cryptocurrency widgit</h2>
                <NewCoin addCoin={this.addCoin} resetCoin={this.resetCoin}/>
                <table className="centerTable">
                  <TableTop/>
                    {this.state.currencies ? this.state.currencies.map((coin) => 
                        <Currency id={coin.id} coin={coin.name} price={coin.price} changeInDay={coin.changeInDay} exchangeRate={this.state.exchangeRate} state={this.state} handleInputChange={this.handleInputChange} removeCoin={this.removeCoin}/>
                    ) : null}
                  <TableBottom currencies={this.state.currencies} exchangeRate={this.state.exchangeRate} state={this.state} />
                </table>
                <NewFeed addFeed={this.addFeed}/>
                {this.state.feeds.map((profile) => <Feed removeFeed={this.removeFeed} profile={profile}/>)}
              </div>
            </div>
          </div>
    );
  }
}

export default Cryptocurrency;