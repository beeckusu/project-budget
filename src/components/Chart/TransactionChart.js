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
        <BarChart width={600} height={600} data={data}>
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
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="info">
                                Categorize by
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(ChartCategory).map((key) => {
                                    return <Dropdown.Item onClick={() => handleCategorySelection(ChartCategory[key])}>{key}</Dropdown.Item>
                                }
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="info">
                                Chart Style
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(ChartStyle).map((key) => {
                                    return <Dropdown.Item onClick={() => handleChartStyleSelection(ChartStyle[key])}>{key}</Dropdown.Item>
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