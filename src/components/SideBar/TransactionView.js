import { useContext } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { ACTION_TOGGLE_OBJECT_VISIBILITY, DataContext } from "../../contexts/DataContext";
import { SideBarContext } from "../../contexts/SideBarContext";
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
            <td><Button><FontAwesomeIcon onClick={handleActiveButtonClick} icon={transaction.isVisible() ? faPlay : faPause} /></Button></td>
        </tr>
    );
}

const FilterTransactionsForm = () => {

    const { dispatch } = useContext(SideBarContext);

    const handleOnDataChange = (event) => {

        const dispatchType = event.target.getAttribute('dispatchType');
        let value = event.target.value;

        if (['SET_MIN_DATE', 'SET_MAX_DATE'].includes(dispatchType)) {
            value = value != '' ? new Date(value) : value;
        } else if (['SET_MIN_AMOUNT', 'SET_MAX_AMOUNT'].includes(dispatchType)) {
            value = value != '' ? parseFloat(value) : value;
        }

        dispatch({
            type: dispatchType,
            payload: {
                data: value,
            }
        });

    }

    return (
        <Form>
            <Table>
                <tbody>
                    <tr>
                        <td>Date</td>
                        <td>From: <Form.Control type="date" dispatchtype="SET_MIN_DATE" onChange={handleOnDataChange} /></td>
                        <td>To: <Form.Control type="date" dispatchtype="SET_MAX_DATE" onChange={handleOnDataChange} /></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td colSpan="2"><Form.Control type="text" dispatchtype="SET_DESCRIPTION" onChange={handleOnDataChange} placeholder="Search" /></td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>Min: <Form.Control type="number" dispatchtype="SET_MIN_AMOUNT" onChange={handleOnDataChange} /></td>
                        <td>Max: <Form.Control type="number" dispatchtype="SET_MAX_AMOUNT" onChange={handleOnDataChange} /></td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    );
}


const TransactionTable = () => {

    const { state: sideBarState } = useContext(SideBarContext);
    const { minDate, maxDate, description, minAmount, maxAmount } = sideBarState;

    const { state: dataState } = useContext(DataContext);

    let transactions = 'transactions' in dataState ? dataState.transactions : [];
    transactions = filterTransactions(transactions, minDate, maxDate, description, minAmount, maxAmount);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
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
    return (
        <div>
            <h1>Transactions</h1>
            <FilterTransactionsForm />
            <TransactionTable />
        </div>
    );
}


export default TransactionView;