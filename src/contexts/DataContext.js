import React from "react";
import { useReducer } from "react";
import Tag from "../models/Tag";

export const ACTION_SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const ACTION_SET_TAG_NAME = 'SET_TAG_NAME';
export const ACTION_SET_TAG_COLOUR = 'SET_TAG_COLOUR';

const DataReducer = (state, action) => {

    switch (action.type) {
        case ACTION_SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload.data
            }

        case ACTION_SET_TAG_NAME:
            state.tags.find((tag) => tag.id == action.payload.tagId).name = action.payload.data;
            return {
                ...state,
                tags: state.tags
            }

        case ACTION_SET_TAG_COLOUR:
            state.tags.find((tag) => tag.id == action.payload.tagId).colour = action.payload.data;
            return {
                ...state,
                tags: state.tags
            }
            
        default:
            return state;
    }
}

const DataContext = React.createContext();

const initialState = {
    transactions: [],
    tags: [new Tag(1, 'Food', '#ff0000'), new Tag(2, 'Transport', '#00ff00'), new Tag(3, 'Entertainment', '#0000ff')]
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
