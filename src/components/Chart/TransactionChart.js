import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataContext } from '../../contexts/DataContext';
import { fetchChartData } from '../../utils/ChartUtils';
import { FormatMoney } from '../../utils/Utils';
import { Dropdown, Table } from 'react-bootstrap';
import { ChartCategory, DateInterval, ChartStyle } from '../../utils/Enums';
import { GraphContext, GraphProvider, ACTION_SET_DATE_INTERVAL, ACTION_SET_CHART_CATEGORY, ACTION_SET_CHART_STYLE } from '../../contexts/GraphContext';


const SummaryChart = ({ transactions }) => {

    const { state } = useContext(GraphContext);
    const { state: dataState } = useContext(DataContext);
    const { descriptions, tags } = dataState;
    const { dateInterval, chartCategory, chartStyle } = state;

    const data = fetchChartData(transactions, dateInterval, chartCategory);

    return (
        <BarChart width={1200} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis formatter={FormatMoney} />
            <Tooltip formatter={FormatMoney} />
            <Legend />
            {chartCategory == ChartCategory.NONE && <Bar key="key" dataKey="Total" stackId="Total" fill="#8884d8" />}
            {chartCategory == ChartCategory.DESCRIPTION &&
                descriptions.map((description) => {
                    let stackId = chartStyle == ChartStyle.STACKED ? "1" : description.id;
                    return <Bar key={description.id} dataKey={description.name} stackId={stackId} fill={description.tag.colour} />
                })}

            {chartCategory == ChartCategory.TAG &&
                tags.map((tag) => {
                    let stackId = chartStyle == ChartStyle.STACKED ? "1" : tag.id;
                    return <Bar key={tag.id} dataKey={tag.name} stackId={stackId} fill={tag.colour} />
                })}

        </BarChart>
    );
};


const ChartPropertySelector = ({ enumType, currentSelection, onClick }) => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info">
                {currentSelection}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(enumType).map((key) => {
                    return <Dropdown.Item key={key} onClick={() => onClick(enumType[key])}>{key}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

const SummaryChartController = () => {

    const { state, dispatch } = useContext(GraphContext);

    const handleDateSelection = (dateInterval) => {

        dispatch({
            type: ACTION_SET_DATE_INTERVAL,
            payload: {
                dateInterval: dateInterval
            }
        });
    }

    const handleCategorySelection = (chartCategory) => {

        dispatch({
            type: ACTION_SET_CHART_CATEGORY,
            payload: {
                chartCategory: chartCategory
            }
        });
    }

    const handleChartStyleSelection = (chartStyle) => {

        dispatch({
            type: ACTION_SET_CHART_STYLE,
            payload: {
                chartStyle: chartStyle
            }
        });
    }

    return (
        <Table>
            <tbody>
                <tr>
                    <td>
                        <ChartPropertySelector enumType={DateInterval} currentSelection={Object.keys(DateInterval)[state.dateInterval]} onClick={handleDateSelection} />
                    </td>
                    <td>
                        <ChartPropertySelector enumType={ChartCategory} currentSelection={Object.keys(ChartCategory)[state.chartCategory]} onClick={handleCategorySelection} />
                    </td>
                    <td>
                        <ChartPropertySelector enumType={ChartStyle} currentSelection={Object.keys(ChartStyle)[state.chartStyle]} onClick={handleChartStyleSelection} />
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
        <div>
            <h1>Summary Chart</h1>
            <SummaryChartController />
            <SummaryChart transactions={transactions == null ? [] : transactions} />
        </div>
    );
}


export default TransactionChart;