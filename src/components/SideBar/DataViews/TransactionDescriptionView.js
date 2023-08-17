import { useContext } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FilterForm, SortableTable } from '../Utils';
import { ACTION_SET_TRANSACTION_DESCRIPTION_TAG, DataContext, ACTION_TOGGLE_OBJECT_VISIBILITY } from '../../../contexts/DataContext';
import { SideBarContext, ACTION_SET_DESCRIPTION_NAME, ACTION_SET_DESCRIPTION_TAG } from '../../../contexts/SideBarContext';
import { filterTransactionDescriptions } from '../../../events/SideBarEvents';


const TransactionDescriptionFilterForm = () => {

    const { dispatch } = useContext(SideBarContext);

    const filterFieldNames = ['Name', 'Tag'];
    const dispatchTypes = {
        'Name': [ACTION_SET_DESCRIPTION_NAME],
        'Tag': [ACTION_SET_DESCRIPTION_TAG],
    }
    const dateFields = [];
    const floatFields = [];

    return(
        <FilterForm dispatch={dispatch}
                fieldNames={filterFieldNames}
                dispatchTypes={dispatchTypes}
                dateFields={dateFields}
                floatFields={floatFields} />
    )
}

const TransactionDescriptionTable = () => {

    const { state, dispatch } = useContext(DataContext);

    const handleActiveButtonClick = (transactionDescription) => {
        dispatch({
            type: ACTION_TOGGLE_OBJECT_VISIBILITY,
            payload: {
                object: transactionDescription,
                isActive: !transactionDescription.isActive
            }
        });
    }

    const handleSelection = (transactionDescription, tag) => {

        dispatch({
            type: ACTION_SET_TRANSACTION_DESCRIPTION_TAG,
            payload: {
                transactionDescription: transactionDescription,
                tag: tag,
            }
        });
    }

    const schema = [{
        name: 'Name',
        property: 'name',
        getProperty: (transactionDescription) => transactionDescription.name,
        sort: true
    }, {
        name: 'Tag',
        property: 'tag',
        getProperty: (transactionDescription) => transactionDescription.tag.name,
        displayField: (transactionDescription) => {
            return (
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:transactionDescription.tag.colour}}>
                        {transactionDescription.tag.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {state.tags.map((tag) => {
                            return <Dropdown.Item key={tag.id} onClick={() => handleSelection(transactionDescription, tag)}>{tag.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )
        },
        sort: true,
    }, {
        name: '',
        displayField: (transactionDescription) => {
            return (
                <Button><FontAwesomeIcon onClick={() => handleActiveButtonClick(transactionDescription)} icon={transactionDescription.isActive ? faPlay : faPause} /></Button>
            )
        }
    }]


    let transactionDescriptions = state.descriptions;

    const { state: sideBarState } = useContext(SideBarContext);
    const { descriptionName, descriptionTag } = sideBarState;

    return (
        <SortableTable schema={schema} data={transactionDescriptions} filter={(descriptions) => filterTransactionDescriptions(descriptions, descriptionName, descriptionTag)} />
    )
}


const TransactionDescriptionView = () => {



    return (
        <div>
            <h1>Transaction Descriptions</h1>
            <TransactionDescriptionFilterForm />
            <TransactionDescriptionTable />
        </div>
    )
}

export default TransactionDescriptionView;