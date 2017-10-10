import React from 'react';

class Currency extends React.Component {
    onInput() {
        const name = this.inputRef.name;
        const value = this.inputRef.value;
        this.props.handleInputChange(name,value);
    }
    render() {
        return (
                <tr id={this.props.id}>
                  <td>{this.props.coin}</td>
                  <td className="numbers"> {this.props.price / this.props.exchangeRate ? (this.props.price / this.props.exchangeRate).toFixed(4) : 'loading'}</td>
                  <td style={(this.props.changeInDay > 0) ? {backgroundColor: '#2db300'} : {backgroundColor: '#ff704d'}}>{this.props.changeInDay}%{(this.props.changeInDay > 0) ? <a className="arrows">⬆️</a> : <a className="arrows">⬇️</a>}</td>
                  <td><input ref={ref => this.inputRef = ref} style={{border:'none'}} type="integer" name={this.props.coin} placeholder="enter value..." onInput={this.onInput.bind(this)}/></td>
                  <td>£{(this.props.state[this.props.coin] * this.props.price / this.props.exchangeRate).toFixed(2)}</td>     
                  <td><button onClick={() => this.props.removeCoin(this.props.id)}>remove</button></td>    
                </tr>
        );
  }
}

export default Currency;