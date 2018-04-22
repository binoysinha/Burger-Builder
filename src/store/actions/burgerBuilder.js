import axios from '@/axios-order';
import * as actionTypes from './actionTypes';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        igName
    }
};

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        igName
    }
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => dispatch => {
    axios.get('https://burger-builder-81711.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
}