import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Repositories from '../pages/Repositories';
import Events from '../pages/Events';
import ProtectedRoute from '../components/ProtectedRoute';
import ErrorBoundry from '../components/ErrorBoundry';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



const mapStateToProps = state => {
    return{
        isLoggedIn: state.authentication.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

class App extends Component {
    
    componentDidMount(){
        // this.props.onRequestUsers();
    }

    render(){
        const { isPending, isLoggedIn } = this.props;

        if (isPending){
            return <h1>Loading</h1>
        } 
        else {
            return(
                <Router>
                    <div className="App">
                        <Nav></Nav>
                        <ErrorBoundry>
                            <Switch>
                                <Route path="/" exact component={Home}></Route>
                                <Route path="/login" component={Login}></Route>
                                <Route path="/signup" component={Signup}></Route>
                                <ProtectedRoute isAllowed={isLoggedIn} path="/repositories" component={Repositories}></ProtectedRoute>
                                <ProtectedRoute isAllowed={isLoggedIn} path="/events" component={Events}></ProtectedRoute>
                                <Route path="*" component={() => "Not Found"}></Route>
                            </Switch>
                        </ErrorBoundry>
                    </div>
                </Router>  
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);