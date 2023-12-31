import { useContext } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { TransactionParsingContext, ACTION_SET_COLUMN_INDEX } from '../../../contexts/TransactionParsingContext';


const ColumnDropdown = ({ fieldName, currentCol }) => {

    const { state } = useContext(TransactionParsingContext);
    let { columns } = state;
    columns = columns;

    const { dispatch } = useContext(TransactionParsingContext);
    const handleOnSelect = (fieldName, col) => {

        dispatch({
            type: ACTION_SET_COLUMN_INDEX,
            payload: {
                fieldName: fieldName,
                value: col
            }
        });

    }

    return (
        <td>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" className='theme-active-primary'>
                    {columns[currentCol]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {columns.map((col, index) => {
                        return <Dropdown.Item key={index} onClick={() => handleOnSelect(fieldName, index)}>
                            {(col != null ? col : "-")}
                        </Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </td>
    );
}


const ColumnParser = () => {

    const { state } = useContext(TransactionParsingContext);
    const fields = ["dateCol", "descriptionCol", "expenseCol", "depositCol"];

    return (
        <div>
            <p className='layout-margin-top-small'>
                Match the columns in the file to the fields in the database.
            </p>
            <Table>
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Description</th>
                        <th>Expense</th>
                        <th>Deposit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {fields.map((fieldName) => {
                            return <ColumnDropdown key={fieldName} fieldName={fieldName} currentCol={state[fieldName]} />
                        })}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ColumnParser;