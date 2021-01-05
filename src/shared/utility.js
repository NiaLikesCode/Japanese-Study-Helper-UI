import { parse } from 'node-html-parser';
import { waniKaniAxios } from '../axios';
import { createStem } from '../shared/vocabModifier';

/**
 * Returns HTML object with with attribute of a certain value and all it's children
 * @param {Object} object - HTML Java object to parse through
 * @param {string} property - HTML property of target object
 * @param {string} value - Value of desired attribte
 */
export const findObjectInHTML = (object, property, value) => {
    var finalObject = null;
    if(object[property] === value) {
        finalObject = object;
       
    } else {
        if(object.childNodes) {
            if(object.childNodes.length > 0) {
                for(var i = 0; i < object.childNodes.length; i++) {
                    var result = findObjectInHTML(object.childNodes[i], property, value);
                    if(result != null) {
                        finalObject = result;
                        break;
                    }
                }
            }
        }
    }
    return finalObject;
}

const exchangeChildren = (object, htmlTag, parentObject) => {
    let indexOfObject = parentObject.childNodes.findIndex(child => child.tagName === htmlTag);
    //replace object to be removed position in array with it's children
    parentObject.childNodes.splice(indexOfObject,1, ...object.childNodes)
}

/**
 * Removes all instances of an element with given tag from HTML Object while it keeps it's children or inner HTML
 * @param {Object} object 
 * @param {string} htmlTag 
 * @param {{Object}} parentObject 
 */
export const removeAllInstancesByTag = (object, htmlTag, parentObject) => {
    if(object.tagName === htmlTag) {
        if(object.childNodes) {
            if(object.childNodes.length === 1) {
                if(object.childNodes[0].nodeType === 3) {
                    parentObject.exchangeChild(object, object.childNodes[0]);
                } else {
                    exchangeChildren(object, htmlTag, parentObject);
                    for(let i = 0; i < object.childNodes.length; i++) {
                        removeAllInstancesByTag(object.childNodes[i], htmlTag, parentObject);
                    }
                }
            } else {
                exchangeChildren(object, htmlTag, parentObject);
                for(let i = 0; i < object.childNodes.length; i++) {
                    removeAllInstancesByTag(object.childNodes[i], htmlTag, parentObject);
                }
            }
        } else {
            parentObject.childNodes = parentObject.childNodes.filter(node => node !== object);
        }

    } else if(object.childNodes) {
        for(let i = 0; i < object.childNodes.length; i++) {
            removeAllInstancesByTag(object.childNodes[i], htmlTag, object);
        }
    }
}

const swapNodeWithChildren = (node) => {
    let indexOfObject = node.parentNode.childNodes.findIndex(child => child === node);
    //make node's parent the new parent of it's children
    node.childNodes.forEach(child => {
        if(child.nodeType !== 3) {
            child.parentNode = node.parentNode;
        }
    });
    //replace object to be removed position in array with it's children
    node.parentNode.childNodes.splice(indexOfObject,1, ...node.childNodes)
}

/**
 * Removes all instances of element with given attribute from HTML Object while it keeps it's children
 * @param {Object} object 
 * @param {string} attribute 
 * @param {string} attributeValue 
 * @param {Object} parentObject 
 */
export const removeAllInstancesByAttribute = (object, attribute, attributeValue) => {
    let finalObject = parse(object.toString()),
    queue = [];
    queue.push(finalObject);
    while(queue.length > 0) {
        let queueLength = queue.length;
        while(queueLength > 0) {
            let currentNode = queue.shift();
            let hasAttributeValue = false;

            //check if current node has attribute value 
            if(currentNode.attributes) {
                if(currentNode.attributes[attribute]) {
                    if(currentNode.attributes[attribute].includes(attributeValue)) {
                        hasAttributeValue = true;
                    }
                }
            }

            if(currentNode.childNodes) {
                //go through every child and add them to the queue 
                for(let i = 0; i < currentNode.childNodes.length; i++) {
                    let childNode = currentNode.childNodes[i];
                    if(childNode.nodeType !== 3) {
                        queue.push(childNode);
                    }
                }
                //if currentNode has attribute move all it's children to the parentNode in same place as currentNode
                if(hasAttributeValue) {
                    if(currentNode.childNodes.length > 0) {
                        swapNodeWithChildren(currentNode);
                    } else {
                        currentNode.parentNode.childNodes = currentNode.parentNode.childNodes.filter(node => node !== currentNode);
                    }
                }
            }
            queueLength--;
        }
    }
    return finalObject;
}

export const mapOutLevels = (object, currentResultsObject) => {
    //makes deep copy of object
    let mappedLevels = JSON.parse(JSON.stringify(currentResultsObject));
    object.data.forEach(vocab => {
        //checking to see if there is an object with the same level as the vocab. 
        let foundLevelObject = mappedLevels[vocab.data.level];
        let vocabObject = {
            id: vocab.id,
            key: vocab.id,
            value: vocab.data.characters,
            meanings: vocab.data.meanings.map(({meaning}) => meaning),
            readings: vocab.data.readings.map(({reading}) => reading),
            selected: false,
            started: false,
            burned: false,
        };
        //add stems to vocab object
        vocabObject = createStem(vocabObject, vocab.data.parts_of_speech)
        //If the level the vocab is from exists then it adds the vocab to the array list of vocab for that level, 
        //otherwise it creates a new level and creates array of vocab in that level and add vocab to that array
        if(foundLevelObject) {
            mappedLevels[vocab.data.level].vocabList[vocab.id] = vocabObject;
        } else {
            let vocabListObject = {};
            vocabListObject[vocab.id] = vocabObject;
            let levelObject = {
                wkLevelTitle: 'Level ' + vocab.data.level,
                wkLevelId: vocab.data.level,
                vocabList: vocabListObject
            };
            mappedLevels[vocab.data.level] = levelObject;
        }
    });
    return mappedLevels;
}

export const extractVocabStatus = (vocabStatuses, currentObject) => {
    //makes deep copy of object
    let mappedLevels = JSON.parse(JSON.stringify(currentObject));
    //console.log(vocabStatuses.data);
    vocabStatuses.data.forEach(vocabStatus => {
        let id = vocabStatus.data.subject_id
        Object.values(mappedLevels).forEach(level => {
            let isAllLevelSelected = true;
            let vocabList = level.vocabList;
            if(vocabList.hasOwnProperty(id)) {
                vocabList[id].started = true;
                vocabList[id].srsStage = vocabStatus.data.srs_stage;
                vocabList[id].selected = true;
                if(!vocabList[id].selected) isAllLevelSelected = false;
                if(vocabList[id].srsStage == 9) vocabList[id].burned = true;
            }
            level.isAllSelcted = isAllLevelSelected;
        }); 
    });
    return mappedLevels;
}

export const getDataFromAllPages = async (url) => {
    let pages = [];
    try {
        //getting intial data
        const initialData = await waniKaniAxios.get(url);
        //using the intial data and mapping out the levels then saving it into results object
        pages.push(initialData.data);
        //get the next page url
        let nextPageUrl = initialData.data.pages.next_url;
        //while there is a next page url keep calling the service and adding it to the results object
        while(nextPageUrl){
            const laterData = await waniKaniAxios.get(nextPageUrl);
            nextPageUrl = laterData.data.pages.next_url;
            pages.push(laterData.data);
        }
    } catch (err) {
        Promise.reject(new Error(`Opps new wanikani error, ${err}`));
    }
    return Promise.resolve(pages);
}

/*function deepCopy(obj) {
    if(typeof obj === 'object') {
     return Object.keys(obj)
      .map(k => ({ [k]: deepCopy(obj[k]) }))
      .reduce((a, c) => Object.assign(a, c), {});
    } else if(Array.isArray(obj)) {
     return obj.map(deepCopy)
    }
    return obj;
   }*/