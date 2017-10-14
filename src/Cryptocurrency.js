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
import Total from './components/Total';
import NewFeed from './components/NewFeed';
import image from './background-image.jpg';
import PieChartFun from './components/PieChartFun';

/* eslint-enable no-unused-vars*/

class Cryptocurrency extends React.Component {
  constructor() {
    super();
    this.state = {
      worth:{},
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
    this.editValue = this.editValue.bind(this);
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
            const value = localStorage.getItem(`${coinID}`);        
            this.setState({
              currencies: { ...this.state.currencies, [data.display_name]: {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange,
                id: data.id
              } },
              worth: {...this.state.worth, [data.display_name]:value}
            });
          });
      });

    setTimeout(() => {
      getCoinAndValue(this.state.currencyIds);
      getExchangeRate().then((data) => this.setState({
        exchangeRate: data
      }));
    }, 200);

    setInterval(() => {
      console.log(this.state);
      // update price and exhcnage rate only
      getCoinAndValue(this.state.currencyIds);
      getExchangeRate().then((data) => this.setState({
        exchangeRate: data
      }));
    }, 30000);

  }

  handleInputChange(name, value) {
    value.match(/^(\d+)?([.]?\d{0,})?$/) ?
      this.setState({
        worth: {...this.state.worth, [name]:value}}) :
        this.setState({
          worth: {...this.state.worth, [name]:null}})
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
    if(id) {
    const value = prompt("Please enter the amount");
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
        localStorage.setItem(`${id}`, value);
        this.setState({
          currencies: { ...this.state.currencies, [data.display_name]: {
            name: data.display_name,
            price: data.price_usd,
            changeInDay: data.cap24hrChange,
            id: data.id
          } },
          worth:{...this.state.worth, [data.display_name]: value},
          currencyIds: idList,
          nameToId: {...this.state.nameToId, [data.display_name]: data.id }
        });
      })
      .catch(() => alert('this coin doesn\'t exist'));
    }
  }

  removeCoin(id, name) {
    console.log('removing coin ' + name);
    const index = this.state.currencyIds.indexOf(id);
    const savedList = localStorage.getItem('currencies').split(',');
    localStorage.removeItem('currencies');
    localStorage.removeItem(`${name}`);    
    localStorage.setItem('currencies', (savedList.slice(0, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      currencyIds: this.state.currencyIds.slice(0, index).concat(this.state.currencyIds.slice(index + 1)),
      currencies: _.omit(this.state.currencies, name),
      worth: _.omit(this.state.worth, name)
    });
  }

  editValue(id,name) {
    const value = prompt("Please enter the amount");
    localStorage.removeItem(`${id}`);
    localStorage.setItem(`${id}`, value);
    this.setState({
      worth: {...this.state.worth, [name]: value}
    });
  }

  render() {
    return (
      <div className='section'>
        <div className='add_coin'>
          <h2>Cryptocurrency Widgit</h2>
          <table className='centerTable'>
            <tbody>
            <TableTop/>
              {this.state.currencies ? _.map(this.state.currencies,(coin) => 
                  <Currency data={coin} exchangeRate={this.state.exchangeRate} worth={this.state.worth} handleInputChange={this.handleInputChange} editValue={this.editValue} removeCoin={this.removeCoin}/>
              ) : null}
            <NewCoin addCoin={this.addCoin}/> 
            </tbody>
          </table>
            <Total currencies={this.state.currencies} exchangeRate={this.state.exchangeRate} worth={this.state.worth} />
          <PieChartFun worth={this.state.worth} currencies={this.state.currencies}/>
          <NewFeed addFeed={this.addFeed}/>
          {this.state.feeds.map((profile) => <Feed removeFeed={this.removeFeed} profile={profile}/>)}
        </div>
      </div>
    
    );
  }
}

export default Cryptocurrency;