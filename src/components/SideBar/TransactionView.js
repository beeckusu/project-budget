import { useContext } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FilterForm } from "./Utils";
import { ACTION_TOGGLE_OBJECT_VISIBILITY, DataContext } from "../../contexts/DataContext";
import { SideBarContext, ACTION_SET_MIN_DATE, ACTION_SET_MAX_DATE, ACTION_SET_DESCRIPTION, ACTION_SET_MIN_AMOUNT, ACTION_SET_MAX_AMOUNT, ACTION_SET_TAG } from "../../contexts/SideBarContext";
import { filterTransactions } from "../../events/SideBarEvents";
import { FormatMoney, FormatDate } from "../../utils/Utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';


const TransactionRow = ({ transaction }) => {

    const { dispatch } = useContext(DataContext);
    const handleActiveButtonClick = (event) => {
        dispatch({
            type: ACTION_TOGGLE_OBJECT_VISIBILITY,
            payload: {
                object: transaction,
                isActive: !transaction.isActive
            }
        });
    }

    return (
        <tr>
            <td>{FormatDate(transaction.date)}</td>
            <td>{transaction.description.name}</td>
            <td>{FormatMoney(transaction.amount)}</td>
            <td>{transaction.transactionType}</td>
            <td>{transaction.description.tag.name}</td>
            <td><Button><FontAwesomeIcon onClick={handleActiveButtonClick} icon={transaction.isActive ? faPlay : faPause} /></Button></td>
        </tr>
    );
}


const TransactionTable = () => {

    const { state: sideBarState } = useContext(SideBarContext);
    const { minDate, maxDate, description, minAmount, maxAmount, tag } = sideBarState;

    const { state: dataState } = useContext(DataContext);

    let transactions = 'transactions' in dataState ? dataState.transactions : [];
    transactions = filterTransactions(transactions, minDate, maxDate, description, minAmount, maxAmount, tag);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Tag</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => {
                    return <TransactionRow key={transaction.id} transaction={transaction} />
                })}
            </tbody>
        </Table>
    )
}


const TransactionView = () => {

    const { dispatch } = useContext(SideBarContext);

    const filterFieldNames = ['Date', 'Description', 'Amount', 'Tag'];
    const dispatchTypes = {
        'Date': [ACTION_SET_MIN_DATE, ACTION_SET_MAX_DATE],
        'Description': [ACTION_SET_DESCRIPTION],
        'Amount': [ACTION_SET_MIN_AMOUNT, ACTION_SET_MAX_AMOUNT],
        'Tag': [ACTION_SET_TAG],
    }
    const dateFields = ['Date'];
    const floatFields = ['Amount'];


    return (
        <div>
            <h1>Transactions</h1>
            <FilterForm dispatch={dispatch}
                fieldNames={filterFieldNames}
                dispatchTypes={dispatchTypes}
                dateFields={dateFields}
                floatFields={floatFields} />
            <TransactionTable />
        </div>
    );
}


export default TransactionView;