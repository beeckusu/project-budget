import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import FileInput from "./FileInput";
import ColumnParser from "./ColumnParser";
import { DataContext, ACTION_SET_TRANSACTIONS } from "../../contexts/DataContext";
import { TransactionParsingProvider, TransactionParsingContext } from "../../contexts/TransactionParsingContext";
import { normalizeTransactions, parseCSV, rowToTransaction } from "../../events/ParsingEvents";


const ParseButton = ({ file }) => {

    const { dispatch } = useContext(DataContext);
    const { state } = useContext(TransactionParsingContext);
    const { dateCol, descriptionCol, expenseCol, depositCol } = state;

    const handleOnParseClick = () => {

        const transactionFieldToColumn = {
            'date': dateCol,
            'description': descriptionCol,
            'expense': expenseCol,
            'deposit': depositCol
        }

        parseCSV(file.target.files[0], rowToTransaction, transactionFieldToColumn).then(result => {

            const transactionDescriptions = normalizeTransactions(result);

            const fileDetails = {
                transactions: result,
                transactionDescriptions: transactionDescriptions,
            }

            dispatch({
                type: ACTION_SET_TRANSACTIONS,
                payload: fileDetails,
            });

        });
    }

    return (<Button variant="primary" onClick={handleOnParseClick}>Parse</Button>);
}


const FileUploadParser = () => {

    const [file, setFile] = useState('');

    return (
        <TransactionParsingProvider>
            <h1>File Upload Parser</h1>
            <FileInput onChange={setFile} />
            <ColumnParser />
            <ParseButton file={file} />
        </TransactionParsingProvider>
    )
}

export default FileUploadParser;