import React, { createContext, useReducer } from 'react';
import { DateInterval, ChartCategory, ChartStyle } from '../utils/Enums';


export const ACTION_SET_DATE_INTERVAL = 'ACTION_SET_DATE_INTERVAL';
export const ACTION_SET_CHART_CATEGORY = 'ACTION_SET_CHART_CATEGORY';
export const ACTION_SET_CHART_STYLE = 'ACTION_SET_CHART_STYLE';


const GraphReducer = (state, action) => {

    switch (action.type) {
        case ACTION_SET_DATE_INTERVAL:
            return {
                ...state,
                dateInterval: action.payload.dateInterval
            }
        case ACTION_SET_CHART_CATEGORY:
            return {
                ...state,
                chartCategory: action.payload.chartCategory
            }

        case ACTION_SET_CHART_STYLE:
            return {
                ...state,
                chartStyle: action.payload.chartStyle
            }
    }


    return state;
}

const GraphContext = createContext();

const initialState = {
    dateInterval: DateInterval.MONTH,
    chartCategory: ChartCategory.NONE,
    chartStyle: ChartStyle.STACKED,
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