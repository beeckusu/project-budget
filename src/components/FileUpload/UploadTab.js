import { Button, Card, Collapse, Tab, Tabs } from 'react-bootstrap';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateUploadParser } from './StateUploadParser';
import FileUploadParser from './FileUploadParser';


const UploadTab = ({ isOpen }) => {

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <Collapse in={isOpen} dimension="width">
                <Card class='sidebar-content'>
                    <Tabs defaultActiveKey="existing" class="sidebar-collapse">
                        <Tab eventKey="existing" title="Existing">
                            <StateUploadParser/>
                        </Tab>
                        <Tab eventKey="new" title="New">
                            <FileUploadParser/>
                        </Tab>
                    </Tabs>
                </Card>
            </Collapse>
        </div>
    )

}


const UploadTabButton = ({ isOpen, onClick }) => {
    return (
        <Button variant="primary"
            onClick={onClick}
            aria-controls="sidebar-collapse"
            aria-expanded={isOpen}
            className='circular-button'>
            <FontAwesomeIcon icon={faUpload} />
        </Button>
    )
}


export { UploadTabButton, UploadTab };