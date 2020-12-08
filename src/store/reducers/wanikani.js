import * as actionTypes from '../actions/actionTypes';

const initialState = {
    wkLevels: null
};

const setVocabList = (state, action) => {
    return {wkLevels: action.vocabListObject};
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_VOCAB_LIST: return setVocabList(state, action);
        default:
            return state;
    }
};

export default reducer;