import { userConstants } from '../constants.js'

let user = JSON.parse(localStorage.getItem('user'));

const initialStateUser = user ? { loggedIn: true, error:false, user } : {loggedIn: false, error: false };

export function authentication(state = initialStateUser, action) {
    switch (action.type) {
      case userConstants.LOGIN_REQUEST:
        return {
          loggingIn: true,
          user: action.user
        };
      case userConstants.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user: action.user
        };
      case userConstants.LOGIN_FAILURE:
        return {
            loggedIn: false,
            error: true
        };
      case userConstants.LOGOUT:
        return {
            loggedIn: false
        };
      default:
        return state
    }
}

export function registration(state = {registered:false, error: false}, action) {
    switch (action.type) {
      case userConstants.REGISTER_REQUEST:
        return { registered: false };
      case userConstants.REGISTER_SUCCESS:
        return { registered: true };
      case userConstants.REGISTER_FAILURE:
        return { registered: false, error: true };
      default:
        return state
    }
}