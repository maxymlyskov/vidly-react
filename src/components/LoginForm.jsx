import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    // Call to the server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      state ? (window.location = state.from.pathname) : (window.location = "/");
    } catch (error) {
      if (error.response && error.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
