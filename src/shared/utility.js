import { parse } from 'node-html-parser';

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
    node.childNodes.map(child => {
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

export const objectDeepCopy = (object) => {
    return JSON.parse(JSON.stringify(object));
}