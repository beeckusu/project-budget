import { v4 as uuidv4 } from 'uuid';
import { ExcelRenderer } from 'react-excel-renderer';
import Transaction from '../models/Transaction';


const defaultTransactionFieldToColumn = {
    'date': 0,
    'description': 1,
    'expense': 2,
    'deposit': 3
}

const parseCSV = (file, rowToObject) => {

    return new Promise((resolve, reject) => {

        if (file.size === 0) {
            resolve([]);
        }

        ExcelRenderer(file, (error, response) => {

            if (error) {
                console.log(error);
            }
            else {

                let objects = [];

                for (let index in response.rows) {
                    let row = response.rows[index];
                    objects.push(rowToObject(row));
                }
                resolve(objects);
            }
        });
    });
}


const rowToTransaction = (row, transactionFieldToColumn = defaultTransactionFieldToColumn) => {

    console.log(row);

    let dateCol = transactionFieldToColumn['date'];
    let descriptionCol = transactionFieldToColumn['description'];
    let expenseCol = transactionFieldToColumn['expense'];
    let depositCol = transactionFieldToColumn['deposit'];

    const id = uuidv4();
    const date = new Date((row[dateCol] - (25567 + 1)) * 86400 * 1000);
    const description = row[descriptionCol];
    const amount = (row[expenseCol] != null) ? row[expenseCol] : row[depositCol];
    const transactionType = (row[expenseCol] != null) ? 'EXPENSE' : 'DEPOSIT';
    return new Transaction(id, description, amount, date, transactionType);

}

export { parseCSV, rowToTransaction };