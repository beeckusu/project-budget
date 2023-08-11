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
function fetchChartData(transactions) {

    if (transactions == null || transactions.length === 0) {
        return [];
    }

    const dateToKey = (date) => { return date.toDateString(); }
    const getKey = (transaction) => { return dateToKey(transaction.date); }
    const getData = (transaction) => { return ["Total", transaction.amount]; }

    let sortedTransactions = transactions.sort((a, b) => a.date - b.date);

    const fillDates = (data, startDate, endDate) => {

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {

            let key = dateToKey(currentDate);

            if (data[key] == null) {
                data[key] = {
                    key: key,
                    Total: 0
                }
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return data;
    }

    let data = fillDates({}, sortedTransactions[0].date, sortedTransactions[sortedTransactions.length - 1].date);

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
            data[key][amount[0]] += amount[1];
        }
    }
    return Object.values(data);
}

const MoneyFormatter = (value) => {
    return `$${value.toFixed(2)}`;
}

export { fetchChartData, MoneyFormatter };