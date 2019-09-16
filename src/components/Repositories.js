import React, {Component} from 'react';
import RepositoryList from './RepositoryList'
import ApolloClient  from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = localStorage.getItem("github_token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  }
});

const CLIENT_ID = "55d6b1ca9e6a67337748";
const REDIRECT_URI = "http://localhost:3000/repositories";
const AUTH_API_URI = "https://hellobuild.herokuapp.com/authenticate/";

class Repositories extends Component {
    state = {
      status: 'INITIAL',
      token: null
    };
    componentWillMount () {
      const storedToken = localStorage.getItem("github_token");
      if (storedToken) {
        this.setState({
          token: storedToken,
          status: 'AUTHENTICATED'
        });
        return;
      }
      const {location} = this.props
      const code = location.search.split('code=')[1];
      console.log(code);
      if (code) {
          this.setState({ status: 'LOADING' });
          fetch(`${AUTH_API_URI}${code}`)
          .then(response => response.json())
          .then(({ token }) => {
            localStorage.setItem("github_token", token);
            this.setState({
              token,
              status: 'AUTHENTICATED'
            });
          });
      }
    };

    componentDidUpdate(prevState){
        if (prevState.token !== this.state.token) {

        }
    }

    render(){
      
        if (this.state.status === 'AUTHENTICATED') {
          return (
            <ApolloProvider client={client}>
              <div className="page">
                    <RepositoryList></RepositoryList>
              </div>
            </ApolloProvider>
          )
        }
        else{
          return (
            <div>
              <h3>Access to github to see the repositories</h3>
              <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
                Login
              </a>
            </div>
            
          );
        }
        
    }
        
    
}


export default Repositories;