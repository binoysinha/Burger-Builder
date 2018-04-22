import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '@/components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <Fragment>
                {this.props.ingredients 
                    ? <Fragment>
                        <CheckoutSummary 
                            ingredients={this.props.ingredients} 
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinueHandler}
                        />
                        <Route 
                            path={this.props.match.path + '/contact-data'} 
                            component={ContactData}
                        />
                       </Fragment> 
                    : null
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients
});

export default connect(mapStateToProps)(Checkout);