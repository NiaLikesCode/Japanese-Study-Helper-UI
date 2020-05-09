import React from 'react';

import classes from './AccordionPanel.scss';

const accordionPanel = (props) => {

    return(
        <div className={[classes.AccordionPanel, classes[props.display]].join(' ')}>
            <div>
                <input type="checkbox"/> 
                <p>Select All</p>
            </div>
            <div className={classes.LevelElements}>

            </div>
        </div>
    );

}

export default accordionPanel;