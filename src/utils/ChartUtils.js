
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

    const getKey = (transaction) => {
        return transaction.date.toDateString();
    }
    const getData = (transaction) => {
        return ["Total", transaction.amount];
    }
    let data = {};
    for (let transaction of transactions) {
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

export { fetchChartData };