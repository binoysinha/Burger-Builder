import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '@/store/actions';
import withErrorHandler from '@/hoc/withErrorHandler';
import Order from '@/components/Order';
import Spinner from '@/components/UI/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        let orders = null;
        if (this.props.fetchedOrders.length) {
            orders = (
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
        } else {
            orders = <p>You haven't placed any Orders</p>;
        }

        if (this.props.loading) {
            orders = <Spinner />
        }
            
        
        return orders;
    }
}

const mapStateToProps = state => ({
    loading: state.order.loading,
    fetchedOrders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders));