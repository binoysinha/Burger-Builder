import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '@/components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
    state = {  
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice =  param[1];
                continue;
            }
            ingredients[param[0]] = Number(param[1]);
        }

        this.setState({ ingredients, totalPrice });

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <Fragment>
                {this.state.ingredients 
                    ? <Fragment>
                        <CheckoutSummary 
                            ingredients={this.state.ingredients} 
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinueHandler}
                        />
                        <Route 
                            path={this.props.match.path + '/contact-data'} 
                            render={props => (
                                <ContactData 
                                    ingredients={this.state.ingredients}
                                    totalPrice={this.state.totalPrice}
                                    {...props}
                                />
                            )}
                        />
                       </Fragment> 
                    : null
                }
            </Fragment>
        );
    }
}

export default Checkout;