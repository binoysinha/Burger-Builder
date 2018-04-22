import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as burgerBuilderActions from '@/store/actions';
import Burger from '@/components/Burger';
import BuildControls from '@/components/Burger/BuildControls';
import Modal from '@/components/UI/Modal';
import OrderSummary from '@/components/Burger/OrderSummary';
import Spinner from '@/components/UI/Spinner';
import withErrorHandler from '@/hoc/withErrorHandler';

class BurgerBuilder extends Component {
    state = { 
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState() {
        const { ingredients } = this.props;
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     }, () => {
    //         this.updatePurchaseState();
    //     });
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) return;
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     }, () => {
    //         this.updatePurchaseState();
    //     });
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            orderSummary = <OrderSummary 
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ingredients} 
                totalPrice={this.props.totalPrice}/>;

            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState()} 
                        totalPrice={this.props.totalPrice}
                        purchaseNow={this.purchaseHandler}/>
                    </React.Fragment>
            );
        }    
                        
        return (
            <React.Fragment>
                <Modal showModal={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
     ingredients: state.ingredients,
     totalPrice: state.totalPrice,
     error: state.error
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngredient(igName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));