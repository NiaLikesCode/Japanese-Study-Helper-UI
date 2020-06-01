import React from 'react';
import { Link } from 'react-router-dom';

import ArticleTile from './ArticleTile/ArticleTile';
import Article from '../../container/Article/Article';
import classes from './ArticleTiles.scss';

const articleTiles = (props) => {

    return(
        <div className={classes.ArticleTiles}>
            {props.articles.map(article => (
                <Link key={'link-' + article.id} to={`${props.match.path}/articles/${article.id}`}>
                    <ArticleTile key={article.id} image={article.imageLocation} title={article.title} date={article.date}/>
                </Link>
            ))}
        </div>
    );
}

export default articleTiles;