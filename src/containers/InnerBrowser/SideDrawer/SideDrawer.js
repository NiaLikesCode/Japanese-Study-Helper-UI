import React, { Component } from 'react';
import { connect } from 'react-redux';

import Accordion from '../../../components/Accordion/Accordion';
import classes from './SideDrawer.scss';

class SideDrawer extends Component  {

    state = {
        selectedVocabList: []
    }

    

    shouldComponentUpdate(nextProps) {
        if(JSON.stringify(this.props.wkLevels) === JSON.stringify(nextProps.wkLevels)) {
            return false;
        } else {
            return true;
        }
    }

    selectAllHandler = (levelId) => {
        let updatedWkLevels = JSON.parse(JSON.stringify(this.props.wkLevels));
        let updatedSelectedVocabList = [...this.state.selectedVocabList];
        Object.values(updatedWkLevels[levelId].vocabList).forEach(vocab => {
            vocab.selected = !vocab.selected;
            if(vocab.selected) {
                updatedSelectedVocabList.push(vocab);
            } 
        });
        updatedSelectedVocabList = updatedSelectedVocabList.filter(vocab => vocab.selected === true)
        this.setState({selectedVocabList: updatedSelectedVocabList});
        this.props.getSelectedVocabList(updatedSelectedVocabList);
    }; 

    onChangeHandler = (vocabId, levelId) => {
        let updatedWkLevels = JSON.parse(JSON.stringify(this.props.wkLevels));
        let vocabObject = updatedWkLevels[levelId].vocabList[vocabId];
        vocabObject.selected = !vocabObject.selected;
        let updatedSelectedVocabList = [...this.state.selectedVocabList];
        if(vocabObject.selected) {
            updatedSelectedVocabList.push(vocabObject);
        }
        this.setState({selectedVocabList: updatedSelectedVocabList});
        //call InnerBrowser function that sends updatedVocabList to InnerBorwser component
        this.props.getSelectedVocabList(updatedSelectedVocabList);
    };


    render() {
        console.log('SideDrawer');
        let accordions = null;
        if(this.props.wkLevels !== null && this.props.wkLevels !== {}) {
            accordions = Object.values(this.props.wkLevels).map(wkLevel => (
                <Accordion
                    key={wkLevel.wkLevelTitle}
                    accordPanelSelectAll={(accrodEls) => this.selectAllHandler(accrodEls)}
                    selectAll={false}
                    levelId={wkLevel.wkLevelId}
                    accordElementOnChange={(id) => this.onChangeHandler(id, wkLevel.wkLevelId)}
                    vocabList={wkLevel.vocabList} > 
                    {wkLevel.wkLevelTitle}
                </Accordion>
            ));
        }
        return(
            <div className={classes.DrawerContainer}>
                <div className={classes.Title}>
                    Vocab
                </div>
                <div className={classes.SideDrawer}>
                    {accordions}
                </div>
            </div> 
        ); 
    }
}

const mapStateToProps = state => {
    return {
        wkLevels: state.wanikani.wkLevels
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);