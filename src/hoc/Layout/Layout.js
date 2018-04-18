import React,  { Component } from 'react';

import classes from './Layout.css';
import Toolbar from  '@/components/Navigation/Toolbar/Toolbar';
import SideDrawer from '@/components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    toggleDrawerCloseHandler = () => {
        this.setState(prevState => ({
            showSideDrawer: !prevState.showSideDrawer
        }));
    }
    
    render() {
        return (
            <React.Fragment>
                <Toolbar openSideDrawer={this.toggleDrawerCloseHandler} />
                <SideDrawer isOpen={this.state.showSideDrawer} closeSideDrawer={this.toggleDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment> 
        )
    }
}



export default Layout;