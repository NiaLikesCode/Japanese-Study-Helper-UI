import React from 'react';

import classes from './AccordionPanelElement.scss'

const accordionPanelElement = (props) => {
    return(
        <div className={classes.AccordionPanelElement}>
            <input type="checkbox" checked={props.isChecked} onChange={null} />
            <span>{props.name}</span>
        </div>
    );
}

export default accordionPanelElement;