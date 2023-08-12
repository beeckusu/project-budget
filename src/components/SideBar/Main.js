import TransactionView from "./TransactionView";
import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import { SideBarProvider } from "../../contexts/SideBarContext";
import { Tab, Tabs } from "react-bootstrap";
import TagView from "./TagView";
import TransactionDescriptionView from "./TransactionDescriptionView";



const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <SideBarProvider>

            <div className={`sidebar ${open ? 'open' : 'collapsed'} override-bs`}>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="sidebar-collapse"
                    aria-expanded={open}
                    className='circular-button sidebar-button'
                >
                    +
                </Button>
                <Collapse in={open} dimension="width">
                    <Card class='sidebar-content' style={{ maxHeight: "400px", overflowY: "auto" }}>
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