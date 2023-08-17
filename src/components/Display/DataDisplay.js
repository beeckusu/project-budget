import { useContext } from "react";
import TransactionChart from "./TransactionChart";
import TransactionTable from "./TransactionTable";
import DisplayControl from "./DisplayControl";
import { GraphContext } from "../../contexts/GraphContext";
import { DisplayStyle } from "../../utils/Enums";


const DataDisplay = () => {

    const { state } = useContext(GraphContext);
    const displayStyle = state.displayStyle;

    return (
        <div className='layout-center'>
                <DisplayControl />
                {displayStyle === DisplayStyle.CHART ? <TransactionChart /> : <TransactionTable />}
        </div >
    )
}


export default DataDisplay;