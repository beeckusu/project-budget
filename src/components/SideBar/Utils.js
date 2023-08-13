import { Button, Form, Table } from 'react-bootstrap';
import { ACTION_CLEAR_FILTERS } from '../../contexts/SideBarContext';
import { useRef } from 'react';


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
            value = value != '' ? new Date(value) : value;

        } else if (floatDispatchTypes.includes(dispatchType)) {
            value = value != '' ? parseFloat(value) : value;
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

export { FilterForm };