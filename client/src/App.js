import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authenticate/Register';
import Login from './components/authenticate/Login';

import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import { clearCurrentProfile } from './actions/profileActions';

import './App.css';

//Check for token
if(localStorage.jwtToken){
  //Set Auth Token Header Auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set authenticated user
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currenTime = Date.now() / 1000;
  if(decoded.exp < currenTime) {
    store.dispatch(logoutUser());
    //Cleaer current profile
    store.dispatch(clearCurrentProfile());

   window.history.push('/login');
  }
}

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )  ;
  }
}

export default App;
