import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

 const PrivateRoute = ({ component: Component, auth, ...rest}) => (
   <Route
     {...rest}
     // Check if any user is logged in. If not then redirect back to Login page else render proper component
     render={props => auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to="/login" /> )}

   />
 )

 PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired
 }

const mapStateToProps = (state) => ({
  auth: state.auth
})

 export default connect(mapStateToProps)(PrivateRoute);
