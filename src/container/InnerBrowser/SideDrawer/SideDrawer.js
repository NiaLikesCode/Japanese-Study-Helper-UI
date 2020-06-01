import React, { Component } from 'react';

import Accordion from '../../../components/Accordion/Accordion';
import {waniKaniAxios} from '../../../axios';
import classes from './SideDrawer.scss';

class SideDrawer extends Component  {

    state = {
        wkLevels: {}
    }

    mapOutLevels = (object, currentResultsObject) => {
        //makes deep copy of object
        let mappedLevels = JSON.parse(JSON.stringify(currentResultsObject));
        object.data.forEach(vocab => {
            //checking to see if there is an object with the same level as the vocab. 
            let foundLevelObject = mappedLevels[vocab.data.level];
            let vocabObject = {
                id: vocab.id,
                value: vocab.data.characters,
                meanings: vocab.data.meanings.map(({meaning}) => meaning),
                partsOfSpeach: vocab.data.parts_of_speech,
                readings: vocab.data.readings.map(({reading}) => reading),
                selected: false
            };
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

    selectAllHandler = (accordEls) => {
        //event.persist();
        //console.log(event);
        console.log(accordEls);
        accordEls[0].props.onChange(accordEls[0].props.id);
        console.log(accordEls[0]);
        /*let updatedWkLevels = JSON.parse(JSON.stringify(this.state.wkLevels));
        let level = updatedWkLevels[id];
        console.log(event);
        Object.values(level.vocabList).forEach(vocab => {
            //console.log(vocab);
            vocab.selected = !vocab.selected;
        });
        updatedWkLevels[id] = level;
        this.setState({wkLevels: updatedWkLevels})*/
    }; 

    onChangeHandler = (vocabId, levelId) => {
        let updatedWkLevels = JSON.parse(JSON.stringify(this.state.wkLevels));
        let level = updatedWkLevels[levelId];
        console.log('parent OnChange Handler');
    };


    render() {
        let attachedClasses = [classes.SideDrawer, classes.Close];
        if(this.props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
        console.log('SideDrawer');
        return(
            <div className={attachedClasses.join(' ')}>
                <button onClick={this.props.close}>X</button>
                {Object.values(this.state.wkLevels).map(wkLevel => (
                    <Accordion
                        key={wkLevel.wkLevelId}
                        accordPanelSelectAll={(accrodEls) => this.selectAllHandler(accrodEls)}
                        selectAll={false}
                        accordElementOnChange={(id) => this.onChangeHandler(id, wkLevel.wkLevelId)}
                        vocabList={wkLevel.vocabList} > 
                        {wkLevel.wkLevelTitle}
                    </Accordion>
                ))}
            </div> 
        ); 
    }
}

export default SideDrawer;