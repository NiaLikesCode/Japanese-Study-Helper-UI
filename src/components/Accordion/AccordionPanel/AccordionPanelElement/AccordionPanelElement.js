import React, { useState } from 'react';

import classes from './AccordionPanelElement.scss'

const accordionPanelElement = React.memo(props => {

    const [isChecked, setIsChecked] = useState(props.isChecked);

    const onChangeHandler = (event) => {
        event.persist();
        console.log(event);
        setIsChecked(prev => !prev);
        props.onChange(props.id);
    };

    return(
        <div className={classes.AccordionPanelElement}>
            <input type="checkbox" checked={isChecked} onChange={onChangeHandler} />
            <span>{props.name}</span>
        </div>
    );
});

export default accordionPanelElement;