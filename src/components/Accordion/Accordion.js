import React, { useState } from 'react';

import Arrow from '../UI/Arrows/Arrow';
import AccordionPanel from './AccordionPanel/AccordionPanel';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './Accordion.scss';

const Accordion = React.memo(props => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Wrapper>
            <div className={classes.Accordion} onClick={() => setIsOpen((prev) => !prev)}>
                <Arrow direction={isOpen ? "Down" : "Right"} />
                <p>{props.children}</p>
            </div>
            <AccordionPanel 
                display={isOpen ? "Showing" : "Hidden"}
                selectAll={props.accordPanelSelectAll}
                isSelectAll={props.selectAll}
                levelId={props.levelId}
                elementOnChange={props.accordElementOnChange}
                vocabList={props.vocabList} />
        </Wrapper>
    );
});

export default Accordion;