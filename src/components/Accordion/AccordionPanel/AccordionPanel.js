import React, { useState, useEffect } from 'react';

import AccordionPanelElement from './AccordionPanelElement/AccordionPanelElement';
import classes from './AccordionPanel.scss';

const accordionPanel = React.memo(props => {

    const [isAllSelected, setIsAllSelected] = useState(false);

    let accordElements = Object.values(props.vocabList).map(vocab => (
        <AccordionPanelElement
            key={vocab.id}
            id={vocab.id}
            onChange={props.elementOnChange}
            isChecked={vocab.selected}
            name={vocab.value} />
    ));

    const selectAllHandler = (levelId, isSelectAll) => {
        setIsAllSelected(isSelectAll);
        props.selectAll(levelId, isSelectAll)
    };

    useEffect(() => {

    }, [isAllSelected]);

    return(
        <div className={[classes.AccordionPanel, classes[props.display]].join(' ')}>
            <div className={classes.ShowAll}>
                <input type="checkbox" onChange={() => selectAllHandler(props.levelId, props.isSelectAll)}/> 
                <span>Select All</span>
            </div>
            {console.log('accordionPanel')}
            {accordElements}
        </div>
    );

});

export default accordionPanel;