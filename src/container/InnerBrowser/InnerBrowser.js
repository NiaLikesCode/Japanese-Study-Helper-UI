import React, { Component } from 'react';

import BrowserMenu from '../../components/Menu/BrowserMenu/BrowserMenu';
import SideDrawer from './SideDrawer/SideDrawer';
import classes from './InnerBrowser.scss';

class InnerBrowser extends Component {

    state = {
        sideDrawerVisible: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerVisible : !prevState.sideDrawerVisible}
        });
    }

    sideDrawerCloseHandler = () => {
        this.setState({sideDrawerVisible: false});
    }

    render() {
        return (
            <div className={classes.InnerBrowser}>
                <SideDrawer
                    open={this.state.sideDrawerVisible}
                    close={this.sideDrawerCloseHandler} />
                <div className={classes.innerBrowserHeader}><BrowserMenu drawerToggleClicked={this.sideDrawerToggleHandler} /></div>
                <div className={classes.innerBrowserHeader}>
                    <object type="text/html" data="https://www3.nhk.or.jp/news/easy/k10012406411000/k10012406411000.html" aria-label="embeded NHK Easy Japanese News Webpage"></object>
                </div>
            </div>
        );
    }
}

export default InnerBrowser;