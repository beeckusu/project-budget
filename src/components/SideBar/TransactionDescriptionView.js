import { Table, Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { ACTION_SET_TRANSACTION_DESCRIPTION_TAG, DataContext, DEFAULT_TAG_ID } from '../../contexts/DataContext';


const TransactionDescriptionRow = ({ transactionDescription }) => {

    const { state, dispatch } = useContext(DataContext);

    if (transactionDescription.tag == null) {
        const defaultTag = state.tags.find((tag) => tag.id == DEFAULT_TAG_ID);
        transactionDescription.tag = defaultTag;
    }

    const handleSelection = (tag) => {
        
        dispatch({
            type: ACTION_SET_TRANSACTION_DESCRIPTION_TAG,
            payload: {
                transactionDescription: transactionDescription,
                tag: tag,
            }
        });
    }

    return (
        <tr>
            <td>{transactionDescription.name}</td>
            <td>{transactionDescription.tag.name}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Change Tag
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {state.tags.map((tag) => {
                            return <Dropdown.Item onClick={() => handleSelection(tag)}>{tag.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}


const TransactionDescriptionTable = () => {

    const { state } = useContext(DataContext);
    const transactionDescriptions = state.descriptions;


    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tag</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transactionDescriptions.map((transactionDescription) => {
                    return <TransactionDescriptionRow transactionDescription={transactionDescription} />
                })}
            </tbody>
        </Table>
    );
}


const TransactionDescriptionView = () => {
    return (
        <div>
            <h1>Transaction Descriptions</h1>
            <TransactionDescriptionTable />
        </div>
    )
}

export default TransactionDescriptionView;