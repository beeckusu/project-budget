const defaultTransactionFieldToColumn = {
    'date': 0,
    'description': 1,
    'expense': 2,
    'deposit': 3
}

const rowToTransaction =(row, transactionFieldToColumn = defaultTransactionFieldToColumn) => {

    dateCol = transactionFieldToColumn['date'];
    descriptionCol = transactionFieldToColumn['description'];
    expenseCol = transactionFieldToColumn['expense'];
    depositCol = transactionFieldToColumn['deposit'];

    const id = uuidv4();
    const date = new Date((row[dateCol] - (25567 + 1)) * 86400 * 1000);
    const description = row[descriptionCol];
    const amount = (row[expenseCol] != null) ? row[expenseCol] : row[depositCol];
    const transactionType = (row[expenseCol] != null) ? 'EXPENSE' : 'DEPOSIT';
    return new Transaction(id, description, amount, date, transactionType);

}