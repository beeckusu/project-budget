const filterTransactions = (transactions, minDate, maxDate, description, minAmount, maxAmount, tag) => {

    if (minDate !== '') {
        transactions = transactions.filter(transaction => {
            return transaction.date >= minDate});
    }
    if (maxDate !== '') {
        transactions = transactions.filter(transaction => transaction.date <= maxDate);
    }
    if (description !== '') {
        transactions = transactions.filter(transaction => transaction.description.name.includes(description));
    }
    if (minAmount !== '') {
        transactions = transactions.filter(transaction => transaction.amount >= minAmount);
    }
    if (maxAmount !== '') {
        transactions = transactions.filter(transaction => transaction.amount <= maxAmount);
    }
    if (tag !== '') {
        transactions = transactions.filter(transaction => transaction.description.tag.name.includes(tag));
    }
    return transactions;
}


const filterTransactionDescriptions = (transactionDescriptions, name, tag) => {
    console.log(name);

    if (name !== '') {
        transactionDescriptions = transactionDescriptions.filter(transactionDescription => transactionDescription.name.includes(name));
    }
    if (tag !== '') {
        transactionDescriptions = transactionDescriptions.filter(transactionDescription => transactionDescription.tag.name.includes(tag));
    }
    return transactionDescriptions;

}


export { filterTransactions, filterTransactionDescriptions };