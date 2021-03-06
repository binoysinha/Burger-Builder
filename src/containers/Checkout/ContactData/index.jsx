import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as orderActions from '@/store/actions';
import { createInputObj, createSelectObj, checkValidity } from '@/utils/helper';
import withErrorHandler from '@/hoc/withErrorHandler';
import Button from '@/components/UI/Button';
import classes from './ContactData.css';
import Spinner from '@/components/UI/Spinner';
import Input from '@/components/UI/Input';

const options = [
    {value: 'fastest', displayName: 'Fastest Mode'},
    {value: 'cheapest', displayName: 'Cheapest Mode'},
]
class ContactData extends Component {
    state = {
        orderForm: {
            name: createInputObj('Name'),
            street: createInputObj('Street'),
            zipCode: {...createInputObj('ZIP Code'), validation:{ required: true, minLength: 3}},
            country: createInputObj('Country'),
            email: createInputObj('E-mail', 'email'),
            deliveryMethod: createSelectObj(options)
        },
        isFormInValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let type in this.state.orderForm) {
            if (!this.state.orderForm[type].valid && this.state.orderForm[type].validation) {
                this.setState({ isFormInValid: true });
                console.log('form invalid');
                return;
            }
            formData[type] = this.state.orderForm[type].value;
        }
        // this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customerData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputType) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputType]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputType] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render () {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(({ config, id }) => (
                    <Input 
                        elementType={config.elementType} 
                        elementConfig={config.elementConfig}
                        value={config.value} 
                        touched={config.touched}
                        key={id}
                        shouldValidate={config.validation}
                        invalid={!config.valid}
                        changed={(event) => {this.inputChangedHandler(event, id)}}
                    />
                ))}
                <Button btnType="Success">Order Now</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.isFormInValid
                    ? <p>Please fill out the details!!</p>
                    : null
                }
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(orderActions.initiateBurgerOrder(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData));