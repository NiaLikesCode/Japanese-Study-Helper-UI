import { parse } from 'node-html-parser';

const OPENRUBYTAG = '<ruby>',
CLOSERUBYTAG = '</ruby>',
OPENRTTAG = '<rt>',
CLOSERTTAGE = '</rt>';

//check the reading and the kanji to make sure it matches
export const highlightVocabInArticle = (articleNode, vocabList) => {
    let finalObject = parse(articleNode.toString());
    for(let i = 0; i < vocabList.length; i++) {
        let articleString = finalObject.toString();
        let searchType = '';
        if(vocabList[i].partOfSpeech.includes('noun')) { 
            searchType = OPENRUBYTAG + vocabList[i].vocabKanji + OPENRTTAG + vocabList[i].
         } else {
            searchType = 'stem';
         }
        let searchText = vocabList[i][searchType];
        if(finalObject.text.includes(searchText)) {
            let locations = findLocationsOfWord(articleString.toString(), OPENRUBYTAG + vocabList[i]);

        }
    }
    return finalObject;
}

const insert = (origText, startPos, text) => {
   return origText.substring(0, startPos) + text + origText.substring(startPos);
}

const findLocationsOfWord = (text, searchWord) => {
    let locations = [],
    currentPosition = 0;
    while(text.includes(searchWord)) {
        currentPosition = text.search(searchWord);
        if(locations.length > 0) locations.push(currentPosition + location[locations.length-1])
        else {
            locations.push(currentPosition);
        }
         text = text.substring(currentPosition + searchWord.length);
    }
    return locations;
}

const getInbetweenContent = (openTagIdentifier, closingTagIdentifier, text) => {
    
}