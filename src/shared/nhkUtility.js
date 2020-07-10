import { parse } from 'node-html-parser';

const OPENRUBYTAG = '<ruby>',
CLOSERUBYTAG = '</ruby>',
OPENRTTAG = '<rt>',
CLOSERTTAGE = '</rt>',
OPENMARKTAG = '<mark>',
CLOSEMARKTAG = '</mark>';

//check the reading and the kanji to make sure it matches
export const highlightVocabInArticle = (articleNode, vocabList) => {
    let finalArticleNode = parse(articleNode.toString());
    for(let i = 0; i < vocabList.length; i++) {
        let articleString = finalArticleNode.toString();
        let searchText;
        let locations;
        //for each instance of a kanaStem check to see if it exists in the text
        vocabList[i].kanaStems.forEach(kanaStem => {
            let possibleSearchText = OPENRUBYTAG + vocabList[i].kanjiStem + OPENRTTAG + kanaStem + CLOSERTTAGE + CLOSERUBYTAG;
            //if text with this kana is found to exist then update searchTexts
            if(articleString.includes(possibleSearchText)) {
                searchText = possibleSearchText;
            }
        }); 
        if(searchText) {
            locations = findLocationsOfWord(articleString.toString(), searchText);
            //add mark tag to all locations where searchText was found
            locations.forEach(location => {
                articleString = insertMarkTag(articleString, location, searchText);
            });
        }
        finalArticleNode = parse(articleString);
    }
    return finalArticleNode;
}

const insertMarkTag = (origText, startPos, text) => {
   return origText.substring(0, startPos) + OPENMARKTAG + origText.substring(startPos, startPos + text.length) + CLOSEMARKTAG + origText.substring(startPos + text.length);
}

const findLocationsOfWord = (text, searchWord) => {
    let locations = [],
    currentPosition = 0;
    while(text.includes(searchWord)) {
        currentPosition = text.search(searchWord);
        if(locations.length > 0) locations.push(currentPosition + locations[locations.length-1] + searchWord.length)
        else {
            locations.push(currentPosition);
        }
         text = text.substring(currentPosition + searchWord.length);
    }
    //reverse array so that it inserts new text at the end and doesn't ruin other location accuracy
    return locations.reverse();
}

/*const getInbetweenContent = (openTagIdentifier, closingTagIdentifier, text) => {
    
}*/