import React, { createContext, useReducer } from 'react';
import { DateInterval } from '../utils/Enums';


export const ACTION_SET_DATE_INTERVAL = 'ACTION_SET_DATE_INTERVAL';


const GraphReducer = (state, action) => {

    switch (action.type) {
        case ACTION_SET_DATE_INTERVAL:
            return {
                ...state,
                dateInterval: action.payload.dateInterval
            }
        }            

    return state;
}

const GraphContext = createContext();

const initialState = {
    dateInterval: DateInterval.MONTH
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