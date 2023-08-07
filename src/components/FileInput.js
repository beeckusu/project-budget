import React from 'react';
import { Form } from 'react-bootstrap';
import { handleFileChange } from '../events/FileEvents';

const FileInput = () => {

    return (
        <Form>
            <Form.Group>
                <Form.Label>Choose a file:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
        </Form>
    );

}


export default FileInput;