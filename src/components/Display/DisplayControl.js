import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ChartCategory, DateInterval, ChartStyle, DisplayStyle } from '../../utils/Enums';
import { GraphContext, ACTION_SET_CHART_SELECTION } from '../../contexts/GraphContext';


const DisplayPropertySelector = ({ enumType, currentSelection, onClick }) => {

    return (
        <Dropdown variant='secondary' className='layout-center'>
            <Dropdown.Toggle className='theme-active-primary'>
                {currentSelection}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(enumType).map((key) => {
                    return <Dropdown.Item key={key} onClick={() => onClick(enumType[key])}>{key}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}


const DisplayControl = () => {

    const { state, dispatch } = useContext(GraphContext);

    const handleSelection = (fieldName, fieldValue) => {
        dispatch({
            type: ACTION_SET_CHART_SELECTION,
            payload: {
                fieldName: fieldName,
                fieldValue: fieldValue
            }
        })
    }

    const schema = [{
        'fieldName': 'dateInterval',
        'enum': DateInterval,
        'currentValue': Object.keys(DateInterval)[state.dateInterval],
    }, {
        'fieldName': 'chartCategory',
        'enum': ChartCategory,
        'currentValue': Object.keys(ChartCategory)[state.chartCategory],
    }, {
        'fieldName': 'chartStyle',
        'enum': ChartStyle,
        'currentValue': Object.keys(ChartStyle)[state.chartStyle],
    }, {
        'fieldName': 'displayStyle',
        'enum': DisplayStyle,
        'currentValue': Object.keys(DisplayStyle)[state.displayStyle],
    }]

    return (
        <div className='layout-center-content layout-content-width display-controls'>
            {schema.map((item) => {
                return (<DisplayPropertySelector enumType={item.enum} currentSelection={item.currentValue} onClick={(newValue) => handleSelection(item.fieldName, newValue)} />
                );
            })}
        </div>
    );
}

export default DisplayControl;