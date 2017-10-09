import React from 'react';
import {
  connect
} from 'react-redux';


import {
  loadBitcoin, loadEthereum,loadLitecoin, loadExchangeRate, loadRipple
} from './redux/currencies/actions';

import Currency from './components/Currency';
import Feed from './components/Feed';

// so it would be nice to select the currencies you want

// then put in the values of the coin you have

// total at the bottom

class Cryptocurrency extends React.Component {
  constructor() {
    super ();
    this.state = {
      Bitcoin: 0,
      Ethereum: 0,
      Litecoin:0,
      Ripple:0,
      feeds:['jimmysong']
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.props.loadBitcoin();
    this.props.loadEthereum();
    this.props.loadLitecoin();
    this.props.loadRipple();
    this.props.loadExchangeRate();
    this.intervals = [
      setInterval(() => this.props.loadBitcoin(), 60000),
      setInterval(() => this.props.loadEthereum(), 60000),
      setInterval(() => this.props.loadLitecoin(), 60000),
      setInterval(() => this.props.loadRipple(), 60000),
      setInterval(() => this.props.loadExchangeRate(), 60000)
    ];
  }

  handleInputChange(name,value) {
     value.match(/^[0-9]+$/) ?
        this.setState({
        [name]: value
      }) :
    this.setState({
      [name]: null
    });
  }

  onClick() {
    this.setState({ feeds: this.state.feeds.concat(this.twitterInputRef.value) });
    localStorage.setItem('feeds',this.state.feeds.concat(this.twitterInputRef.value));
    this.twitterInputRef.value = null;
  }

  removeFeed(profile) {
      const index = this.state.feeds.indexOf(profile);
      const savedList = localStorage.getItem('feeds').split(',');
      localStorage.removeItem('feeds');
      localStorage.setItem('feeds',(savedList.slice(0,index).concat(savedList.slice(index+1))).join(','))
      this.setState({feeds: this.state.feeds.slice(0,index).concat(this.state.feeds.slice(index + 1))});

  }

  render() {
    const { exchangeRate, currencies } = this.props;
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
            <td>Your total</td>
            <td>Worth</td>
          </tr>
  
          {currencies.map((coin) => 
              <Currency coin={coin.name} price={coin.price} changeInDay={coin.changeInDay} exchangeRate={exchangeRate} state={this.state} handleInputChange={this.handleInputChange}/>
          )}

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>£{currencies.reduce((acc,coin) => {
                acc += (coin.price / exchangeRate) * this.state[coin.name]; 
                return acc;                            
              },0).toFixed(2)}
            </td>
          </tr>
        </table>
        <div>
        <input ref={ref => this.inputRef = ref}  placeholder="twitter feed..."/>
        <button >Add feed</button>
        </div>
        {this.state.feeds.map((profile) => <Feed profile={profile}/>

        )}
            </div>
            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: [
      state.currencies.bitcoin,
      state.currencies.ethereum,
      state.currencies.litecoin,
      state.currencies.ripple
    ],
    exchangeRate: state.currencies.exchangeRate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadBitcoin: () => dispatch(loadBitcoin()),
    loadEthereum: () => dispatch(loadEthereum()),
    loadLitecoin: () => dispatch(loadLitecoin()),
    loadRipple: () => dispatch(loadRipple()),
    loadExchangeRate: () => dispatch(loadExchangeRate())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cryptocurrency);