import React from 'react';

class TableBottom extends React.Component {
    render() {
        return (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td className="numbers">£{this.props.currencies ? this.props.currencies.reduce((acc,coin) => {
                    acc += Number((this.props.state[coin.name]) / Number(this.props.exchangeRate)) * Number(this.props.state[(coin.name) + 'value']); 
                    return acc;                            
                  },0).toFixed(2) : null}
                </td>
                <td></td>
            </tr>
        );
  }
}

export default TableBottom;