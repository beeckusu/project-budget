import TransactionView from "./TransactionView";
import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import { SideBarProvider } from "../../contexts/SideBarContext";


const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <SideBarProvider>

            <div className={`sidebar ${open ? 'open' : 'collapsed'}`}>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="sidebar-collapse"
                    aria-expanded={open}
                    className='circular-button'
                >
                    +
                </Button>
                <Collapse in={open} dimension="width">
                    <div class="sidebar-collapse">
                        <Card class='sidebar-content' style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <TransactionView />
                        </Card>
                    </div>
                </Collapse>
            </div>
        </SideBarProvider>
    );
};

export default SideBar;