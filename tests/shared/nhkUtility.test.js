import { parse } from 'node-html-parser';
import { highlightVocabInArticle } from '../../src/shared/nhkUtility'

describe('highligtVocabInArticle()', () => { 
    let articleNode, vocabList;

    vocabList = [
        {
            id: 2469,
            key: 2469,
            meanings: ['to speak'],
            readings: ['はなす'],
            selected: false,
            value: '話す',
            isGodanVerb: true,
            kanaStems: ['はな'],
            kanjiStem: '話'
        },
        {
            id: 2469,
            key: 2469,
            meanings: ['To Stand Up', 'To Stand Something Up', 'To Erect', 'To Erect Something'],
            readings: ['たてる'],
            selected: false,
            value: '立てる',
            isIchidanVerb: true,
            kanaStems: ['たて'],
            kanjiStem: '立て'
        },
        {
            id: 23254,
            key: 23254,
            meanings: ['tokyo metro', 'tokyo metropolis'],
            readings: ['とうきょうと'],
            selected: false,
            value: '東京都',
            kanaStems: ['とうきょうと'],
            kanjiStem: '東京都'
        }
    ];

    beforeEach(() => {
        articleNode = parse(
            `<p>
                <ruby>新<rt>あたら</rt></ruby>
                しいコロナウイルスの
                <ruby>問題<rt>もんだい</rt></ruby>
                で
                <ruby>東京都<rt>とうきょうと</rt></ruby>
                <ruby>休<rt>やす</rt></ruby>
                みになっていた
                <ruby>東京都<rt>とうきょうと</rt></ruby>
                の<ruby>小学校<rt>しょうがっこう</rt></ruby>
                を
                <ruby>話<rt>はな</rt></ruby>
                します
            </p>`
        );
        articleNode.removeWhitespace();
    });

    it('should add <mark> Element around elements contained in vocabList', () => {
        let expectedObject = parse(
            `<p>
                <ruby>新<rt>あたら</rt></ruby>
                しいコロナウイルスの
                <ruby>問題<rt>もんだい</rt></ruby>
                で
                <mark><ruby>東京都<rt>とうきょうと</rt></ruby></mark>
                <ruby>休<rt>やす</rt></ruby>
                みになっていた
                <mark><ruby>東京都<rt>とうきょうと</rt></ruby></mark>
                の<ruby>小学校<rt>しょうがっこう</rt></ruby>
                を
                <mark><ruby>話<rt>はな</rt></ruby></mark>
                します
            </p>`
        );
        expectedObject.removeWhitespace();
        let actualObject = highlightVocabInArticle(articleNode, vocabList);
        expect(actualObject.toString()).toEqual(expectedObject.toString());
    });
});