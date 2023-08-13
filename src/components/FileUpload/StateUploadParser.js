import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FileInput } from './FileInput';
import { DataContext, ACTION_SET_STATE } from '../../contexts/DataContext';
import { parseStateFile } from '../../events/ParsingEvents';


const StateUploadParser = () => {

    const [file, setFile] = useState(null);
    const { dispatch } = useContext(DataContext);

    const handleOnParseClick = (event) => {

        parseStateFile(file.target.files[0]).then(result => {

            dispatch({
                type: ACTION_SET_STATE,
                payload: result,
            });
    
        });
    }

    return (
        <div>
            <h1>StateUploadParser</h1>
            <FileInput onChange={setFile} />
            <Button variant="primary" onClick={handleOnParseClick}>Parse</Button>
        </div>
    )
}


export { StateUploadParser };