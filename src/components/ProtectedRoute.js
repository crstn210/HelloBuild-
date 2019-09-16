import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute 
  = ({ isAllowed, ...props }) => 
     isAllowed 
     ? <Route {...props}/> 
     : <Redirect to="/login"/>;

export default ProtectedRoute;