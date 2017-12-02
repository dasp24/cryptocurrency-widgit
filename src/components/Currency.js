import React from 'react';

class Currency extends React.Component {
    render() {
        const {data,worth} = this.props;

        return (
                <tr id={data.id}>
                  <td className="name">{data.name}</td>
                  <td className="numbers"> {data.price  ? Number(data.price).toFixed(4) : 'loading'}</td>
                  <td style={(data.changeInDay > 0) ? {backgroundColor: '#2db300'} : {backgroundColor: '#ff704d'}}>{data.changeInDay}%{(data.changeInDay > 0) ? <i className="fa fa-arrow-up" aria-hidden="true"></i> : <i className="fa fa-arrow-down" aria-hidden="true"></i>}</td>
                  <td>{worth[data.name]}</td>
                  <td><i onClick={() => this.props.editValue(data.id,data.name)} className="fa fa-pencil" aria-hidden="true"></i></td>
                  <td className="numbers">£{worth[data.name] ? (worth[data.name] * data.price).toFixed(2) : 0}</td>     
                  <td><i onClick={() => this.props.removeCoin(data.name)}className ="fa fa-trash table_buttons" aria-hidden="true"></i></td>    
                </tr>
        );
  }
}

export default Currency;