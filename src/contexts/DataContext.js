import React from "react";
import { useReducer } from "react";

export const ACTION_SET_TRANSACTIONS = 'SET_TRANSACTIONS';

const DataReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload.data
            }
        default:
            return state;
    }
}

const DataContext = React.createContext();

const initialState = {
    transactions: []
}

const DataProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DataReducer, initialState);
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
