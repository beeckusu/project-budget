import React from 'react';
import { Form } from 'react-bootstrap';
import { parseCSVColumns } from '../../events/ParsingEvents';
import { useContext } from 'react';
import { TransactionParsingContext, ACTION_SET_COLUMNS } from '../../contexts/TransactionParsingContext';


const FileInput = ({ onChange }) => {

    const { dispatch } = useContext(TransactionParsingContext);

    const handleOnChange = (event) => {
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
        <Form>
            <Form.Group>
                <Form.Label for='fileInput'>Choose a file:</Form.Label>
                <Form.Control type="file" onChange={handleOnChange} id='fileInput' />
            </Form.Group>
        </Form>
    );
}


export default FileInput;