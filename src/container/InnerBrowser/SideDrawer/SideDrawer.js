import React from 'react';

import Accordion from '../../../components/Accordion/Accordion';
import classes from './SideDrawer.scss';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
       <div className={attachedClasses.join(' ')}>
           <button onClick={props.close}>X</button>
           <Accordion />
           <Accordion />
           <Accordion />
           <Accordion />
           <Accordion />
       </div> 
    ); 
}

export default sideDrawer;