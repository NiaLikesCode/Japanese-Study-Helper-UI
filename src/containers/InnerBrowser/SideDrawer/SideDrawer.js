import React, { Component } from 'react';

import Accordion from '../../../components/Accordion/Accordion';
import { waniKaniAxios } from '../../../axios';
import { createStem } from '../../../shared/vocabModifier';
import classes from './SideDrawer.scss';

class SideDrawer extends Component  {

    state = {
        wkLevels: {},
        selectedVocabList: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(JSON.stringify(this.state.wkLevels) === JSON.stringify(nextState.wkLevels)) {
            return false;
        } else {
            return true;
        }
    }

    mapOutLevels = (object, currentResultsObject) => {
        //makes deep copy of object
        let mappedLevels = JSON.parse(JSON.stringify(currentResultsObject));
        console.log(object.data);
        object.data.forEach(vocab => {
            //checking to see if there is an object with the same level as the vocab. 
            let foundLevelObject = mappedLevels[vocab.data.level];
            let vocabObject = {
                id: vocab.id,
                key: vocab.id,
                value: vocab.data.characters,
                meanings: vocab.data.meanings.map(({meaning}) => meaning),
                readings: vocab.data.readings.map(({reading}) => reading),
                selected: false
            };
            //add stems to vocab object
            vocabObject = createStem(vocabObject, vocab.data.parts_of_speech)
            //If there is then it adds the vocab to the array list of vocab for that level, 
            //otherwise it creates a new level and creates array of vocab in that level and add vocab to that array
            if(foundLevelObject) {
                mappedLevels[vocab.data.level].vocabList[vocab.id] = vocabObject;
            } else {
                let vocabListObject = {};
                vocabListObject[vocab.id] = vocabObject;
                let levelObject = {
                    wkLevelTitle: 'Level ' + vocab.data.level,
                    wkLevelId: vocab.data.level,
                    vocabList: vocabListObject,
                    accordionOpen: false
                };
                mappedLevels[vocab.data.level] = levelObject;
            }
        });
        return mappedLevels;
    }

    getDataFromAllPages = async (url) => {
        let results = {};
        try {
            //getting intial data
            const initialData = await waniKaniAxios.get(url);
            //using the intial data and mapping out the levels then saving it into results object
            results = this.mapOutLevels(initialData.data, results);
            //get the next page url
            let nextPageUrl = initialData.data.pages.next_url;
            //while there is a next page url keep calling the service and adding it to the results object
            while(nextPageUrl){
                const laterData = await waniKaniAxios.get(nextPageUrl);
                nextPageUrl = laterData.data.pages.next_url;
                results = this.mapOutLevels(laterData.data, results);
            }
        } catch (err) {
            Promise.reject(new Error(`Opps new wanikani error, ${err}`));
        }
        return Promise.resolve(results);
    }

    getWanikaniData = () => {
        this.getDataFromAllPages('/subjects?types=vocabulary').then(result => {
            this.setState({wkLevels: result})
        }).catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
       this.getWanikaniData();
    }

    selectAllHandler = (levelId) => {
        let updatedWkLevels = JSON.parse(JSON.stringify(this.state.wkLevels));
        let updatedSelectedVocabList = [...this.state.selectedVocabList];
        Object.values(updatedWkLevels[levelId].vocabList).forEach(vocab => {
            vocab.selected = !vocab.selected;
            if(vocab.selected) {
                updatedSelectedVocabList.push(vocab);
            } 
        });
        updatedSelectedVocabList = updatedSelectedVocabList.filter(vocab => vocab.selected === true)
        this.setState({wkLevels: updatedWkLevels, selectedVocabList: updatedSelectedVocabList});
        this.props.getSelectedVocabList(updatedSelectedVocabList);
    }; 

    onChangeHandler = (vocabId, levelId) => {
        let updatedWkLevels = JSON.parse(JSON.stringify(this.state.wkLevels));
        let vocabObject = updatedWkLevels[levelId].vocabList[vocabId];
        vocabObject.selected = !vocabObject.selected;
        let updatedSelectedVocabList = [...this.state.selectedVocabList];
        if(vocabObject.selected) {
            updatedSelectedVocabList.push(vocabObject);
        }
        this.setState({wkLevels: updatedWkLevels, selectedVocabList: updatedSelectedVocabList});
        //call InnerBrowser function that sends updatedVocabList to InnerBorwser component
        this.props.getSelectedVocabList(updatedSelectedVocabList);
    };


    render() {
        console.log('SideDrawer');
        console.log(this.state.wkLevels);
        return(
            <div className={classes.DrawerContainer}>
                <div className={classes.Title}>
                    Vocab
                </div>
                <div className={classes.SideDrawer}>
                    {Object.values(this.state.wkLevels).map(wkLevel => (
                        <Accordion
                            key={wkLevel.wkLevelTitle}
                            accordPanelSelectAll={(accrodEls) => this.selectAllHandler(accrodEls)}
                            selectAll={false}
                            levelId={wkLevel.wkLevelId}
                            accordElementOnChange={(id) => this.onChangeHandler(id, wkLevel.wkLevelId)}
                            vocabList={wkLevel.vocabList} > 
                            {wkLevel.wkLevelTitle}
                        </Accordion>
                    ))}
                </div>
            </div> 
        ); 
    }
}

export default SideDrawer;