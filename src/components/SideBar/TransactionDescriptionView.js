import { useContext } from 'react';
import { Table, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FilterForm } from './Utils';
import { ACTION_SET_TRANSACTION_DESCRIPTION_TAG, DataContext, ACTION_TOGGLE_OBJECT_VISIBILITY } from '../../contexts/DataContext';
import { SideBarContext, ACTION_SET_DESCRIPTION_NAME, ACTION_SET_DESCRIPTION_TAG } from '../../contexts/SideBarContext';
import { filterTransactionDescriptions } from '../../events/SideBarEvents';


const TransactionDescriptionRow = ({ transactionDescription }) => {

    const { state, dispatch } = useContext(DataContext);
    const handleActiveButtonClick = (event) => {
        dispatch({
            type: ACTION_TOGGLE_OBJECT_VISIBILITY,
            payload: {
                object: transactionDescription,
                isActive: !transactionDescription.isActive
            }
        });
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
                            return <Dropdown.Item key={tag.id} onClick={() => handleSelection(tag)}>{tag.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td><Button><FontAwesomeIcon onClick={handleActiveButtonClick} icon={transactionDescription.isActive ? faPlay: faPause} /></Button></td>
        </tr>
    );
}


const TransactionDescriptionTable = () => {

    const { state } = useContext(DataContext);
    const { state: sideBarState } = useContext(SideBarContext);
    const { descriptionName, descriptionTag } = sideBarState;

    let transactionDescriptions = state.descriptions;
    transactionDescriptions = filterTransactionDescriptions(transactionDescriptions, descriptionName, descriptionTag);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tag</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transactionDescriptions.map((transactionDescription) => {
                    return <TransactionDescriptionRow key={transactionDescription.id} transactionDescription={transactionDescription} />
                })}
            </tbody>
        </Table>
    );
}


const TransactionDescriptionView = () => {

    const { dispatch } = useContext(SideBarContext);

    const filterFieldNames = ['Name', 'Tag'];
    const dispatchTypes = {
        'Name': [ACTION_SET_DESCRIPTION_NAME],
        'Tag': [ACTION_SET_DESCRIPTION_TAG],
    }
    const dateFields = [];
    const floatFields = [];

    return (
        <div>
            <h1>Transaction Descriptions</h1>
            <FilterForm dispatch={dispatch}
                fieldNames={filterFieldNames}
                dispatchTypes={dispatchTypes}
                dateFields={dateFields}
                floatFields={floatFields} />
            <TransactionDescriptionTable />
        </div>
    )
}

export default TransactionDescriptionView;