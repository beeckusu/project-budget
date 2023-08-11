import FileInput from "./FileInput";
import { Button } from "react-bootstrap";
import { parseCSV, rowToTransaction } from "../../events/ParsingEvents";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataContext, ACTION_SET_TRANSACTIONS } from "../../contexts/DataContext";

const FileUploadParser = () => {

    const { dispatch } = useContext(DataContext);
    const [file, setFile] = useState('');

    const handleOnParseClick = () => {
        console.log("HANDLE CLICK " + parseCSV(file.target.files[0], rowToTransaction));
        console.log("Method: " + parseCSV);
        parseCSV(file.target.files[0], rowToTransaction).then(result => {
            console.log("Thening");

            const fileDetails = {
              id: uuidv4(),
              data: result
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