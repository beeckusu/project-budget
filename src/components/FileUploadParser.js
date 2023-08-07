import FileInput from "./FileInput";
import { Button } from "react-bootstrap";
import { parseCSV, rowToTransaction } from "../events/ParsingEvents";
import { useState } from "react";

const FileUploadParser = () => {

    const [file, setFile] = useState('');

    const handleOnParseClick = () => {
        parseCSV(file.target.files[0], rowToTransaction);
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