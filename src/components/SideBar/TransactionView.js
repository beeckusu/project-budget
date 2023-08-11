import { Table } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
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


const TransactionTable = () => {

    let { state } = useContext(DataContext);
    let transactions = 'transactions' in state ? state.transactions : [];

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
        <TransactionTable />
    );
}


export default TransactionView;