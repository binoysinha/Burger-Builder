import React from 'react';

import Logo from '@/components/Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '@/components/UI/Backdrop'
const sideDrawer = (props) => {
    const state = props.isOpen ? 'Open' : 'Close';
    
    return (
        <React.Fragment>
            <Backdrop show={props.isOpen} close={props.closeSideDrawer} />
            <div 
                className={[classes.SideDrawer, classes[state]].join(' ')} 
                onClick={props.closeSideDrawer}>
                    <Logo orientation="Mobile"/>
                    <nav>
                        <NavigationItems isAuthenticated={props.isAuthenticated} />
                    </nav>
            </div>
        </React.Fragment>
    )
};

export default sideDrawer;