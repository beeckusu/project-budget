import React, { useReducer } from 'react';


export const ACTION_SET_MIN_DATE = 'SET_MIN_DATE';
export const ACTION_SET_MAX_DATE = 'SET_MAX_DATE';
export const ACTION_SET_DESCRIPTION = 'SET_DESCRIPTION';
export const ACTION_SET_MIN_AMOUNT = 'SET_MIN_AMOUNT';
export const ACTION_SET_MAX_AMOUNT = 'SET_MAX_AMOUNT';
export const ACTION_SET_TAG = 'SET_TAG';
export const ACTION_SET_DESCRIPTION_NAME = 'SET_DESCRIPTION_NAME';
export const ACTION_SET_DESCRIPTION_TAG = 'SET_DESCRIPTION_TAG';
export const ACTION_CLEAR_FILTERS = 'CLEAR_FILTERS';


const actionToField = {
    'SET_MIN_DATE': 'minDate',
    'SET_MAX_DATE': 'maxDate',
    'SET_DESCRIPTION': 'description',
    'SET_MIN_AMOUNT': 'minAmount',
    'SET_MAX_AMOUNT': 'maxAmount',
    'SET_TAG': 'tag',
    'SET_DESCRIPTION_NAME': 'descriptionName',
    'SET_DESCRIPTION_TAG': 'descriptionTag',
}


const SideBarReducer = (state, action) => {



    if (action.type in actionToField) {
        const field = actionToField[action.type];

        return {
            ...state,
            [field]: action.payload.data
        }
    }

    switch(action.type) {
        case ACTION_CLEAR_FILTERS:
            const { dispatchTypes } = action.payload;

            const newState = {};
            Object.keys(state).forEach(field => {
                newState[field] = '';
            });

            return newState;
    }


}

const SideBarContext = React.createContext();

const initialState = {
    minDate: '',
    maxDate: '',
    description: '',
    minAmount: '',
    maxAmount: '',
    tag: '',
    descriptionName: '',
    descriptionTag: '',
}

const SideBarProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SideBarReducer, initialState);
    return (
        <SideBarContext.Provider value={{ state, dispatch }}>
            {children}
        </SideBarContext.Provider>
    );
};

export { SideBarContext, SideBarProvider };
