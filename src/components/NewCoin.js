import React from 'react';

class NewCoin extends React.Component {
    render() {
        return (
            <div>
                  <input ref={ref => this.currencyInputRef = ref}  placeholder="Insert coin ID here..."/>
                  <button className="input_buttons" onClick={() => {
                      this.props.addCoin(this.currencyInputRef.value);
                      this.currencyInputRef.value = null;
                    }}>Add Coin</button>
                  <button className="remove_buttons" onClick={() => this.props.resetCoin()}>reset</button>
            </div>
        );
  }
}

export default NewCoin;