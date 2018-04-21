import React, { Component } from 'react';

import Backdrop from '../Backdrop';
import classes from './Modal.css';

class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.showModal} close={this.props.closeModal}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showModal ? '1': '0' 
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )

    }
};



export default Modal;