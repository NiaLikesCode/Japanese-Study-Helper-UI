import { constants } from './constants';

export const createStem = (vocabObject, partsOfSpeech) => {

    partsOfSpeech.forEach(part => {
        switch(part) {
            case 'ichidan verb':
                vocabObject.isIchidanVerb = true; //る　verb
                
                break;
            case 'godan verb':
                vocabObject.isGodanVerb = true;
                break;
            case 'する verb':
                vocabObject.isSuruVerb = true;
                break;
            case 'い adjective':
                vocabObject.isIAdjective = true;
                break;
            case 'な adjective':
                vocabObject.isNaAdjective = true;
                break;
            case 'の adjective':
                vocabObject.isNaAdjective = true;
                break;
            default:
                vocabObject.isNoun = true;
        }

    });


};

const extractStem = (vocabObject, vocabType) => {

}

const vocabVariationFactory = (vocab) => {
    

}