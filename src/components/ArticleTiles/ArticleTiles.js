import React from 'react';

import ArticleTile from './ArticleTile/ArticleTile';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './ArticleTiles.scss';

const articleTiles = (props) => {
    return(
        <Wrapper>
            {props.articles.map(article => (
                <ArticleTile key={article.id} image={article.imageLocation} title={article.title} />
            ))}
        </Wrapper>
    );
}

export default articleTiles;