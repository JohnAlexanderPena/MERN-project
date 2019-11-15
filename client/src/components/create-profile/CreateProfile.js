import React from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

import { connect } from 'react-redux'

class CreateProfile extends React.Component {

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
  }
  render () {
    //Select Options
    const options = [
      { label: '* Select Professional Status', value: '0'},
      { label: 'Developer', value: 'Developer'},
      { label: 'Junior Developer', value: 'Junior Developer'},
      { label: 'Senior Developer', value: 'Senior Developer'},
      { label: 'Manager', value: 'Manager'},
      { label: 'Student or Learning', value: 'Student or Learning'},
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      { label: 'Intern', value: 'Intern'},
      { label: 'Beginner', value: 'Beginner'},
      { label: 'Intermediate', value: 'Intermediate'},
      { label: 'Advanced', value: 'Advanced'},
      { label: 'Expert', value: 'Expert'},
      { label: 'Other', value: 'Other'}
    ];

    const { errors } = this.state
    return (
      <div className= "create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="disply-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">
                    Let's Get some Info to create your Profile!
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="Enter a unique handle for your profile URL. Full name, nickname, etc"
                    />
                  <SelectListGroup
                      placeholder="Status"
                      name="status"
                      value={this.state.status}
                      options={options}
                      onChange={this.onChange}
                      error={errors.status}
                      info="Where do you stand in your exeprience level."
                      />
                </form>
                <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})


export default connect(mapStateToProps)(CreateProfile);
