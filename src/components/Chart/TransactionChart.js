import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataContext } from '../../contexts/DataContext';
import { fetchChartData } from '../../utils/ChartUtils';
import { FormatMoney } from '../../utils/Utils';
import { Dropdown, Table } from 'react-bootstrap';
import { DateInterval } from '../../utils/Enums';
import { GraphContext, GraphProvider, ACTION_SET_DATE_INTERVAL } from '../../contexts/GraphContext';


const SummaryChart = ({ transactions }) => {

    const { state } = useContext(GraphContext);
    const { dateInterval } = state;

    const data = fetchChartData(transactions, dateInterval);

    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis formatter={FormatMoney} />
            <Tooltip formatter={FormatMoney} />
            <Legend />
            <Bar key="key" dataKey="Total" stackId="Total" fill="#8884d8" />
        </BarChart>
    );
};

const SummaryChartController = () => {

    const { dispatch } = useContext(GraphContext);

    const handleDateSelection = (dateInterval) => {

        dispatch({
            type: ACTION_SET_DATE_INTERVAL,
            payload: {
                dateInterval: dateInterval
            }
        });
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Date Interval</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="info">
                                Change Date Interval
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(DateInterval).map((key) => {
                                    return <Dropdown.Item onClick={() => handleDateSelection(DateInterval[key])}>{key}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}


const TransactionChart = () => {

    const { state } = useContext(DataContext);
    const { transactions } = state;

    return (
        <GraphProvider>
            <h1>Summary Chart</h1>
            <SummaryChartController />
            <SummaryChart transactions={transactions == null ? [] : transactions} />
        </GraphProvider>
    );
}


export default TransactionChart;