import { useContext } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { TransactionParsingContext, ACTION_SET_COLUMNS } from '../../contexts/TransactionParsingContext';
import { parseCSVColumns } from '../../events/ParsingEvents';


const FileInput = ({ onChange, multiple }) => {

    return (
        <Form>
            <Form.Group>
                <Form.Label for='fileInput'>Choose a file:</Form.Label>
                <FormControl id='fileInput' type='file' onChange={onChange} multiple={multiple} />
            </Form.Group>
        </Form>
    );
}


const NewFileInput = ({ onChange }) => {
    const { dispatch } = useContext(TransactionParsingContext);

    const handleOnNewFileChange = (event) => {
        onChange(event);
        parseCSVColumns(event.target.files[0]).then(result => {

            dispatch({
                type: ACTION_SET_COLUMNS,
                payload: {
                    value: Array.from(result)
                }
            });

        });
    }

    return (
        <FileInput multiple={true} onChange={handleOnNewFileChange} />
    )
}


export { FileInput, NewFileInput };