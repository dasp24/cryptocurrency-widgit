import React from 'react';

class TableTop extends React.Component {
    render() {
        return (
            <tr>
                <td>Coin</td>
                <td>Worth</td>
                <td>Change in 24 hours</td>
                <td>Amount</td>
                <td>Edit</td>                
                <td>Your total</td>
                <td></td>
            </tr>
        );
  }
}

export default TableTop;