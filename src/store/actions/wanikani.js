import * as actionTypes from './actionTypes';
import { getDataFromAllPages, mapOutLevels, extractVocabStatus } from '../../shared/utility';
import { constants } from '../../shared/constants';
import { waniKaniAxios } from '../../nhkAxios';

export const updateVocabDetails = (level, vocabID) => {
    /*let data = getWanikaniData();
    return {
        type: actionTypes.UPDATE_VOCAB_DETAILS,
        level: level,
        vocabID: vocabID,
        vocabData: data
        
    };*/
}

export const setVocabList = (data) => {
    return {
        type: actionTypes.SET_VOCAB_LIST,
        vocabListObject: data
    }
}

export const initVocabList = () => {
    return dispatch => {
        const wkLevel = localStorage.getItem('wkLevel');
        if(wkLevel) {
            console.log(wkLevel);
        } else {
            getDataFromAllPages(constants.WK_CALLS.VOCAB_DATA_URL).then(async pages => {
                let finalData = {};
                let startedVocabDataPages;
                pages.forEach(page => {
                    finalData = mapOutLevels(page, finalData);
                });
                try {
                    startedVocabDataPages = await getDataFromAllPages(constants.WK_CALLS.STARTED_VOCAB_URL);
                    startedVocabDataPages.forEach(page => {
                        finalData = extractVocabStatus(page, finalData);
                    });
                    dispatch(setVocabList(finalData));
                } catch (err) {
                    console.log(err);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
