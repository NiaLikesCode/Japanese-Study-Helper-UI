import React from 'react';

import AccordionPanelElement from './AccordionPanelElement/AccordionPanelElement';
import classes from './AccordionPanel.scss';

const accordionPanel = (props) => {

    return(
        <div className={[classes.AccordionPanel, classes[props.display]].join(' ')}>
            <div className={classes.ShowAll}>
                <input type="checkbox" onChange={props.selectAll}/> 
                <span>Select All</span>
            </div>
            {props.vocabList.map(vocab => (
                <AccordionPanelElement
                    isChecked={vocab.selected}
                    name={vocab.vocab} />
            ))}
        </div>
    );

}

export default accordionPanel;