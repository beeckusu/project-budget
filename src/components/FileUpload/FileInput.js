import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { TransactionParsingContext, ACTION_SET_COLUMNS } from '../../contexts/TransactionParsingContext';
import { parseCSVColumns } from '../../events/ParsingEvents';


const FileInput = ({ onChange }) => {

    return (
        <Form>
            <Form.Group>
                <Form.Label for='fileInput'>Choose a file:</Form.Label>
                <Form.Control type="file" onChange={onChange} id='fileInput' />
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
        <FileInput onChange={handleOnNewFileChange} />
    )
}


export { FileInput, NewFileInput };