import React, { Component } from 'react';
import classnames from 'classnames';

class Register extends Component{

  state = {
    name: "",
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email:this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    fetch('/api/users/register', {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
       body: JSON.stringify(newUser)
    })
    .then(res => {
      if(res.status === 400)
      {
        res.json().then(resp => {
          this.setState({
            errors: resp
            })
          })
        } else {
          res.json().then(resp => console.log(resp))
        }
    })
  }


  render() {
    const {errors} = this.state; //destructuring
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your WebDev Unlimited account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name // will only appear and turn red IF errors.name exists in our state
                  })}
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
                </div>
                <div className="form-group">
                  <input
                  type="email"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email // will only appear and turn red IF errors.email exists in our state
                  })}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password // will only appear and turn red IF errors.password exists in our state
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                </div>
                <div className="form-group">
                  <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2 // will only appear and turn red IF errors.password2 exists in our state
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
