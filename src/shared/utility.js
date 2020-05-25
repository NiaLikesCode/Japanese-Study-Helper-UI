/**
 * Returns HTML object with with attribute of a certain value and all it's children
 * @param {Object} object - HTML Java object to parse through
 * @param {string} attribute - HTML Attribute of target object
 * @param {string} value - Value of desired attribte
 */
export const findObjectInHTML = (object, attribute, value) => {
    var finalObject = null;
    if(object[attribute] === value) {
        finalObject = object;
       
    } else {
        if(object.childNodes.length > 0) {
            for(var i = 0; i < object.childNodes.length; i++) {
                var result = findObjectInHTML(object.childNodes[i], attribute, value);
                if(result != null) {
                    finalObject = result;
                    break;
                }
            }
        }
    }
    return finalObject;
}

export const replaceAllAttributesInHTMLObject = (object, oldAttribute, newAttribute) => {
    if(object.attributes[oldAttribute]) {
        object.attributes[newAttribute] = object.attributes[oldAttribute];
        delete object.attributes[oldAttribute];
        if(object.childNodes.length > 0) {
            object = replaceAllAttributesInHTMLObject(object, oldAttribute, newAttribute);
        }
    }
    return object;
}
/**
 * Removes all instances of an element with given tag from HTML Object while it keeps it's children
 * @param {Object} object 
 * @param {string} htmlTag 
 * @param {{Object}} parentObject 
 */
export const removeAllInstancesByTag = (object, htmlTag, parentObject) => {
    if(object.childNodes) {
        if(object.tagName === htmlTag) {
            let indexOfObject = parentObject.childNodes.findIndex(child => child.tagName === htmlTag);
            //replace object to be removed position in array with it's children
            parentObject.childNodes.splice(indexOfObject,1, object.childNodes);
            for(let i = 0; i < object.childNodes.length; i++) {
                removeAllInstancesByTag(object.childNodes[i], htmlTag, parentObject);
            }
        } else {
            for(let i = 0; i < object.childNodes.length; i++) {
                removeAllInstancesByTag(object.childNodes[i], htmlTag, object);
            }
        }
    }
}

/**
 * Removes all instances of element with given attribute from HTML Object while it keeps it's children
 * @param {Object} object 
 * @param {string} attribute 
 * @param {string} attributeValue 
 * @param {Object} parentObject 
 */
export const removeAllInstancesByAttribute = (object, attribute, attributeValue, parentObject) => {
    if(object.childNodes) {
        //some element objects come back with childNodes but their length is 0
        if(object.childNodes.length > 0) {
            if(object.attributes[attribute] && object.attributes[attribute] === attributeValue) {
                //find index of current object in it's parent object
                let indexOfObject = parentObject.childNodes.findIndex(child => child.attributes[attribute] === attributeValue);
                //replace object to be removed position in array with it's children
                parentObject.childNodes.splice(indexOfObject,1, object.childNodes);
                for(let i = 0; i < object.childNodes.length; i++) {
                    removeAllInstancesByAttribute(object.childNodes[i], attribute, attributeValue, parentObject);
                }
            } else {
                for(let i = 0; i < object.childNodes.length; i++) {
                    removeAllInstancesByAttribute(object.childNodes[i], attribute, attributeValue, object);
                }
            }
        }
    }
}