import { createStem } from './vocabModifier';

describe('createStem()', () => { 
    let vocabObject, partsOfSpeech;

    it('should add kana stem and kanji stem to vocabObject for ichidan verb', () => {
        debugger
        vocabObject = {
            id: 2469,
            key: 2469,
            meanings: ['To Stand Up', 'To Stand Something Up', 'To Erect', 'To Erect Something'],
            readings: ['たてる'],
            selected: false,
            value: '立てる'
        };
        partsOfSpeech = ['transitive verb', 'ichidan verb'];
        let expectedObject = {
            id: 2469,
            key: 2469,
            meanings: ['To Stand Up', 'To Stand Something Up', 'To Erect', 'To Erect Something'],
            readings: ['たてる'],
            selected: false,
            value: '立てる',
            isIchidanVerb: true,
            kanaStems: ['たて'],
            kanjiStem: '立て'
        }
        let actualObject = createStem(vocabObject, partsOfSpeech);
        expect(actualObject).toMatchObject(expectedObject);
    });

    it('should add kana stem and kanji stem to vocabObject for い adjective', () => {
        debugger
        vocabObject = {
            id: 2469,
            key: 2469,
            meanings: ['Strong'],
            readings: ['つよい'],
            selected: false,
            value: '強い'
        };
        partsOfSpeech = ['い adjective'];
        let expectedObject = {
            id: 2469,
            key: 2469,
            meanings: ['Strong'],
            readings: ['つよい'],
            selected: false,
            value: '強い',
            isIAdjective: true,
            kanaStems: ['つよ'],
            kanjiStem: '強'
        }
        let actualObject = createStem(vocabObject, partsOfSpeech);
        expect(actualObject).toMatchObject(expectedObject);
    });

    it('should add kana stem and kanji stem to vocabObject for adverb', () => {
        debugger
        vocabObject = {
            id: 2469,
            key: 2469,
            meanings: ['Really', 'Truly'],
            readings: ['ほんとうに'],
            selected: false,
            value: '本当に'
        };
        partsOfSpeech = ['adverb'];
        let expectedObject = {
            id: 2469,
            key: 2469,
            meanings: ['Really', 'Truly'],
            readings: ['ほんとうに'],
            selected: false,
            value: '本当に',
            isNoun: true,
            kanaStems: ['ほんとうに'],
            kanjiStem: '本当に'
        }
        let actualObject = createStem(vocabObject, partsOfSpeech);
        expect(actualObject).toMatchObject(expectedObject);
    });
});