import { constants } from './constants';

export const createStem = (vocabObject, partsOfSpeech) => {
    let newVocabObject = JSON.parse(JSON.stringify(vocabObject));
    partsOfSpeech.forEach(part => {
        if(part === 'ichidan verb') { //る　verb
            newVocabObject.isIchidanVerb = true;
        } else if(part === 'godan verb') {
            newVocabObject.isGodanVerb = true;
        } else if(part === 'する verb') {
            newVocabObject.isSuruVerb = true;
        } else if(part === 'い adjective') {
            newVocabObject.isIAdjective = true;
        } else /*if(part.includes('noun') || part.includes('adverb') || part === 'の adjective' || part === 'な adjective')*/ {
            newVocabObject.isNoun = true;
        }
    });
    addStems(newVocabObject);
    return newVocabObject;
};

const addStems = (vocabObject) => {
    if(vocabObject.isIchidanVerb || vocabObject.isGodanVerb || vocabObject.isSuruVerb || vocabObject.isIAdjective) {
        vocabObject.kanaStems = vocabObject.readings.map(reading => {
            return reading.substring(0,reading.length-1);
        });
        vocabObject.kanjiStem = vocabObject.value.substring(0,vocabObject.value.length-1);
    } else {
        vocabObject.kanaStems = vocabObject.readings;
        vocabObject.kanjiStem = vocabObject.value;
    }
}
