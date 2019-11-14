import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authenticate/Register';
import Login from './components/authenticate/Login';

import './App.css';

//Check for token
if(localStorage.jwtToken){
  //Set Auth Token Header Auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set authenticated user
  store.dispatch(setCurrentUser(decoded));
  
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )  ;
  }
}

export default App;
