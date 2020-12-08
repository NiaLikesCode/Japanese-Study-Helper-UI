import React, {Component} from 'react';
import { connect } from 'react-redux';

import BrowserMenu from '../../components/Menu/BrowserMenu/BrowserMenu';
import Wrapper from '../Wrapper/Wrapper';
import * as actions from '../../store/actions/wanikani';

import classes from './Frame.scss'

class Frame extends Component {

    componentDidMount() {
       this.props.getVocabList();
    }

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

const mapDispatchToProps = dispatch => {
    return {
        getVocabList: () => dispatch(actions.initVocabList())
    }
}

export default connect(null, mapDispatchToProps)(Frame);