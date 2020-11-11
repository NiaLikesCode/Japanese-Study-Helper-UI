import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import ArticleTiles from '../../components/ArticleTiles/ArticleTiles';
import { highlightVocabInArticle } from '../../shared/nhkUtility';
import SideDrawer from './SideDrawer/SideDrawer';
import Article from '../Article/Article';
import classes from './InnerBrowser.scss';
import { nhkAxios } from '../../axios';

class InnerBrowser extends Component {

    state = {
        nhkEasyArticles: null,
        selectedVocabList: null,
        currentArticleNode: null
    }

    componentDidMount() {
        nhkAxios.get('/news/easy/news-list.json')
        .then(response => {
            let dates = response.data[0]
            let articles = [];
            for(let key in dates) {
                if(!dates.hasOwnProperty(key)) continue;
                let dateArticles = dates[key];
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
                });
            }
            this.setState({nhkEasyArticles: articles});
        }).catch(error => {

        });
    }  

    updateSelectedVocab = (vocabList) => {
        this.setState({selectedVocabList: vocabList});
    }

    highlightLoadedArticle = () => {
        return highlightVocabInArticle(this.state.currentArticleNode, this.state.selectedVocabList);
    }

    getCurrentRenderedArticle = (articleNode) => {
        this.setState({currentArticleNode: articleNode});
    }

    render() {
        let highlightedArticleNode = null;
        if(this.state.selectedVocabList && this.state.currentArticleNode) {
            highlightedArticleNode = this.highlightLoadedArticle();
        }
        let articleBody = null;
        if(this.state.nhkEasyArticles) {
            articleBody = <ArticleTiles articles={this.state.nhkEasyArticles} history={this.props.history} match={this.props.match}  />
        }
        return (
            <div className={classes.InnerBrowser}>
                <SideDrawer getSelectedVocabList={this.updateSelectedVocab} />
                <div className={classes.InnerBrowserBody}>
                    <Route path="/innerbrowser/easynhknews/articles/:id" render={(props) => <Article {...props} highlightedArticleNode={highlightedArticleNode} getArticle={this.getCurrentRenderedArticle} />}/>
                    <Route path="/innerbrowser/easynhknews"  exact render={() => articleBody}/>
                </div>
            </div>
        );
    }
}

export default InnerBrowser;