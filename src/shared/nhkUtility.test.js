import { parse } from 'node-html-parser';
import { highlightVocabInArticle } from './nhkUtility'

describe('highligtVocabInArticle()', () => { 
    let articleNode, vocabList;

    vocabList = [
        {
            vocabKana: 'はなす',
            stem: 'はな',
            vocabKanji: '話す',
            partOfSpeech: 'godan verb'
        },
        {
            vocabKana: 'とうきょうと',
            vocabKanji: '東京都',
            partOfSpeech: 'proper noun'
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
        debugger
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