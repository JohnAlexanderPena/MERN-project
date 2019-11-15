import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'


class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render () {
    //Destructuring
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <h4><Spinner/></h4>
    } else {
      if(Object.keys(profile).length > 0) { // check if user has current profile
        dashboardContent = <h4>Will Display Profile</h4>
      } else {
        dashboardContent = (
          <div>
              <p className="lead text-muted"> Welcome {user.name }</p>
              <p>You don't have a profile yet! lease add some info</p>
              <Link to='/create-profile' className="btn btn-info btn-lg">Create Profile</Link>
          </div>
        )
      }
    };

    return (
      <div className="dashboard" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">DashBoard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
