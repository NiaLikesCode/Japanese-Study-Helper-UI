import { findObjectInHTML, removeAllInstancesByTag, removeAllInstancesByAttribute } from '../../src/shared/utility';
import { parse } from 'node-html-parser';

describe('findObjectInHTML()', () => {
    let object, property, value;

    beforeEach(() => {
        object = parse(`
            <div id="parent" class="myClass">
                <p id="childA" class="myClass2">myData</p>
                <p id="childB"  class="myClass2">myData2</p>
                <p id="childC" class="myClass2">myData3
                    <a id="childCA" class="myClass4"></a>
                </p>
            </div>`
        );
        object.removeWhitespace();
    });

    it('should return object with id attribute with the value childC', () => {
        property = 'id';
        value = 'childC';
        let expectedObject = parse(`
            <p id="childC" class="myClass2">myData3
                <a id="childCA" class="myClass4"></a>
            </p>
        `);
        expectedObject.removeWhitespace();
        let actualObject = findObjectInHTML(object, property, value);
        expect(actualObject.toString()).toEqual(expectedObject.toString());
    });

    it('should return null when specified value is not found for property', () => {
        property = 'id';
        value = 'myClass3';
        let expectedObject = null;
        let actualObject = findObjectInHTML(object, property, value);
        expect(actualObject).toEqual(expectedObject);
    });

    it('should return null when property is not found', () => {
        property = 'class';
        value = 'parent';
        let expectedObject = null;
        let actualObject = findObjectInHTML(object, property, value);
        expect(actualObject).toEqual(expectedObject);
    });
});

describe('removeAllInstancesByTag()', () => { 
    let object, htmlTag;

    beforeEach(() => {
        object = parse(`
            <div id="parent" class="myClass">
                <p id="childA" class="myClass2">myData</p>
                <span id="childB"  class="myClass2"></span>
                <p id="childC" class="myClass2">
                    myData3
                    <a id="childCA" class="myClass4" />
                </p>
                <p><a /></p>
            </div>`
        );
        object.removeWhitespace();
    });

    it('should return objects that do not have tagName p', () => {
        htmlTag = 'p';
        let expectedObject = parse(
            `<div id="parent" class="myClass">
                myData
                <span id="childB"  class="myClass2"></span>
                myData3
                <a id="childCA" class="myClass4" />
                <a />
            </div>`
        );
        expectedObject.removeWhitespace();
        removeAllInstancesByTag(object, htmlTag, object);
        expect(object.toString()).toEqual(expectedObject.toString());
    });

    it('should return objects untouched when html tag cannot be found', () => {
        htmlTag = 'section';
        let expectedObject = parse(`
            <div id="parent" class="myClass">
                <p id="childA" class="myClass2">myData</p>
                <span id="childB"  class="myClass2"></span>
                <p id="childC" class="myClass2">
                    myData3
                    <a id="childCA" class="myClass4" />
                </p>
                <p><a /></p>
            </div>`
        );
        expectedObject.removeWhitespace();
        removeAllInstancesByTag(object, htmlTag, object);
        expect(object.toString()).toEqual(expectedObject.toString());
    });
});

describe('removeAllInstancesByAttribute()', () => { 
    let object, attribute, attributeValue;

    beforeEach(() => {
        object = parse(`
            <div id="parent" class="myClass">
                <p id="childA" class="myClass2 myClass">myData</p>
                <span id="childB" class="myClass2"></span>
                <p id="childC" class="myClass2">
                    myData3
                    <a id="childCA" class="myClass4" />
                </p>
                <p><a /></p>
            </div>`
        );
        object.removeWhitespace();
    });

    it('should return objects that do not have the attribute with value myClass2', () => {
        attribute = 'class';
        attributeValue = 'myClass2'
        let expectedObject = parse(`
            <div id="parent" class="myClass">
                myDatamyData3
                <a id="childCA" class="myClass4" />
                <p><a /></p>
            </div>`
        );
        expectedObject.removeWhitespace();
        let actualObject = removeAllInstancesByAttribute(object, attribute, attributeValue);
        expect(actualObject.toString()).toEqual(expectedObject.toString());
    });

    it('should return objects untouched when the attribute cannot be found', () => {
        attribute = 'class';
        attributeValue = 'myClass3'
        let expectedObject = parse(`
            <div id="parent" class="myClass">
                <p id="childA" class="myClass2 myClass">myData</p>
                <span id="childB" class="myClass2"></span>
                 <p id="childC" class="myClass2">
                    myData3
                    <a id="childCA" class="myClass4" />
                </p>
                <p><a /></p>
            </div>`
        );
        expectedObject.removeWhitespace();
        let actualObject = removeAllInstancesByAttribute(object, attribute, attributeValue);
        expect(actualObject.toString()).toEqual(expectedObject.toString());
    });
});