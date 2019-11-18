import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'


class Profiles extends React.Component {

  componentDidMount() {
    this.props.getProfiles()
  }


  render () {

    const { profiles, loading } = this.props.profile
    let profileItems;

    if(profiles === null || profiles === undefined || loading) {
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0) {
        profileItems =  profiles.map((profile, index) => (
          <ProfileItem key={index} profile={profile}/>
        ))
      } else {
        profileItems = <h4>No Profiles found</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4 text-center">
                  Dev Profiles
                    </h1>
                      <p className="lead text-center">
                        Browse through profiles
                      </p>
                      {profileItems}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
