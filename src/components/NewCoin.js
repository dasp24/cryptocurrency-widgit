import React from 'react';

class NewCoin extends React.Component {
    render() {
        return (
            <tr>
                 <td> <input className="table_buttons" onKeyPress={(e) => {if (e.key === 'Enter') {
                      this.props.addCoin(this.currencyInputRef.value);
                      this.currencyInputRef.value = null;
                  }}} ref={ref => this.currencyInputRef = ref}  placeholder="Add coin..."/></td>
                 <td><i onClick={() => {
                      this.props.addCoin(this.currencyInputRef.value);
                      this.currencyInputRef.value = null;
                    }} className="fa fa-plus-square" aria-hidden="true"></i></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            </tr>
        );
  }
}

export default NewCoin;