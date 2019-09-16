import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
    render(){

        const { isLoggedIn } = this.props;

        const userLikns =  (
            <ul>
                <Link to="/repositories"><li>Repositories</li></Link>
                <Link to="/events"><li>Events</li></Link>
            </ul>
        );

        const guestLinks =  (
            <ul>
                <Link to="/signup"><li>Sign Up</li></Link>
                <Link to="/login"><li>Login</li></Link>
            </ul>
        );

        return (
            <nav>
                <Link to="/"><h3>HelloBuild</h3></Link>
                { isLoggedIn ? userLikns : guestLinks }
            </nav>
        );
    }
}


const mapSstateToProps = state => {
    return{
        isLoggedIn: state.authentication.loggedIn
    };
}

export default connect(mapSstateToProps)(Nav);