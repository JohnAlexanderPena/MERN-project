import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader.js';
import ProfileAbout from './ProfileAbout.js';
import ProfileCredentials from './ProfileCredentials.js';
import ProfileGithub from './ProfileGithub.js';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions'


class Profile extends React.Component {

  componentDidMount() {
    //Check for any handle match and use the handle as an argument for fetch request
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }


  render () {
    return (
      <div>
        <ProfileHeader/>
        <ProfileAbout/>
        <ProfileCredentials/>
        <ProfileGithub/>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
  profile: state.profile
})
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
