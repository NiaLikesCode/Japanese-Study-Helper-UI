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
                    <MenuItem link="/dashboard">Dashboard</MenuItem>
                    <MenuItem link="/innerbrowser/easynhknews">Easy NHK NEWS</MenuItem>
                    <MenuItem link="/fanfics">Fan Fics</MenuItem>
                </ul>
            </nav>
        </header>
    );  
}

export default browserMenu;