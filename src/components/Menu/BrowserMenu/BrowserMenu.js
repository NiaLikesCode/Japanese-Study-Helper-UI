import React from 'react';

import MenuItem from '../MenuItem/MenuItem';
import classes from './BrowserMenu.scss';

const browserMenu = (props) => {
    return(
        <header className={classes.BrowserMenu}>
            <nav>
                <ul className={classes.MenuItems}>
                    <MenuItem link="/">Dashboard</MenuItem>
                    <MenuItem link="/innerbrowser/easynhknews">Easy NHK NEWS</MenuItem>
                    <MenuItem link="/fanfics">Fan Fics</MenuItem>
                </ul>
            </nav>
        </header>
    );  
}

export default browserMenu;