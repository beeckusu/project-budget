import React from 'react';
import { Form } from 'react-bootstrap';

const FileInput = ({onChange}) => {
    
        return (
            <Form>
                <Form.Group>
                    <Form.Label for='fileInput'>Choose a file:</Form.Label>
                    <Form.Control type="file" onChange={onChange} id='fileInput'/>
                </Form.Group>
            </Form>
        );
}


export default FileInput;