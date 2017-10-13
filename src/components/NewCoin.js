import React from 'react';

class NewCoin extends React.Component {
    render() {
        return (
            <div>
                  <input onKeyPress={(e) => {if (e.key === 'Enter') {
                      this.props.addCoin(this.currencyInputRef.value);
                      this.currencyInputRef.value = null;
                  }}} ref={ref => this.currencyInputRef = ref}  placeholder="Add coin..."/>
                  <button className="input_buttons" onClick={() => {
                      this.props.addCoin(this.currencyInputRef.value);
                      this.currencyInputRef.value = null;
                    }}>Add Coin</button>
            </div>
        );
  }
}

export default NewCoin;