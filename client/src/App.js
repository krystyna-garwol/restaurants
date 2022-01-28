import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Spinner from "./components/Spinner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import AddRestaurant from "./views/AddRestaurant";
import Restaurant from "./views/Restaurant";
import history from "./utils/history";
import { getRestaurants } from "./utils/requests";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

const App = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState();
  const [restaurants, setRestaurants] = useState([]);
  console.log(token);

  const callApi = async () => {
    const jwtToken = await getAccessTokenSilently({ ignoreCache: true }).catch(
      (error) => {
        if (error.error !== "login_required") {
          throw error;
        }
      }
    );
    setToken(jwtToken);
  };

  useEffect(() => {
    callApi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRestaurants(setRestaurants);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Home restaurants={restaurants} setRestaurants={setRestaurants} />
          )}
        />
        <Route path="/profile" render={() => <Profile />} />
        <Route
          path="/add-restaurant"
          render={() => (
            <AddRestaurant setRestaurants={setRestaurants} token={token} />
          )}
        />
        <Route
          path="/restaurant"
          render={() => <Restaurant restaurants={restaurants} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
