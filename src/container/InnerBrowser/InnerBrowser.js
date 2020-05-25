import React, { Component } from 'react';

import ArticleTiles from '../../components/ArticleTiles/ArticleTiles';
import { findObjectInHTML, removeAllInstancesByTag } from '../../shared/utility';
import classes from './InnerBrowser.scss';
import { parse } from 'node-html-parser';
import ReactParse from 'html-react-parser';
import { nhkAxios } from '../../axios';

class InnerBrowser extends Component {

    state = {
        nhkEasyArticles: null
    }

    componentWillMount() {
        /*let html;
        nhkAxios.get('/news/easy/k10012430641000/k10012430641000.html')
        .then(response => {
            console.log(response.data);
            html = parse(response.data);
            html.removeWhitespace();
            html = findObjectInHTML(html, 'id', 'js-article-body');
            console.log(html);
            console.log(html.toString());
            removeAllInstancesByTag(html, 'a', html);
            console.log(html);
            console.log(html.toString());
            this.setState({nhkEasyArticles: html});
        })
        .catch(error => {
            console.log('something broke', error);
        });*/
        nhkAxios.get('/news/easy/news-list.json')
        .then(response => {
            //console.log(response.data[0]);
            let dates = response.data[0]
            let articles = [];
            for(let key in dates) {
                if(!dates.hasOwnProperty(key)) continue;
                let dateArticles = dates[key];
                //console.log(dateArticles);
                dateArticles.forEach(article => {
                    let articleObject = {
                        id: article.news_id,
                        title: article.title_with_ruby,
                        date: article.news_prearranged_time,
                        imageLocation: article.has_news_web_image ? article.news_web_image_uri : null,
                        videoLocation: article.has_news_easy_movie ? article.news_easy_movie_uri : null,
                        voiceLocation: article.has_news_easy_voice ? article.news_easy_voice_uri : null,
                        advanceURL: article.news_web_url
                    }
                    articles.push(articleObject);
                    //console.log(article.news_easy_image_uri);
                });
            }
            this.setState({nhkEasyArticles: articles});
        }).catch(error => {

        });
    }    

    deleteHtmlNode = (html, identifier, type) => {
        html.filter()
    }

    render() {
        let articleBody = null;
        if(this.state.nhkEasyArticles) {
            //articleBody = ReactParse(this.state.nhkEasyArticles.toString());
            articleBody = <ArticleTiles articles={this.state.nhkEasyArticles} history={this.props.history} match={this.props.match}  />
        }
        return (
            <div className={classes.InnerBrowser}>
                {articleBody}
            </div>
        );
    }
}

export default InnerBrowser;