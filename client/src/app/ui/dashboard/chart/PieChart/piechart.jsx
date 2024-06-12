import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Jan',
    loss: 4000,
    profit: 2400,
  },
  {
    month: 'Feb',
    loss: 3000,
    profit: 1398,
  },
  {
    month: 'Mar',
    loss: 2000,
    profit: 9800,
  },
  {
    month: 'Apr',
    loss: 2780,
    profit: 3908,
  },
  {
    month: 'May',
    loss: 1890,
    profit: 4800,
  },
  {
    month: 'Jun',
    loss: 2390,
    profit: 3800,
  },
  {
    month: 'Jul',
    loss: 3490,
    profit: 4300,
  },
  {
    month: 'Aug',
    loss: 3490,
    profit: 4300,
  },
  {
    month: 'Sep',
    loss: 3490,
    profit: 4300,
  },
  {
    month: 'Oct',
    loss: 3490,
    profit: 4300,
  },
  {
    month: 'Nov',
    loss: 3490,
    profit: 4300,
  },
  {
    month: 'Dec',
    loss: 3490,
    profit: 4300,
  },
];

export default class SimpleBarChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="loss" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
