import React, {Component} from 'react';
import nhkAxios from '../../nhkAxios'; 

import { parse } from 'node-html-parser';
import ReactParse from 'html-react-parser';
import { findObjectInHTML, removeAllInstancesByTag, removeAllInstancesByAttribute } from '../../shared/utility';

class Article extends Component {
    state = {
        loadedArticle: null,
        loadedArticleId: null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loadedArticle && nextState.loadedArticle) {
            if(this.props.highlightedArticleNode === nextProps.highlightedArticleNode && this.state.loadedArticle.toString() === nextState.loadedArticle.toString()) {
                return false;
            } else {
                return true;
            }
        } else {
            if(this.props.highlightedArticleNode === nextProps.highlightedArticleNode && this.state.loadedArticle === nextState.loadedArticle) {
                return false;
            } else {
                return true;
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if(this.props.match.params.id) {
            if(!this.state.loadedArticleId || (this.state.loadedArticleId && this.state.loadedArticleId !== this.props.match.params.id)) {
                let id = this.props.match.params.id;
                nhkAxios.get('/news/easy/' + id + '/' + id + '.html')
                .then(response => {
                    //console.log(response);
                   let html = parse(response.data);
                    html.removeWhitespace();
                    //console.log(html);
                    html = findObjectInHTML(html, 'id', 'js-article-body');
                    removeAllInstancesByTag(html, 'a', html);
                    removeAllInstancesByTag(html, 'iframe', html);
                    removeAllInstancesByTag(html, 'figure', html);
                    html = removeAllInstancesByAttribute(html, 'class', 'playerWrapper');
                    removeAllInstancesByTag(html, 'span', html);
                    //console.log(html);
                    //console.log(html.childNodes[0].innerHTML);
                    this.setState({loadedArticle: html});
                    this.props.getArticle(html);
                    this.setState({loadedArticleId: id});
                })
                .catch(error => {
                    //console.log('something broke', error);
                    this.setState({loadedArticleId: null});
                });
            }
        }
    }

    render() {
        //console.log('article');
        let article = <p style={{textAlign: 'center'}}>This is not a valid article!!!!!!</p>;
        if(this.props.match.params.id) {
            article = <p style={{textAlign: 'center'}}>Loading......?</p>;
        }
        if(this.props.highlightedArticleNode) {
            article = ReactParse(this.props.highlightedArticleNode.toString());
        } else if(this.state.loadedArticle) {
            article = ReactParse(this.state.loadedArticle.toString());
        }
        return article;
    }
}

export default Article;