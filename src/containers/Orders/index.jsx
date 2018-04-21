import React, { Component, Fragment } from 'react';

import axios from '@/axios-order';
import withErrorHandler from '@/hoc/withErrorHandler';
import Order from '@/components/Order';

class Orders extends Component {
    state = {
        fetchedOrders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, fetchedOrders});
            })
            .catch(err => {
                this.setState({ loading: false});
            })
    }

    render () {
        return (
            <Fragment>
                {this.state.fetchedOrders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        totalPrice={order.price}
                    />
                ))}
            </Fragment>
        )
    }
}

export default withErrorHandler(Orders, axios);