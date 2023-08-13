import { useState } from "react";
import { Button, Collapse, Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TagView from "./TagView";
import TransactionView from "./TransactionView";
import TransactionDescriptionView from "./TransactionDescriptionView";
import DownloadButton from "../DownloadButton";
import { SideBarProvider } from "../../contexts/SideBarContext";


const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <SideBarProvider>

            <div className={`sidebar ${open ? 'open' : 'collapsed'} override-bs layout-overlay layout-top-right`}>
            <div class="icon-bar">
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="sidebar-collapse"
                    aria-expanded={open}
                    className='circular-button sidebar-button'
                >
                    <FontAwesomeIcon icon={faBars} />
                </Button>
                <DownloadButton />
                </div>
                <Collapse in={open} dimension="width">
                    <Card class='sidebar-content'>
                        <Tabs defaultActiveKey="transactions" class="sidebar-collapse">
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