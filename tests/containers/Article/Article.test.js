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
    let wrapper = mount(<Article match={match} getArticle={() => {}}  />);

    describe('shouldComponentUpdate()', () => {
        debugger;
        it('returns false when nextProps.highlightedArticleNode and nextState.loadedArticle are equal', () => {
            const nextProps = {
                highlightedArticleNode: null
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
            const expectedResult = wrapper.instance().shouldComponentUpdate(nextProps, nextState);
            expect(expectedResult).toEqual(false);
        });
    });

    describe('loadData()', () => {
        it('should return not valid article message', () => {

        })
    });

    describe('render()', () => {

        /*it('should render not valid article message', () => {
            //wrapper.setProps({match: params})
            //expect(wrapper.find('p').get(0).props.children).toEqual('Loading......?');
        });*/
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

    it('should render <Frame />', () => {
        //expect(wrapper.find(Frame)).toHaveLength(1);
    });

    it('should render 2 <Route />', () => {
        //expect(wrapper.find(Route)).toHaveLength(2);
    });
});
