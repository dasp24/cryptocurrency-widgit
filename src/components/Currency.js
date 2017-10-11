import React from 'react';

class Currency extends React.Component {
    onInput() {
        const name = this.inputRef.name;
        const value = this.inputRef.value;
        this.props.handleInputChange(name,value);
    }
    render() {
        const data = this.props.data;
        const exchangeRate = this.props.exchangeRate;
        return (
                <tr id={data.id}>
                  <td className="name">{data.name}</td>
                  <td className="numbers"> {data.price / exchangeRate ? (data.price / exchangeRate).toFixed(4) : 'loading'}</td>
                  <td style={(data.changeInDay > 0) ? {backgroundColor: '#2db300'} : {backgroundColor: '#ff704d'}}>{data.changeInDay}%{(data.changeInDay > 0) ? <a className="arrows">⬆️</a> : <a className="arrows">⬇️</a>}</td>
                  <td><input className="input" ref={ref => this.inputRef = ref} style={{border:'none'}} type="integer" name={data.name} placeholder="enter value..." onInput={this.onInput.bind(this)}/></td>
                  <td className="numbers">£{this.props.state[data.name] ? (this.props.state[data.name] * data.price / exchangeRate).toFixed(2) : 0}</td>     
                  <td><button className="table_buttons" onClick={() => this.props.removeCoin(data.id,data.name)}>remove</button></td>    
                </tr>
        );
  }
}

export default Currency;