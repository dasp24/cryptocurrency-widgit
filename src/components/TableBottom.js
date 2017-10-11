import React from 'react';
import _ from 'underscore';

class TableBottom extends React.Component {
    render() {
        const currencies = this.props.currencies;
        const exchangeRate = this.props.exchangeRate;
        const state = this.props.state;
        return (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td className="numbers">£{currencies ? _.reduce(currencies,(acc,coin) => {
                    acc += (Number(coin.price) / Number(exchangeRate)) * Number(state[coin.name]); 
                    return acc;                            
                  },0).toFixed(2) : null}
                </td>
                <td></td>
            </tr>
        );
  }
}

export default TableBottom;