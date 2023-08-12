import React, { useReducer } from 'react';


const actionToField = {
    'SET_MIN_DATE': 'minDate',
    'SET_MAX_DATE': 'maxDate',
    'SET_DESCRIPTION': 'description',
    'SET_MIN_AMOUNT': 'minAmount',
    'SET_MAX_AMOUNT': 'maxAmount',
}


const SideBarReducer = (state, action) => {

    if (!(action.type in actionToField)) {
        return state;
    }

    const field = actionToField[action.type];

    return {
        ...state,
        [field]: action.payload.data
    }

}

const SideBarContext = React.createContext();

const initialState = {
    minDate: '',
    maxDate: '',
    description: '',
    minAmount: '',
    maxAmount: '',
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
