import React from 'react';

import MenuItem from '../MenuItem/MenuItem';
import classes from './BrowserMenu.scss';
import DrawerToggle from '../../DrawerToggle/DrawerToggle';

const browserMenu = (props) => {
    return(
        <header className={classes.BrowserMenu}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <nav>
                <ul className={classes.MenuItems}>
                    <MenuItem>Easy NHK NEWS</MenuItem>
                    <MenuItem>Fan Fics</MenuItem>
                </ul>
            </nav>
        </header>
    );  
}

export default browserMenu;