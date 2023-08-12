import { useContext } from "react";
import { Table, Form } from "react-bootstrap";
import { DataContext } from "../../contexts/DataContext";
import { SideBarContext } from "../../contexts/SideBarContext";
import { filterTransactions } from "../../events/SideBarEvents";
import { FormatMoney, FormatDate } from "../../utils/Utils";


const TransactionRow = ({ transaction }) => {
    return (
        <tr>
            <td>{FormatDate(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td>{FormatMoney(transaction.amount)}</td>
            <td>{transaction.transactionType}</td>
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
                <tr>
                    <td>Date</td>
                    <td>From: <Form.Control type="date" dispatchtype="SET_MIN_DATE" onChange={handleOnDataChange} /></td>
                    <td>To: <Form.Control type="date" dispatchtype="SET_MAX_DATE" onChange={handleOnDataChange} /></td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td colspan="2"><Form.Control type="text" dispatchtype="SET_DESCRIPTION" onChange={handleOnDataChange} placeholder="Search" /></td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>Min: <Form.Control type="number" dispatchtype="SET_MIN_AMOUNT" onChange={handleOnDataChange} /></td>
                    <td>Max: <Form.Control type="number" dispatchtype="SET_MAX_AMOUNT" onChange={handleOnDataChange} /></td>
                </tr>
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
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => {
                    return <TransactionRow transaction={transaction} />
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