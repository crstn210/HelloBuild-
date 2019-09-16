import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions';

const mapStateToProps = state => {
    return{
        loggedIn: state.authentication.loggedIn,
        error: state.authentication.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (username, password) => dispatch(login(username, password))
    }
}

class Login extends Component  {

    componentDidMount(){
        if (this.props.loggedIn) {
            this.props.history.push("/");
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.loggedIn !== prevProps.loggedIn) {
            if (this.props.loggedIn) {
                this.props.history.push("/");
            }
          }
    }

    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:'',
            error:false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password } = this.state;
        const { logIn } = this.props;

        if (username && password) {
            logIn(username, password);
        }
    }

    render(){
        
        const { username, password, submitted,  } = this.state;
        const { error } = this.props;

        return (
            <div className="page login">
                <h1>LogIn</h1>
                <form onSubmit={this.onSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <input type="text" name="username" placeholder="Username" value={username} onChange={this.onChange}></input>
                        {submitted && !username && <span>Username is required</span>}
                    </div>

                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange}></input>
                        {submitted && !password && <span>Password is required</span>}
                    </div>
                    
                    <div className="controls">
                        {submitted && error && <div>Username or password are invalid</div>}
                        <button>Login</button>
                        <Link to="/signup" className="btn btn-link">Signup</Link>
                    </div>

                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);