import React from 'react';

import classes from './ArticleTile.scss';

const articleTile = (props) => {
    return(
        <div className={classes.ArticleTile}>
            <div></div>
            {props.image ? <img src={props.image} /> : null}
            <span>{props.title}</span>
            <span>{props.date}</span>
        </div>
    );
}

export default articleTile;