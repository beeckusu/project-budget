import { useState, useRef } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { faArrowDownShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACTION_CLEAR_FILTERS } from '../../contexts/SideBarContext';


const FilterDateInput = ({ fieldName, dispatchTypes, onChange }) => {
    return (
        <tr>
            <td>{fieldName}</td>
            <td>From: <Form.Control type="date" dispatchtype={dispatchTypes[0]} onChange={onChange} /></td>
            <td>To: <Form.Control type="date" dispatchtype={dispatchTypes[1]} onChange={onChange} /></td>
        </tr>
    );
};


const FilterNumberInput = ({ fieldName, dispatchTypes, onChange }) => {
    return (
        <tr>
            <td>{fieldName}</td>
            <td>Min: <Form.Control type="number" dispatchtype={dispatchTypes[0]} onChange={onChange} /></td>
            <td>Max: <Form.Control type="number" dispatchtype={dispatchTypes[1]} onChange={onChange} /></td>
        </tr>
    );
};


const FilterTextInput = ({ fieldName, dispatchType, onChange }) => {
    return (
        <tr>
            <td>{fieldName}</td>
            <td colSpan="2"><Form.Control type="text" dispatchtype={dispatchType} onChange={onChange} placeholder="Search" /></td>
        </tr>
    );
};


/**
 * 
 * @param {*} dispatch - Dispatch function to send events to
 * @param {*} fieldNames - Array of field names to filter by
 * @param {*} dispatchTypes - Object where properties are fields and values are dispatch types for each field.
 * @param {*} dateFields - Array of fields that are dates. Subset of fieldNames
 * @param {*} floatFields - Array of fields that are floats. Subset of fieldNames
 */
const FilterForm = ({ dispatch, fieldNames, dispatchTypes, dateFields, floatFields }) => {

    const filterForm = useRef(null);

    const handleOnDataChange = (event) => {

        const dispatchType = event.target.getAttribute('dispatchType');
        let value = event.target.value;

        let dateDispatchTypes = [];
        dateFields.forEach(field => {
            dispatchTypes[field].forEach(dispatchType => {
                dateDispatchTypes.push(dispatchType);
            });
        });

        let floatDispatchTypes = [];
        floatFields.forEach(field => {
            dispatchTypes[field].forEach(dispatchType => {
                floatDispatchTypes.push(dispatchType);
            });
        });

        if (dateDispatchTypes.includes(dispatchType)) {
            value = value !== '' ? new Date(value) : value;

        } else if (floatDispatchTypes.includes(dispatchType)) {
            value = value !== '' ? parseFloat(value) : value;
        }

        dispatch({
            type: dispatchType,
            payload: {
                data: value,
            }
        });

    };

    const handleOnClearClick = (event) => {

        const allDispatchTypes = [];
        Object.values(dispatchTypes).forEach(dispatchTypeList => {
            dispatchTypeList.forEach(dispatchType => {
                allDispatchTypes.push(dispatchType);
            });
        });

        dispatch({
            type: ACTION_CLEAR_FILTERS,
            payload: {
                dispatchTypes: allDispatchTypes,
            }
        });

        filterForm.current.reset();

    }

    return (
        <Form ref={filterForm}>
            <Table>
                <tbody>
                    {fieldNames.map((fieldName) => {
                        if (dateFields.includes(fieldName)) {
                            return <FilterDateInput key={fieldName} fieldName={fieldName} dispatchTypes={dispatchTypes[fieldName]} onChange={handleOnDataChange} />
                        } else if (floatFields.includes(fieldName)) {
                            return <FilterNumberInput key={fieldName} fieldName={fieldName} dispatchTypes={dispatchTypes[fieldName]} onChange={handleOnDataChange} />
                        } else {
                            return <FilterTextInput key={fieldName} fieldName={fieldName} dispatchType={dispatchTypes[fieldName]} onChange={handleOnDataChange} />
                        }
                    })}
                </tbody>
            </Table>
            <Button variant="warning" onClick={handleOnClearClick} className="layout-right-aligned">Clear</Button>
        </Form>
    );
}


/**
 * 
 * @param {*} schema - Array of objects that each describe a column. For each object, the properties are:
 *     name - The name of the column to display
 *     property - The property of the data object
 *     getProperty - Function to get the property of the data object
 *     sort - Bool representing sort direction. True for ascending, false for descending, null for no sort
 *     formatter - Function to format the data
 * 
 * @param {*} data - Array of data objects to display in table
 * @returns 
 */
const SortableTable = ({ schema, data, filter }) => {

    const [sortState, setSortState] = useState({});
    const [sortedData, setSortedData] = useState(data);

    if (sortedData.length === 0 && data.length > 0) {
        setSortedData(data);
    }

    const sortOnClick = (property, getProperty) => {

        if (property in sortState) {
            sortState[property] = !sortState[property];
        } else {
            sortState[property] = true;
        }

        let newSortedData = [...data];
        newSortedData.sort((a, b) => {
            if (getProperty(a) > getProperty(b)) {
                return sortState[property] ? 1 : -1;
            } else if (getProperty(a) < getProperty(b)) {
                return sortState[property] ? -1 : 1;
            } else {
                return 0;
            }

        });

        setSortState(sortState);
        setSortedData(newSortedData);

    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {schema.map((field) => {
                        return <th onClick={field.sort ? () => sortOnClick(field.property, field.getProperty) : () => ''}>
                            {field.name} {field.property in sortState ? <FontAwesomeIcon icon={sortState[field.property] ? faArrowDownShortWide : faArrowUpWideShort } /> : ''}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {filter(sortedData).map((row) => {
                    return (
                        <tr>
                            {schema.map((field) => {
                                return <td>{field.displayField ? field.displayField(row) : field.getProperty(row)}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}


export { FilterForm, SortableTable };