import React from 'react';
import { Link } from 'react-router-dom';

import ArticleTile from './ArticleTile/ArticleTile';
import classes from './ArticleTiles.scss';

const articleTiles = (props) => {

    return(
        <div className={classes.ArticleTiles}>
            {props.articles.map(article => (
                <Link key={'link-' + article.id} to={`${props.match.path}/easynhknews/articles/${article.id}`}>
                    <ArticleTile key={article.id} image={article.imageLocation} title={article.title} date={article.date}/>
                </Link>
            ))}
            {console.log('ArticleTiles')}
            {console.log(props)}
        </div>
    );
}

export default articleTiles;