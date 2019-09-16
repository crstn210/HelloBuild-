import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

const mapStateToProps = state => {
    return{
        registered: state.registration.registered,
        error: state.registration.error,
        loggedIn: state.authentication.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(userActions.register(user))
    }
}

class Signup extends Component {

    componentDidMount(){
        if (this.props.loggedIn) {
            this.props.history.push("/");
        }
    }

    componentDidUpdate(prevProps){
        console.log(prevProps);
        
        if (this.props.registered !== prevProps.registered) {
            if (this.props.registered) {
                this.props.history.push("/login");
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render(){
        const { user, submitted } = this.state;
        const { error } = this.props;

        return(
            <div className="page signup">
                <h1>Signup</h1>
                <form name="form" onSubmit={this.onSubmit}>
                        <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={this.onChange} />
                            {submitted && !user.firstName &&
                                <span>First Name is required</span>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={this.onChange} />
                            {submitted && !user.lastName &&
                                <span>Last Name is required</span>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                            <input type="text" name="username" placeholder="Username" value={user.username} onChange={this.onChange} />
                            {submitted && !user.username &&
                                <span>Username is required</span>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <input type="password" name="password" placeholder="Password" value={user.password} onChange={this.onChange} />
                            {submitted && !user.password &&
                                <span>Password is required</span>
                            }
                        </div>
                        <div className="controls">
                            {submitted && error && <div>User is already registered</div>}
                            <button>Register</button>
                            <Link to="/login">Cancel</Link>
                        </div>
                    </form>
            </div>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);