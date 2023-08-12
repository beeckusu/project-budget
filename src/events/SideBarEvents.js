const filterTransactions = (transactions, minDate, maxDate, description, minAmount, maxAmount) => {

    if (minDate !== '') {
        transactions = transactions.filter(transaction => {
            return transaction.date >= minDate});
    }
    if (maxDate !== '') {
        transactions = transactions.filter(transaction => transaction.date <= maxDate);
    }
    if (description !== '') {
        transactions = transactions.filter(transaction => transaction.description.includes(description));
    }
    if (minAmount !== '') {
        transactions = transactions.filter(transaction => transaction.amount >= minAmount);
    }
    if (maxAmount !== '') {
        transactions = transactions.filter(transaction => transaction.amount <= maxAmount);
    }
    return transactions;
}

export { filterTransactions };