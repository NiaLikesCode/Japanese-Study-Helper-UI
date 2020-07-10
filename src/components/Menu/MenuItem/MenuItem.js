import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MenuItem.scss';

const menuItem = (props) => (
    <li className={classes.MenuItem}>
        <Link 
            to={props.link}
            exact={props.exact}
            /*activeClassName={classes.active}*/ >
            {props.children}
        </Link>
    </li>
);

export default menuItem;