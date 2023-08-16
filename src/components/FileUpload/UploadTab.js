import { Button, Card, Collapse, Tab, Tabs } from 'react-bootstrap';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateUploadParser } from './StateUploadParser';
import FileUploadParser from './FileUploadParser';


const UploadTab = ({ isOpen, onUpload }) => {

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <Collapse in={isOpen} dimension="width">
                <Card className='sidebar-content'>
                    <Tabs defaultActiveKey="existing" className="sidebar-collapse">
                        <Tab eventKey="existing" title="Existing">
                            <StateUploadParser onUpload={onUpload} />
                        </Tab>
                        <Tab eventKey="new" title="New">
                            <FileUploadParser onUpload={onUpload}/>
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