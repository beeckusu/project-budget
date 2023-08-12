import FileInput from "./FileInput";
import { Button } from "react-bootstrap";
import { normalizeTransactions, parseCSV, rowToTransaction } from "../../events/ParsingEvents";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataContext, ACTION_SET_TRANSACTIONS } from "../../contexts/DataContext";

const FileUploadParser = () => {

    const { dispatch } = useContext(DataContext);
    const [file, setFile] = useState('');

    const handleOnParseClick = () => {

        parseCSV(file.target.files[0], rowToTransaction).then(result => {

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