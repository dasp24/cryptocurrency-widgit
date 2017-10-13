import React from 'react';
import fetch from 'node-fetch';
import _ from 'underscore';

import {
  getExchangeRate
} from './components/helperFunctions';
import idToName from './idToName.json';

/* eslint-disable no-unused-vars*/

import Currency from './components/Currency';
import Feed from './components/Feed';
import NewCoin from './components/NewCoin';
import TableTop from './components/TableTop';
import TableBottom from './components/TableBottom';
import NewFeed from './components/NewFeed';
import image from './background-image.jpg';

/* eslint-enable no-unused-vars*/

class Cryptocurrency extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyIds: [],
      currencies: {},
      nameToId: idToName,
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
            this.setState({
              currencies: _.extend(this.state.currencies, {
                [data.display_name]: {
                  name: data.display_name,
                  price: data.price_usd,
                  changeInDay: data.cap24hrChange,
                  id: data.id
                }
              }),
              [data.display_name]: this.state[data.display_name] ? this.state[data.display_name] : null
            });
          });
      });

    setTimeout(() => {
      getCoinAndValue(this.state.currencyIds);
      getExchangeRate().then((data) => this.setState({
        exchangeRate: data
      }));
    }, 500);

    setInterval(() => {
      console.log(this.state);
      getCoinAndValue(this.state.currencyIds);
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
    feed = feed.trim();
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
    id = id.trim();
    const idToCheck = id.split(' ').map((word) => word[0].toUpperCase() + word.split('').slice(1).join('').toLowerCase()).join(' ');
    if (this.state.nameToId[idToCheck]) {
      id = this.state.nameToId[idToCheck];
    }
    if (this.state.nameToId[id]) {
      id = this.state.nameToId[id];
    }
    id = id.toUpperCase();
    console.log(`getting coin ${id}, beep, boop, beep`);
    const idList = this.state.currencyIds.concat(id);
    if (this.state.currencyIds.includes(id)) {
      alert('This is a repeat request!');
    } else
      fetch(`http://coincap.io/page/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.display_name) {
          this.currencyInputRef.value = null;
          throw new Error('Invalid Coin');
        }
        localStorage.setItem('currencies', idList.join(','));
        this.setState({
          currencies: _.extend(this.state.currencies, {
            [data.display_name]: {
              name: data.display_name,
              price: data.price_usd,
              changeInDay: data.cap24hrChange,
              id: data.id
            }
          }),
          [data.display_name]: null,
          currencyIds: idList,
          nameToId: _.extend(this.state.nameToId, {
            [data.display_name]: data.id
          })
        });
      })
      .catch(() => alert('this coin doesn\'t exist'));
  }

  removeCoin(id, name) {
    console.log('removing coin ' + name);
    const index = this.state.currencyIds.indexOf(id);
    const savedList = localStorage.getItem('currencies').split(',');
    localStorage.removeItem('currencies');
    localStorage.setItem('currencies', (savedList.slice(0, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      currencyIds: this.state.currencyIds.slice(0, index).concat(this.state.currencyIds.slice(index + 1)),
      currencies: _.omit(this.state.currencies, name)
    });
  }

  render() {
    return (
      <div className='background' style={this.styles}>
      <div className='section'>
        <div className='add_coin'>
          <h2>Cryptocurrency widgit</h2>
          <NewCoin addCoin={this.addCoin}/> 
          <table className='centerTable'>
            <TableTop/>
              {this.state.currencies ? _.map(this.state.currencies,(coin) => 
                  <Currency data={coin} exchangeRate={this.state.exchangeRate} state={this.state} handleInputChange={this.handleInputChange} removeCoin={this.removeCoin}/>
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