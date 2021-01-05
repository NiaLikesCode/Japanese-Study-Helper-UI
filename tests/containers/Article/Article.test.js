import React from 'react';
import { mount } from 'enzyme';

import Article from '../../../src/containers/Article/Article'
import nhkAxios from '../../../src/nhkAxios';
import { parse } from 'node-html-parser'; 
jest.mock('../../../src/nhkAxios');

describe('<Article />', () => {
    let match = {
        params : {
            id: 22
        }
    };
    const response = {
        data: 
            `<div class="article-main__body article-body" id="js-article-body">
                <p>
                    <span class='colorL'><ruby>熊本県<rt>くまもとけん</rt></ruby></span>
                    <span class='colorL'><ruby>芦北町<rt>あしきたまち</rt></ruby></span>
                    では<ruby>３日<rt>みっか</rt></ruby>から
                    <ruby>雨<rt>あめ</rt></ruby>
                    がたくさん<ruby>降<rt>ふ</rt></ruby>って、
                </p>
                <p></p>
                <p></p>
            </div>`
        };
    const fakeHighlightedArticleNode = parse(
        `<p>
            <ruby>問題<rt>もんだい</rt></ruby>
            で
            <mark><ruby>東京都<rt>とうきょうと</rt></ruby></mark>
        <p>`
    );
    fakeHighlightedArticleNode.removeWhitespace();
    nhkAxios.get.mockResolvedValue(response);
    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(<Article match={match} getArticle={() => {}}  />);
    });

    describe('shouldComponentUpdate()', () => {

        const nextProps = {
            highlightedArticleNode: fakeHighlightedArticleNode
        }
        const nextState = {
            loadedArticle: parse(
                `<div class="article-main__body article-body" id="js-article-body">
                    <p>
                        <ruby>熊本県<rt>くまもとけん</rt></ruby>
                        <ruby>芦北町<rt>あしきたまち</rt></ruby>
                        では<ruby>３日<rt>みっか</rt></ruby>から
                        <ruby>雨<rt>あめ</rt></ruby>
                        がたくさん<ruby>降<rt>ふ</rt></ruby>って、
                    </p>
                    <p></p>
                    <p></p>
                </div>`
            ).removeWhitespace()
        }

        it('returns false when nextProps and nextState match component\'s current state and props', () => {
            debugger;
            wrapper.setProps({highlightedArticleNode: fakeHighlightedArticleNode});
            wrapper.update();
            const expectedResult = wrapper.instance().shouldComponentUpdate(nextProps, nextState);
            expect(expectedResult).toEqual(false);
        });

        it('returns true when nextProps and nextState don\'t match component\'s current state and props', () => {
            const expectedResult = wrapper.instance().shouldComponentUpdate(nextProps, nextState);
            expect(expectedResult).toEqual(true);
        });

        it('returns false when current state loadedArticle and next state loadedArticle are null or undefined', () => {
            let match2 = {
                params : {
                    id: null
                }
            };
            wrapper = mount(<Article match={match2} getArticle={() => {}}  />);
            const expectedResult = wrapper.instance().shouldComponentUpdate({}, {});
            expect(expectedResult).toEqual(false);
        });
    });

    describe('loadData()', () => {
        it('should return not valid article message', () => {

        })
    });

    describe('render()', () => {

        it('should render not valid article message', () => {
            let match2 = {
                params : {
                    id: null
                }
            };
            wrapper = mount(<Article match={match2} getArticle={() => {}}  />);
            const expectedResult = wrapper.instance().shouldComponentUpdate({}, {});
            expect(wrapper.find('p').get(0).props.children).toEqual('This is not a valid article!!!!!!');
        });

        it('should render loading message when there is a param id', () => {
            expect(wrapper.find('p').get(0).props.children).toEqual('Loading......?');
        });
        it('should render loadedArticle content', () => {
            wrapper.update();
            expect(wrapper.text()).toEqual('熊本県くまもとけん芦北町あしきたまちでは３日みっかから雨あめがたくさん降ふって、');
        });
        it('should render highlightedArticleNode content', () => {
            wrapper.setProps({highlightedArticleNode: fakeHighlightedArticleNode})
            wrapper.update();
            expect(wrapper.text()).toEqual('問題もんだいで東京都とうきょうと');
        });
    });
});
