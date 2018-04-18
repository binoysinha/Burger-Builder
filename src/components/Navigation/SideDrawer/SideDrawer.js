import React from 'react';

import Logo from '@/components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '@/components/UI/Backdrop/Backdrop'
const sideDrawer = (props) => {
    const state = props.isOpen ? 'Open' : 'Close';
    
    return (
        <React.Fragment>
            <Backdrop show={props.isOpen} close={props.closeSideDrawer} />
            <div className={[classes.SideDrawer, classes[state]].join(' ')}>
                <Logo orientation="Mobile"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    )
};

export default sideDrawer;