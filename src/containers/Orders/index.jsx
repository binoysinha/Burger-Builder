import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '@/store/actions';
import withErrorHandler from '@/hoc/withErrorHandler';
import Order from '@/components/Order';
import Spinner from '@/components/UI/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render () {
        let orders = (
            <Fragment>
                {this.props.fetchedOrders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        totalPrice={order.price.toFixed(2)}
                    />
                ))}
            </Fragment>
        );

        if (this.props.loading) {
            orders = <Spinner />
        }
        return orders;
    }
}

const mapStateToProps = state => ({
    loading: state.order.loading,
    fetchedOrders: state.order.orders
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(actions.fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders));