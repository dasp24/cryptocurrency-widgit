import React from 'react';
import _ from 'underscore';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { relative } from 'path';

// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
// {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                   
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
     {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


class PieChartFun extends React.Component {
    getData() {
        const {currencies,worth} = this.props;
        const total =  _.reduce(currencies,(acc,coin) => {
            acc += Number(coin.price) * Number(worth[coin.name]); 
            return acc;                            
          },0);
       return _.map(worth,((coinAmount,coinName) => {
            return { 
                name: coinName,
                value: (coinAmount * currencies[coinName].price) / total  * 100
             };
        }));
    }

    render () {
        return (
          <PieChart width={this.props.size} height={350} style={'position:absolute;'}>
          <Pie
            data={this.getData()} 
            cx={'50%'} 
            cy={'auto'} 
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100} 
            fill="#8884d8"
          >
          {
          this.getData().map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
            {/* {this.renderCells()} */}
          </Pie>
        </PieChart>
      );
    }
}

export default PieChartFun;