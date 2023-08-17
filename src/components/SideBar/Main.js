import { useContext, useState } from "react";
import { Collapse, Card, Tab, Tabs } from "react-bootstrap";
import { faBars, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import TagView from "./DataViews/TagView";
import TransactionView from "./DataViews/TransactionView";
import TransactionDescriptionView from "./DataViews/TransactionDescriptionView";
import { UploadTab } from "./FileUpload/UploadTab";
import { SideBarProvider } from "../../contexts/SideBarContext";
import { IconbarButton, ConfirmationModal } from "./Utils";
import { DataContext } from "../../contexts/DataContext";
import downloadTransactionState from "../../events/PersistenceEvents";



const SideBar = () => {

    const { state } = useContext(DataContext);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);

    return (
        <SideBarProvider>
            <div className="layout-overlay-container layout-top-right">
                <div className="icon-bar layout-overlay override-bs">
                    <IconbarButton isOpen={uploadOpen}
                        onClick={() => { setDataOpen(false); setUploadOpen(!uploadOpen) }}
                        icon={faUpload} />
                    <IconbarButton isOpen={dataOpen}
                        onClick={() => { setDataOpen(!dataOpen); setUploadOpen(false) }}
                        icon={faBars} />
                    <IconbarButton isOpen={downloadOpen}
                        onClick={() => { setDownloadOpen(!downloadOpen); setUploadOpen(false); setDataOpen(false) }}
                        icon={faDownload} />
                    <ConfirmationModal
                        show={downloadOpen}
                        onHide={() => setDownloadOpen(false)}
                        onConfirm={() => { setDownloadOpen(false); downloadTransactionState(state) }}
                        modalHeader="Download Data"
                        modalMessage="Are you sure you want to download the current state?"
                        modalTheme="primary"
                        confirmLabel="Download" />
                </div>
            </div>
            <div className={`sidebar ${dataOpen ? 'open' : 'collapsed'} layout-overlay-container layout-top-right`}>

                <UploadTab isOpen={uploadOpen} onUpload={() => { setDataOpen(false); setUploadOpen(false); }} />
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