import React from 'react';

import ArticleTile from './ArticleTile/ArticleTile';
import classes from './ArticleTiles.scss';

const articleTiles = (props) => {
    return(
        <div className={classes.ArticleTiles}>
            {props.articles.map(article => (
                <ArticleTile key={article.id} image={article.imageLocation} title={article.title} date={article.date} />
            ))}
        </div>
    );
}

export default articleTiles;