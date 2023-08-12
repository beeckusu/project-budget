import { DateInterval, ChartCategory } from "./Enums";
import { FormatDate } from "./Utils";

/**
 * Given a list of transactions, convert it to a format digestible by BarChart.
 * The format is a list of objects with the following properties:
 *      - key: the X-axis value (ie. date)
 *      - For each additional property (multiple properties creates a StackBarChart):
 *          - Name of property (ie. tag name)
 *          - Value of property (ie. amount)
 * 
 * @param {*} transactions: List of Transaction objects
 * @returns Iterable of dicts with the above properties
 */
function fetchChartData(transactions, dateInterval = DateInterval.DAY, chartCategory = ChartCategory.NONE) {

    transactions = transactions.filter(transaction => transaction.isVisible());

    if (transactions == null || transactions.length === 0) {
        return [];
    }

    const getKey = (transaction) => { return FormatDate(transaction.date, dateInterval); }
    const getData = (transaction) => { 
        let key = "Total";
        if (chartCategory == ChartCategory.DESCRIPTION)
            key = transaction.description.name;

        else if (chartCategory == ChartCategory.TAG)
            key = transaction.description.tag.name;

        return [key, transaction.amount]; 
    }

    let sortedTransactions = transactions.sort((a, b) => a.date - b.date);

    const fillDates = (data, startDate, endDate, dateInterval) => {

        let currentDate = new Date(startDate);

        if (dateInterval == DateInterval.WEEK) {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay());
        } else if (dateInterval == DateInterval.MONTH) {
            currentDate.setDate(1);
        } else if (dateInterval == DateInterval.YEAR) {
            currentDate.setMonth(0);
            currentDate.setDate(1);
        }

        while (currentDate <= endDate) {

            let key = FormatDate(currentDate, dateInterval);

            if (data[key] == null) {
                data[key] = {
                    key: key,
                    Total: 0
                }
            }

            if (dateInterval == DateInterval.DAY) {
                currentDate.setDate(currentDate.getDate() + 1);
            }
            else if (dateInterval == DateInterval.WEEK) {
                currentDate.setDate(currentDate.getDate() + 7);
            }
            else if (dateInterval == DateInterval.MONTH) {
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
            else if (dateInterval == DateInterval.YEAR) {
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
        }
        return data;
    }

    let data = fillDates({}, sortedTransactions[0].date, sortedTransactions[sortedTransactions.length - 1].date, dateInterval);

    for (let transaction of sortedTransactions) {
        let key = getKey(transaction);
        let amount = getData(transaction);

        if (data[key] == null) {

            let entry = {
                key: key,
                [amount[0]]: amount[1]
            }
            data[key] = entry;
        }
        else {
            if (data[key][amount[0]] == null) {
                data[key][amount[0]] = 0;
            }
            data[key][amount[0]] += amount[1];
        }
    }
    return Object.values(data);
}

export { fetchChartData };