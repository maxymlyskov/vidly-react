import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/Logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
    this.setState({ user });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <main>
          <NavBar user={this.state.user} />
          <div className="main-switch">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={this.state.user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </>
    );
  }
}

export default App;
