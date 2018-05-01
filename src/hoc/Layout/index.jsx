import React,  { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from  '@/components/Navigation/Toolbar';
import SideDrawer from '@/components/Navigation/SideDrawer';

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
                <Toolbar 
                    openSideDrawer={this.toggleDrawerCloseHandler} 
                    isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer 
                    isOpen={this.state.showSideDrawer} 
                    closeSideDrawer={this.toggleDrawerCloseHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment> 
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);