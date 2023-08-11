import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataContext } from '../../contexts/DataContext';
import { MoneyFormatter, fetchChartData } from '../../utils/ChartUtils';


const SummaryChart = ({transactions}) => {

    const data = fetchChartData(transactions);
    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis formatter={MoneyFormatter}/>
            <Tooltip formatter={MoneyFormatter}/>
            <Legend />
            <Bar key="key" dataKey="Total" stackId="Total" fill="#8884d8" />
        </BarChart>
    );
};

const TransactionChart = () => {

    const { state } = useContext(DataContext);
    const { transactions } = state;

    return (
        <div>
            <SummaryChart transactions={transactions == null? []: transactions}/>
        </div>
    );
}

export default TransactionChart;