import React from 'react';

import classes from './ArticleTile.scss';
import ReactParse from 'html-react-parser';
import moment from 'moment';

const articleTile = (props) => {
    moment.locale('ja');
    let parsedTitle = ReactParse(props.title);
    return(
        <article className={classes.ArticleTile}>
            <div></div>
            {props.image ? <img src={props.image} /> : null}
            <span className={classes.articleTitle}>{parsedTitle}</span>
            <span className={classes.articleDate}>{moment(props.date).format('MMMM Do HH:mm')}</span>
        </article>
    );
}

export default articleTile;