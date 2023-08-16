import { useContext } from 'react';
import { SortableTable } from '../SideBar/Utils';
import { DataContext } from '../../contexts/DataContext';
import { GraphContext } from '../../contexts/GraphContext';
import { fetchChartData } from '../../utils/ChartUtils';
import { ChartCategory, DateInterval } from '../../utils/Enums';
import { FormatMoney } from '../../utils/Utils';


const TransactionTable = () => {

    const { state } = useContext(DataContext);
    const { transactions } = state;

    const { state: graphState } = useContext(GraphContext);
    const { chartCategory } = graphState;

    const data = fetchChartData(transactions, DateInterval.MONTH, chartCategory);

    let fields = [];
    switch (chartCategory) {
        case ChartCategory.NONE:
            fields = ['Total'];
            break;

        case ChartCategory.DESCRIPTION:
            fields = Array.from(state.descriptions.map(description => description.name));
            break;

        case ChartCategory.TAG:
            fields = Array.from(state.tags.map(tag => tag.name));
            break;
    }

    const tableData = [];
    fields.forEach(field => {
        let entry = {
            'name': field,
        };
        let sum = 0;
        data.forEach(month => {
            entry[month.key] = month[field];
            sum += (month[field] != null ? month[field] : 0);
        });
        sum = sum !== null ? sum : 0;
        entry['Average'] = data.length != 0 ? sum / data.length : 0;
        entry['Total'] = sum;
        tableData.push(entry);
    });

    const schema = [{
        name: '',
        getProperty: (row) => row.name,
        displayField: (row) => row.name,
        sort: true,
    }, {
        name: 'Average',
        property: 'Average',
        getProperty: (row) => row.Average,
        displayField: (row) => FormatMoney(row.Average),
        sort: true,
    }];

    data.forEach(month => {
        schema.push({
            name: month.key,
            property: month.key,
            getProperty: (row) => row[month.key],
            displayField: (row) => FormatMoney(row[month.key]),
            sort: true,
        });
    });
    schema.push({
        name: 'Total',
        property: 'Total',
        getProperty: (row) => row.Total,
        displayField: (row) => FormatMoney(row.Total),
        sort: true
    })

    return (
        <SortableTable schema={schema} data={tableData} id={state.id} />
    )
}

export default TransactionTable;