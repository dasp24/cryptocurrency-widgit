import React from 'react';
import _ from 'underscore';

class Total extends React.Component {
    render() {
        const {currencies, exchangeRate, worth} = this.props;
        return (
                <div className="numbers">£{currencies ? _.reduce(currencies,(acc,coin) => {
                    acc += (Number(coin.price) / Number(exchangeRate)) * Number(worth[coin.name]||0); 
                    return acc;                            
                  },0).toFixed(2) : null}
                </div>
        );
  }
}

export default Total;