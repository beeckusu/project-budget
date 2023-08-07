import React from 'react';
import { Form } from 'react-bootstrap';

const FileInput = ({onChange}) => {
    
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Choose a file:</Form.Label>
                    <Form.Control type="file" onChange={onChange} />
                </Form.Group>
            </Form>
        );
}


export default FileInput;