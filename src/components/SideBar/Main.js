import { useState } from "react";
import { Button, Collapse, Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TagView from "./TagView";
import TransactionView from "./TransactionView";
import TransactionDescriptionView from "./TransactionDescriptionView";
import DownloadButton from "../DownloadButton";
import { UploadTabButton, UploadTab } from "../FileUpload/UploadTab";
import { SideBarProvider } from "../../contexts/SideBarContext";


const SideBar = () => {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);

    return (
        <SideBarProvider>

            <div className={`sidebar ${dataOpen ? 'open' : 'collapsed'} override-bs layout-overlay layout-top-right`}>
                <div className="icon-bar">
                    <UploadTabButton isOpen={uploadOpen} onClick={() => {setDataOpen(false);setUploadOpen(!uploadOpen)}} />
                    <Button
                        onClick={() => {setDataOpen(!dataOpen); setUploadOpen(false)}}
                        aria-controls="sidebar-collapse"
                        aria-expanded={dataOpen}
                        className='circular-button sidebar-button'
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                    <DownloadButton />
                </div>
                <UploadTab isOpen={uploadOpen} onUpload={() => {setDataOpen(false);setUploadOpen(false);}}/>
                <Collapse in={dataOpen} dimension="width">
                    <Card className='sidebar-content'>
                        <Tabs defaultActiveKey="transactions" className="sidebar-collapse">
                            <Tab eventKey="transactions" title="Transactions">
                                <TransactionView />
                            </Tab>
                            <Tab eventKey="descriptions" title="Descriptions">
                                <TransactionDescriptionView />
                            </Tab>
                            <Tab eventKey="tags" title="Tags">
                                <TagView />
                            </Tab>
                        </Tabs>
                    </Card>
                </Collapse>
            </div>
        </SideBarProvider>
    );
};

export default SideBar;