import React, { Component } from 'react';

import Accordion from '../../../components/Accordion/Accordion';
import classes from './SideDrawer.scss';

class SideDrawer extends Component  {

    state = {
        wkLevels: [
            {
                wkLevel: 'Level 1',
                wkLevelId: 1,
                accordionOpen: false,
                vocabList: [
                    {
                        vocabId: '1-1',
                        vocab: 'ちょっと',
                        selected: false
                    },
                    {
                        vocabId: '1-2',
                        vocab: 'ちょ',
                        selected: false
                    }
                ]
            },
            {
                wkLevel: 'Level 2',
                wkLevelId: 2,
                accordionOpen: false,
                vocabList: [
                    {
                        vocabId: '2-1',
                        vocab: '何か',
                        selected: false
                    },
                    {
                        vocabId: '2-2',
                        vocab: 'こんにちは',
                        selected: false
                    }
                ]
            }
        ]
    }

    selectAllHandler = id => {
        let updatedWkLevels = [...this.state.wkLevels];
        updatedWkLevels.map(level => {
            if (level.wkLevelID === id){
                level.vocabList.forEach(vocab => {
                    vocab.selected = !vocab.selected;
                });
            }
            return level;
        });
        this.setState({wkLevels: updatedWkLevels})
    }; 


    render() {
        let attachedClasses = [classes.SideDrawer, classes.Close];
        if(this.props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
        return(
            <div className={attachedClasses.join(' ')}>
                <button onClick={this.props.close}>X</button>
                {this.state.wkLevels.map(wkLevel => (
                    <Accordion
                        key={wkLevel.wkLevelId}
                        accordPanelSelectAll={() => this.selectAllHandler(wkLevel.wkLevelID)}
                        vocabList={wkLevel.vocabList} > 
                        {wkLevel.wkLevel}
                    </Accordion>
                ))}
            </div> 
        ); 
    }
}

export default SideDrawer;