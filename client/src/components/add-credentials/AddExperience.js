import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
// import TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import  TextFieldGroup  from '../common/TextFieldGroup'

class AddExperience extends React.Component {

  state = {
    company: '',
    title: '',
    location: '',
    to: '',
    from: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  onChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.prevent.default()
  }

  render () {
    //  const errors = this.state.errors
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 test-center">
                Add Experience
              </h1>
              <p className="lead text-center">Add any job or position from the past or current</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  errors={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="from"
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="to"
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  errors={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                  />
                  <label htmlFor="current" className="form-check-label">Current Job</label>
                </div>
                <TextFieldGroup
                  placeholder="Job Desc"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                  info="More info about the position"
                />
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => dispatch => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(AddExperience));
