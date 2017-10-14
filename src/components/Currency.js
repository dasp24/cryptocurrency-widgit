import React from 'react';

class Currency extends React.Component {
    render() {
        const {data,exchangeRate,worth} = this.props;

        return (
                <tr id={data.id}>
                  <td className="name">{data.name}</td>
                  <td className="numbers"> {data.price / exchangeRate ? (data.price / exchangeRate).toFixed(4) : 'loading'}</td>
                  <td style={(data.changeInDay > 0) ? {backgroundColor: '#2db300'} : {backgroundColor: '#ff704d'}}>{data.changeInDay}%{(data.changeInDay > 0) ? <a className="arrows">⬆️</a> : <a className="arrows">⬇️</a>}</td>
                  <td>{worth[data.name]}</td>
                  <td><i onClick={() => this.props.editValue(data.id,data.name)} className="fa fa-pencil" aria-hidden="true">></i></td>
                  <td className="numbers">£{worth[data.name] ? (worth[data.name] * data.price / exchangeRate).toFixed(2) : 0}</td>     
                  <td><i onClick={() => this.props.removeCoin(data.id,data.name)}className ="fa fa-trash table_buttons" aria-hidden="true"></i></td>    
                </tr>
        );
  }
}

export default Currency;