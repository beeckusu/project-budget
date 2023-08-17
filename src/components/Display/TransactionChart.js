import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataContext } from '../../contexts/DataContext';
import { fetchChartData } from '../../utils/ChartUtils';
import { FormatMoney } from '../../utils/Utils';
import { ChartCategory, ChartStyle } from '../../utils/Enums';
import { GraphContext } from '../../contexts/GraphContext';


const SummaryChart = ({ transactions }) => {

    const { state } = useContext(GraphContext);
    const { state: dataState } = useContext(DataContext);
    const { descriptions, tags } = dataState;
    const { dateInterval, chartCategory, chartStyle } = state;

    const data = fetchChartData(transactions, dateInterval, chartCategory);

    return (
        <BarChart className='layout-center' width={1200} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis formatter={FormatMoney} />
            <Tooltip formatter={FormatMoney} />
            <Legend />
            {chartCategory === ChartCategory.NONE && <Bar key="key" dataKey="Total" stackId="Total" fill="#8884d8" />}
            {chartCategory === ChartCategory.DESCRIPTION &&
                descriptions.map((description) => {
                    let stackId = chartStyle === ChartStyle.STACKED ? "1" : description.id;
                    return <Bar key={description.id} dataKey={description.name} stackId={stackId} fill={description.tag.colour} />
                })}

            {chartCategory === ChartCategory.TAG &&
                tags.map((tag) => {
                    let stackId = chartStyle === ChartStyle.STACKED ? "1" : tag.id;
                    return <Bar key={tag.id} dataKey={tag.name} stackId={stackId} fill={tag.colour} />
                })}

        </BarChart>
    );
};


const TransactionChart = () => {

    const { state } = useContext(DataContext);
    const { transactions } = state;

    return (
        <SummaryChart transactions={transactions === null ? [] : transactions} />
    );
}


export default TransactionChart;