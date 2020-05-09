import React, { useState } from 'react';

import Arrow from '../UI/Arrows/Arrow';
import AccordionPanel from './AccordionPanel/AccordionPanel';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './Accordion.scss';

const Accordion = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Wrapper>
            <div className={classes.Accordion} onClick={() => setIsOpen((prev) => !prev)}>
                <Arrow direction={isOpen ? "Down" : "Right"} />
                <p>Level 1</p>
            </div>
            <AccordionPanel display={isOpen ? "Showing" : "Hidden"} />
        </Wrapper>
    );
};

export default Accordion;