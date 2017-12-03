import React from 'react';
import fetch from 'node-fetch';
import _ from 'underscore';
import { WindowResizeListener } from 'react-window-resize-listener'

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
      size: window.outerWidth
    };
    this.styles = {
      backgroundImage: `url(${image})`
    };
    this.addFeed = this.addFeed.bind(this);
    this.removeFeed = this.removeFeed.bind(this);
    this.addCoin = this.addCoin.bind(this);
    this.removeCoin = this.removeCoin.bind(this);
    this.editValue = this.editValue.bind(this);
  }
  componentDidMount() {

    if (localStorage.getItem('currencies')) {
      const idList = _.uniq(localStorage.getItem('currencies').split(','))
      this.setState({
      currencyIds: idList
    });
  }
    if (localStorage.getItem('feeds')) this.setState({
      feeds: this.state.feeds.concat(localStorage.getItem('feeds').split(','))
    });

    const getCoinAndValue = () =>
      this.state.currencyIds.forEach((coin) => {
        fetch(`https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=GBP`,{cache: "no-cache"})
          .then((response) => response.json())
          .then((data) => {
            const value = localStorage.getItem(`${coin}`);        
            this.setState({
              currencies: { ...this.state.currencies, [data[0].name]: {
                name: data[0].name,
                price: data[0].price_gbp,
                changeInDay: data[0].percent_change_24h,
                id: data[0].symbol
              } },
              worth: {...this.state.worth, [data[0].name]:value}
            });
          });
      });

    setTimeout(() => {
      getCoinAndValue(this.state.currencyIds);
      const idList = _.uniq(this.state.currencyIds).join(',')
      localStorage.setItem('currencies',idList);
      console.log(this.state);      
    }, 200);

    setInterval(() => {
      console.log(this.state);
      // update price and exhcnage rate only
      getCoinAndValue(this.state.currencyIds);
    }, 60000);

  }

  handleInputChange(name, value) {
    value.match(/^[0-9]{0,}([.][0-9]{1,})?$/) ?
      this.setState({
        worth: {...this.state.worth, [name]:value}}) :
        this.setState({
          worth: {...this.state.worth, [name]:0}})
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

  addCoin(coin) {
    if(coin) {
    const value = prompt("Please enter the amount");
    coin = coin.trim().replace(' ','-').toLowerCase();
    console.log(`getting coin ${coin}, beep, boop, beep`);
    const idList = this.state.currencyIds.concat(coin) || [coin];
    if (this.state.currencyIds.includes(coin)) {
      alert('This is a repeat request!');
    } else
      fetch(`https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=GBP`,{cache: "no-cache"})
      .then((res) => {
        return res.json();
      })
      .then((data,err) => {
        if (!data[0].price_gbp) {
          this.currencyInputRef.value = null;
          throw new Error('Invalid Coin');
        }
        localStorage.setItem('currencies', idList.join(','));
        if (value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)) localStorage.setItem(`${coin}`, value);
        else localStorage.setItem(`${coin}`, 0)
        this.setState({
          currencies: { ...this.state.currencies, [data[0].name]: {
            name: data[0].name,
            price: data[0].price_gbp,
            changeInDay: data[0].percent_change_24h,
            id: data[0].symbol
          } },
          worth:{...this.state.worth, [data[0].name]: (value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)) ? value:0},
          currencyIds:  idList,
          nameToId: {...this.state.nameToId, [data.display_name]: data.id }
        });
      })
      .catch(() => alert('this coin doesn\'t exist'));
    }
  }

  editValue(id,name) {
    const storageName = name.toLowerCase();
    const value = prompt("Please enter the amount");
    if (value && value.match(/^[0-9]{0,}([.][0-9]{1,})?$/)) {
      localStorage.removeItem(`${storageName}`);
      localStorage.setItem(`${storageName}`, value);
      this.setState({
        worth: {...this.state.worth, [name]: value}
      });
    }
  }

  removeCoin(name) {
    console.log('removing coin ' + name);
    let id = name.replace(' ','-').toLowerCase();
    const index = this.state.currencyIds.indexOf(id);
    const start = index === 0 ? index - 1 : 0;
    const newCurrencyIds = this.state.currencyIds.slice(start, index).concat(this.state.currencyIds.slice(index + 1))
    const savedList = localStorage.getItem('currencies').split(',');
    localStorage.removeItem('currencies');
    localStorage.removeItem(`${id}`);    
    localStorage.setItem('currencies', (savedList.slice(start, index).concat(savedList.slice(index + 1))).join(','));
    this.setState({
      currencyIds:  newCurrencyIds,
      currencies: _.omit(this.state.currencies, name),
      worth: _.omit(this.state.worth, name)
    });
  }


  render() {
    return (
      <div className='section'>
        <WindowResizeListener onResize={windowSize => 
          this.setState({size: windowSize.windowWidth})
        }/>
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
          <div>
            <Total currencies={this.state.currencies} exchangeRate={this.state.exchangeRate} worth={this.state.worth} />
            <PieChartFun id="pie" size={this.state.size} worth={this.state.worth} currencies={this.state.currencies}/>
          </div>
          {/* <NewFeed addFeed={this.addFeed}/>
          {this.state.feeds.map((profile) => <Feed removeFeed={this.removeFeed} profile={profile}/>)} */}
        </div>
      </div>
    
    );
  }
}

export default Cryptocurrency;