import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyCgEUHLq3hYitJrphON3MAe-Q7DCax_wYc';

export const authSuccess = ({ idToken, localId }) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId: localId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
}

export const auth = (email, password, authMode) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
   
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMode}?key=${API_KEY}`, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        });
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        })
};

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
});

export const checkAuthStatus = () => dispatch => {
    const idToken = localStorage.getItem('token');
    if (!idToken) {
        return dispatch(logout());
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate < new Date()) {
        return dispatch(logout());
    }
    const localId = localStorage.getItem('userId');
    dispatch(authSuccess({ idToken, localId}));
    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
}