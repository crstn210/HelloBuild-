import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userActions } from '../actions';
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
    return{
        loggedIn: state.authentication.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (user) => dispatch(userActions.logout(user))
    }
}

class Home extends Component {
    render(){
        const {logout, loggedIn} = this.props
        return (
            <div className="page home">
                <h1>Welcome</h1>
                {!loggedIn && <div><Link to="/login"><button>Login</button></Link><Link to="/signup"><button>signup</button></Link></div>}
                {loggedIn && <button onClick={logout}>Logout</button>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);