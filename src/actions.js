import {
    userConstants
} from './constants.js'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

export const userActions = {
    logout,
    register
};

export const login = (username, password) => (dispatch) => {
    
    const user = {username:username, password:password};

    dispatch({ type: userConstants.LOGIN_REQUEST, user }); 

    let users = JSON.parse(localStorage.getItem('users'));

    if (!users) {
            dispatch({ type: userConstants.LOGIN_FAILURE, user });
    }
    
    else{
        var results = users.filter(function (filteredUser) { return (filteredUser.username === user.username && filteredUser.password === user.password) });

        if (results.length === 1) {
            
            localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: userConstants.LOGIN_SUCCESS, user });
            // return success(user);
        }
        else{
                dispatch({ type: userConstants.LOGIN_FAILURE, user });
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        let users = JSON.parse(localStorage.getItem('users'));
        if (!users) {
            users = [];
        }
        var results = users.filter(function (filteredUser) { return (filteredUser.username === user.username ) });
        if (results.length >= 1) {
            dispatch(failure(user));
        }
        else{
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            dispatch(success(user));
        }
        
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(user) { return { type: userConstants.REGISTER_FAILURE, user } }
}

