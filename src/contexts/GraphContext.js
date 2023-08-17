import React, { createContext, useReducer } from 'react';
import { DateInterval, ChartCategory, ChartStyle, DisplayStyle } from '../utils/Enums';


export const ACTION_SET_CHART_SELECTION = 'ACTION_SET_CHART_SELECTION';


const GraphReducer = (state, action) => {
    console.log("Dispatch");
    console.log(action);

    switch (action.type) {
        case ACTION_SET_CHART_SELECTION:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.fieldValue
            }
        default:
            return state;
    }
}

const GraphContext = createContext();

const initialState = {
    dateInterval: DateInterval.MONTH,
    chartCategory: ChartCategory.NONE,
    chartStyle: ChartStyle.STACKED,
    displayStyle: DisplayStyle.CHART,
}

const GraphProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GraphReducer, initialState);

    return (
        <GraphContext.Provider value={{ state, dispatch }}>
            {children}
        </GraphContext.Provider>
    );
}

export { GraphContext, GraphProvider };