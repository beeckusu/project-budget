import { v4 as uuidv4 } from 'uuid';
import { ExcelRenderer } from 'react-excel-renderer';
import Transaction from '../models/Transaction';
import TransactionDescription from '../models/TransactionDescription';
import Tag from '../models/Tag';


const defaultTransactionFieldToColumn = {
    'date': 0,
    'description': 1,
    'expense': 2,
    'deposit': 3
}


/**
 * Given a CSV, parse the names of the columns. Assume that the first row is
 * the column names. If the first row is not, then we can safely assume that 
 * the column names were not given, in which case we can still return the
 * first row as an example for the user.
 * 
 * @param {*} file - File object to parse
 * @returns Array of column names
 */
const parseCSVColumns = (file) => {

    return new Promise((resolve, reject) => {

        if (file.size === 0) {
            resolve([]);
            return;
        }

        ExcelRenderer(file, (error, response) => {

            if (error) {
                console.log(error);
            }
            else {

                if (response.rows.length === 0) {
                    resolve(response.cols);
                }

                resolve(response.rows[0]);
            }
        });
    });
}


const parseCSV = (file, rowToObject, fieldToCol = defaultTransactionFieldToColumn) => {

    return new Promise((resolve, reject) => {

        if (file.size === 0) {
            resolve([]);
            return;
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


const normalizeTransactions = (transactions) => {

    const transactionDescriptions = {};

    transactions.forEach(transaction => {
        if (!transactionDescriptions[transaction.description]) {
            transactionDescriptions[transaction.description] = new TransactionDescription(uuidv4(), transaction.description);
        }
        transaction.description = transactionDescriptions[transaction.description];
    });

    return Object.values(transactionDescriptions);

}

const setDefaultTag = (transactionDescriptions, defaultTag) => {    
        transactionDescriptions.forEach(transactionDescription => {
            transactionDescription.tag = defaultTag;
        });
}


const rowToTransaction = (row, transactionFieldToColumn = defaultTransactionFieldToColumn) => {

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


/**
 * Given a JSON file, parse it into a state object.
 * This function assumes that the file was created by the downloadTransactionState function.
 * 
 * Immediately after parsing, relationships between transactions, descriptions, and tags
 * need to be re-created since the objects will have created new instances of the objects
 * rather than using the referenced objects.
 * 
 * @param {*} file 
 * @returns 
 */
const parseStateFile = (file) => {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);

                let newState = {
                    transactions: {},
                    descriptions: {},
                    tags: {},
                };

                data.tags.forEach(tag => {
                    newState.tags[tag.id] = new Tag(tag.id, tag.name, tag.colour, tag.isActive);
                });

                data.descriptions.forEach(description => {
                    let tag = description.tag != null ? newState.tags[description.tag.id] : null;
                    newState.descriptions[description.id] = new TransactionDescription(description.id, description.name, tag, description.isActive);
                });

                data.transactions.forEach(transaction => {
                    let description = newState.descriptions[transaction.description.id];
                    let date = new Date(transaction.date);
                    newState.transactions[transaction.id] = new Transaction(transaction.id, description, transaction.amount, date, transaction.transactionType, transaction.isActive);
                });

                newState.transactions = Object.values(newState.transactions);
                newState.descriptions = Object.values(newState.descriptions);
                newState.tags = Object.values(newState.tags);

                resolve(newState);
                
            } catch (e) {
                console.error('Error reading file', event.target.result);
            }

        };
        reader.readAsText(file);
    });

}


export { parseCSV, rowToTransaction, normalizeTransactions, setDefaultTag, parseCSVColumns, parseStateFile };