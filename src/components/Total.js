import React from 'react';
import _ from 'underscore';

class Total extends React.Component {
    render() {
        const {currencies, worth} = this.props;
        return (
                <div id="total">Total Portfolio Worth: £{currencies ? _.reduce(currencies,(acc,coin) => {
                    acc += Number(coin.price) * Number(worth[coin.name] || 0); 
                    return acc;                            
                  },0).toFixed(2) : null}
                </div>
        );
  }
}

export default Total;