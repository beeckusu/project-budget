import React, { useReducer } from 'react';


export const ACTION_SET_COLUMNS = 'ACTION_SET_COLUMNS';
export const ACTION_SET_COLUMN_INDEX = 'ACTION_SET_COLUMN_INDEX';


const TransactionParsingReducer = (state, action) => {

    switch (action.type) {

        case ACTION_SET_COLUMNS:

            return {
                ...state,
                columns: action.payload.value,
            }

        case ACTION_SET_COLUMN_INDEX:

            let fieldName = action.payload.fieldName;
            let value = action.payload.value;

            return {
                ...state,
                [fieldName]: value,
            }

        default:
            return state;
        }
}

const TransactionParsingContext = React.createContext();

let initialState = {
    dateCol: 0,
    descriptionCol: 1,
    expenseCol: 2,
    depositCol: 3,
    columns: [],
}


const TransactionParsingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TransactionParsingReducer, initialState);

    return (
        <TransactionParsingContext.Provider value={{ state, dispatch }}>
            {children}
        </TransactionParsingContext.Provider>
    );
}


export { TransactionParsingContext, TransactionParsingProvider };