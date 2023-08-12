import FileInput from "./FileInput";
import { Button } from "react-bootstrap";
import { normalizeTransactions, parseCSV, rowToTransaction } from "../../events/ParsingEvents";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataContext, ACTION_SET_TRANSACTIONS } from "../../contexts/DataContext";

const FileUploadParser = () => {

    const { dispatch } = useContext(DataContext);
    const [file, setFile] = useState('');


    const [dateCol, setDateCol] = useState(0);
    const [descriptionCol, setDescriptionCol] = useState(1);
    const [expenseCol, setExpenseCol] = useState(2);
    const [depositCol, setDepositCol] = useState(3);

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

    return (
        <div>
            <h1>File Upload Parser</h1>
            <FileInput onChange={setFile} />
            <Button variant="primary" onClick={handleOnParseClick}>Parse</Button>
        </div>
    )
}

export default FileUploadParser;