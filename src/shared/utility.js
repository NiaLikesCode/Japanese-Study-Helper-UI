/**
 * Returns HTML object with with attribute of a certain value
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
 * Removes all instances of tag from HTML Object while keeps it's children
 * @param {Object} object 
 * @param {string} htmlTag 
 * @param {*} parentHTML 
 */
export const removeAllInstancesOfTag = (object, htmlTag, parentObject) => {
    if(object.childNodes.length > 0) {
        if(object.tagName === htmlTag) {
            let indexOfObject = parentObject.childNodes.findIndex(child => child.tagName === htmlTag);
            //replace object to be removed position in array with it's children
            parentObject.childNodes.splice(indexOfObject,1, object.childNodes);
            for(let i = 0; i < object.childNodes.length; i++) {
                removeAllInstancesOfTag(object.childNodes[i], htmlTag, parentObject);
            }
        } else {
            for(let i = 0; i < object.childNodes.length; i++) {
                removeAllInstancesOfTag(object.childNodes[i], htmlTag, object);
            }
        }
    }
}