import React from 'react';

import classes from './Arrow.scss';

const arrow = (props) => {

    return (
        <div className={classes.ArrowContainer}>
            <span className={[classes.Arrow, classes[props.direction]].join(' ')}></span>
        </div>
    );
}

export default arrow;