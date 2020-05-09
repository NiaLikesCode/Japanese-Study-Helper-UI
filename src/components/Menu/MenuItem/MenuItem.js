import React from 'react';

import classes from './MenuItem.scss';

const menuItem = (props) => (
    <li className={classes.MenuItem}>{props.children}</li>
);

export default menuItem;