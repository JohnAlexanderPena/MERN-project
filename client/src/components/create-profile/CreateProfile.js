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

    const { errors, displaySocialInputs} = this.state

    let socialInputs;
    // Check is state is true to display social inputs
    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            />
          <InputGroup
            placeholder="Faceook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            />
            <InputGroup
              placeholder="Instagram Profile URL"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              error={errors.instagram}
              />
            <InputGroup
              placeholder="LinkedIn Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
              />
        </div>
      )
    }
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
                <small className="d-block pb-3">* = required fields</small>
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
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Enter any company you represent"
                        />
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="Enter a website if you have one"
                        />
                      <TextFieldGroup
                        placeholder="Location"
                        name="Location"
                        value={this.state.Location}
                        onChange={this.onChange}
                        error={errors.Location}
                        info="Enter location, City & State (eg. New York City, NY)"
                      />
                      <TextFieldGroup
                        placeholder="Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="Please use comma, seperated values (eg. skill1, skill2, skill3)"
                        />
                      <TextFieldGroup
                        placeholder="Git Hub Username"
                        name="githubusername"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        info="Enter githubusername if you want latest repos"
                        />
                      <TextAreaFieldGroup
                        placeholder="Enter a short bio."
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell use something about yourself"
                        />
                      <div className="mb-3">
                        <button onClick={() => {this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }))}} className="btn btn-light">
                          Add Social Media Links
                        </button>
                        <span className="text-muted">Optional</span>
                      </div>
                      {socialInputs}
                      <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                </form>
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
