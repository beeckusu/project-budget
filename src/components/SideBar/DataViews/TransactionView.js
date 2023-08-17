import { useContext } from "react";
import { Button } from "react-bootstrap";
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilterForm, SortableTable } from "../Utils";
import { ACTION_TOGGLE_OBJECT_VISIBILITY, DataContext } from "../../../contexts/DataContext";
import { ACTION_SET_DESCRIPTION, ACTION_SET_MAX_AMOUNT, ACTION_SET_MAX_DATE, ACTION_SET_MIN_AMOUNT, ACTION_SET_MIN_DATE, ACTION_SET_TAG, SideBarContext } from "../../../contexts/SideBarContext";
import { filterTransactions } from "../../../events/SideBarEvents";
import { FormatDate, FormatMoney } from "../../../utils/Utils";


const TransactionFilterForm = () => {

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
        <FilterForm dispatch={dispatch}
            fieldNames={filterFieldNames}
            dispatchTypes={dispatchTypes}
            dateFields={dateFields}
            floatFields={floatFields} />
    )
}


const TransactionTable = () => {

    const { state, dispatch } = useContext(DataContext);

    const handleActiveButtonClick = (transaction) => {
        dispatch({
            type: ACTION_TOGGLE_OBJECT_VISIBILITY,
            payload: {
                object: transaction,
                isActive: !transaction.isActive
            }
        });
    }
    const schema = [{
        name: 'Date',
        property: 'date',
        getProperty: (transaction) => transaction.date,
        displayField: (transaction) => { return FormatDate(transaction.date) },
        sort: true,
    }, {
        name: 'Description',
        property: 'description.name',
        getProperty: (transaction) => transaction.description.name,
        sort: true
    }, {
        name: 'Amount',
        property: 'amount',
        getProperty: (transaction) => { return transaction.amount },
        displayField: (transaction) => { return FormatMoney(transaction.amount) },
        sort: true,
    }, {
        name: 'Transaction Type',
        property: 'transactionType',
        getProperty: (transaction) => transaction.transactionType,
        sort: true,
    }, {
        name: 'Tag',
        property: 'description.tag.name',
        getProperty: (transaction) => transaction.description.tag.name,
        sort: true
    }, {
        name: 'Active',
        displayField: (transaction) => { return <Button><FontAwesomeIcon onClick={() => handleActiveButtonClick(transaction)} icon={transaction.isActive ? faPlay : faPause} /></Button> },
        sort: false,
    }];
    let transactions = 'transactions' in state ? state.transactions : [];

    const { state: sideBarState } = useContext(SideBarContext);
    const { minDate, maxDate, description, minAmount, maxAmount, tag } = sideBarState;

    return (
        <SortableTable schema={schema} data={transactions} filter={(transactions) => filterTransactions(transactions, minDate, maxDate, description, minAmount, maxAmount, tag)}/>
    )
}


const TransactionView = () => {

    return (
        <div>
            <h1>Transactions</h1>
            <TransactionFilterForm />
            <TransactionTable />
        </div>
    );
}


export default TransactionView;