import React, {Component} from 'react';

import BrowserMenu from '../../components/Menu/BrowserMenu/BrowserMenu';
import Wrapper from '../Wrapper/Wrapper';
import classes from './Frame.scss'

class Frame extends Component {

    render() {
        return (
            <Wrapper>
                <BrowserMenu />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );

    }
}

export default Frame;