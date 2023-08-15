import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { fetchChartData } from '../../utils/ChartUtils';
import { DataContext } from '../../contexts/DataContext';
import { DateInterval } from '../../utils/Enums';
import { FormatMoney } from '../../utils/Utils';

const TransactionTable = () => {

    const { state } = useContext(DataContext);
    const { transactions } = state;
    const data = fetchChartData(transactions, DateInterval.MONTH);

    const fields = ['Total'];
    const summaries = {};
    fields.forEach(field => {
        const sum = data.reduce((acc, item) => acc + item[field], 0);
        summaries[field] = {
            'Average': sum/data.length, 
            'Total': sum
        }
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Average</th>
                    {data.map((item, index) => <th>{item.key}</th>)}
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {fields.map(field => (
                    <tr>
                        <td>{field}</td>
                        <td>{FormatMoney(summaries[field]['Average'])}</td>
                        {data.map((item, index) => <td>{FormatMoney(item[field])}</td>)}
                        <td>{FormatMoney(summaries[field]['Total'])}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TransactionTable;