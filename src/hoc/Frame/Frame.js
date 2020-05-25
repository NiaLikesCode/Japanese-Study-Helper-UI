import React, {Component} from 'react';

import BrowserMenu from '../../components/Menu/BrowserMenu/BrowserMenu';
import SideDrawer from '../../container/InnerBrowser/SideDrawer/SideDrawer';
import Wrapper from '../Wrapper/Wrapper';
import classes from './Frame.scss'

class Frame extends Component {
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
            <Wrapper>
                <SideDrawer
                    open={this.state.sideDrawerVisible}
                    close={this.sideDrawerCloseHandler} />
                <BrowserMenu drawerToggleClicked={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );

    }
}

export default Frame;