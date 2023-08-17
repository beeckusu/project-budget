import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FileInput } from './FileInput';
import { DataContext, ACTION_SET_STATE } from '../../../contexts/DataContext';
import { parseStateFile } from '../../../events/ParsingEvents';


const StateUploadParser = ({ onUpload }) => {

    const [file, setFile] = useState(null);
    const { dispatch } = useContext(DataContext);

    const handleOnParseClick = (event) => {

        parseStateFile(file.target.files[0]).then(result => {

            dispatch({
                type: ACTION_SET_STATE,
                payload: result,
            });

        });
        onUpload();
    }

    return (
        <div className='state-upload'>
            <p>
                Upload a JSON file to restore a previous session. Advised to upload only files downloaded from the Download button.
            </p>
            <FileInput onChange={setFile} />
            <Button variant='secondary'
                className='theme-active-primary layout-margin-top-minor override-bs'
                onClick={handleOnParseClick}>Parse</Button>
        </div>
    )
}


export { StateUploadParser };