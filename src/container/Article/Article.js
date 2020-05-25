import React, {Component} from 'react';
import { nhkAxios } from '../../axios'; 

import { parse } from 'node-html-parser';
import ReactParse from 'html-react-parser';
import { findObjectInHTML, removeAllInstancesByTag, removeAllInstancesByAttribute } from '../../shared/utility';

class Article extends Component {
    state = {
        loadedArticle: null,
        loadedArticleId: null
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if(this.props.match.params.id) {
            console.log('Article: ');
            console.log(this.props.match);
            if(!this.state.loadedArticleId || (this.state.loadedArticleId && this.state.loadedArticleId !== this.props.match.params.id)) {
                let id = this.props.match.params.id;
                nhkAxios.get('/news/easy/' + id + '/' + id + '.html')
                .then(response => {
                    console.log(response.data);
                   let html = parse(response.data);
                    html.removeWhitespace();
                    html = findObjectInHTML(html, 'id', 'js-article-body');
                    console.log(html);
                    console.log(html.toString());
                    removeAllInstancesByTag(html, 'a', html);
                    removeAllInstancesByTag(html, 'iframe', html);
                    removeAllInstancesByTag(html, 'figure', html);
                    removeAllInstancesByAttribute(html, 'class', 'playerWrapper', html);
                    console.log(html);
                    console.log(html.toString());
                    this.setState({loadedArticle: html});
                    this.setState({loadedArticleId: id});
                })
                .catch(error => {
                    console.log('something broke', error);
                });
            }
        }
    }

    render() {
        let article = <p style={{textAlign: 'center'}}>This is not a valid article!!!!!!</p>;
        if(this.props.match.params.id) {
            article = <p style={{textAlign: 'center'}}>Loading......?</p>;
        }
        if(this.state.loadedArticle) {
            article = ReactParse(this.state.loadedArticle.toString());
        }
        return article;
    }
}

export default Article;