import { Card, Collapse, Tab, Tabs } from 'react-bootstrap';
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


export { UploadTab };