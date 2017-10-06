import React from 'react';
import {
  connect
} from 'react-redux';
import { Timeline } from 'react-twitter-widgets';

import {
  loadBitcoin, loadEthereum,loadLitecoin, loadExchangeRate, loadRipple
} from './redux/currencies/actions';

import Currency from './components/Currency';

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
      Ripple:0
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount() {
    this.props.loadBitcoin()
    this.props.loadEthereum()
    this.props.loadLitecoin()
    this.props.loadRipple()
    this.props.loadExchangeRate()
    this.intervals = [
      setInterval(() => this.props.loadBitcoin(), 60000),
      setInterval(() => this.props.loadEthereum(), 60000),
      setInterval(() => this.props.loadLitecoin(), 60000),
      setInterval(() => this.props.loadRipple(), 60000),
      setInterval(() => this.props.loadExchangeRate(), 60000)
    ];
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  }

  handleInputChange(name,value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { exchangeRate, currencies } = this.props;
    return (
      <div className="section">
          <div>
            <div>
        <h2>Live tracker of my favourites currencies:</h2>
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
        <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'jimmysong'
              }}
             className="text-right"
              options={{
                username: 'jimmysong',
                height: '300',
                width: '500'
              }}
            />
        </div>
        <div>
        <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'bobbyclee'
              }}
             className="text-right"
              options={{
                username: 'bobbyclee',
                height: '300',
                width: '500'
              }}
            />
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'PConfidential'
              }}
             className="text-right"
              options={{
                username: 'PConfidential',
                height: '300',
                width: '500'
              }}
            />
            </div>
            </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // bitcoin: state.currencies.bitcoin,
    // ethereum: state.currencies.ethereum,
    // litecoin: state.currencies.litecoin,
    // ripple: state.currencies.ripple,
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

export default connect(mapStateToProps, mapDispatchToProps)(Cryptocurrency)