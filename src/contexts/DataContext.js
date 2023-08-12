import React from "react";
import { useReducer } from "react";
import Tag from "../models/Tag";
import { v4 as uuidv4 } from 'uuid';

export const ACTION_SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const ACTION_SET_TAG_NAME = 'SET_TAG_NAME';
export const ACTION_SET_TAG_COLOUR = 'SET_TAG_COLOUR';
export const ACTION_DELETE_TAG = 'DELETE_TAG';
export const ACTION_ADD_TAG = 'ADD_TAG';

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

        case ACTION_ADD_TAG:
            const newTagId = uuidv4();
            const newTag = new Tag(newTagId, 'New Tag', '#000000');
            state.tags.push(newTag);

            return {
                ...state,
                tags: state.tags
            }

        case ACTION_DELETE_TAG:
            const tagIndex = state.tags.findIndex((tag) => tag.id == action.payload.tagId);

            if (tagIndex == -1) {
                return state;

            }
            
            state.tags.splice(tagIndex, 1);

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
