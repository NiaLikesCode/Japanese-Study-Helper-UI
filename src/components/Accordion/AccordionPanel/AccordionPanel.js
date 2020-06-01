import React from 'react';

import AccordionPanelElement from './AccordionPanelElement/AccordionPanelElement';
import classes from './AccordionPanel.scss';

const accordionPanel = React.memo(props => {
    let accordElements = Object.values(props.vocabList).map(vocab => (
        <AccordionPanelElement
            key={vocab.id}
            id={vocab.id}
            onChange={props.elementOnChange}
            isChecked={vocab.selected}
            name={vocab.value} />
    ));

    return(
        <div className={[classes.AccordionPanel, classes[props.display]].join(' ')}>
            <div className={classes.ShowAll}>
                <input type="checkbox" onChange={() => props.selectAll(accordElements)}/> 
                <span>Select All</span>
            </div>
            {console.log('accordionPanel')}
            {accordElements}
        </div>
    );

});

export default accordionPanel;