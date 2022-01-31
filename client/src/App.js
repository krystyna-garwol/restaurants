import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Spinner from "./components/Spinner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import CurrentOrder from "./views/CurrentOrder";
import AddRestaurant from "./views/AddRestaurant";
import Menu from "./views/Menu";
import BookTable from "./views/BookTable";
import Contact from "./views/Contact";
import history from "./utils/history";
import { getRestaurants } from "./utils/restaurantRequests";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

const App = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const admin = user && user.nickname;

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
      <NavBar admin={admin} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Home restaurants={restaurants} admin={admin} />}
        />
        <Route
          path="/book-table"
          render={() => <BookTable restaurants={restaurants} />}
        />
        <Route path="/current-order" render={() => <CurrentOrder />} />
        <Route path="/contact" render={() => <Contact />} />
        <Route
          path="/add-restaurant"
          render={() => (
            <AddRestaurant setRestaurants={setRestaurants} token={token} />
          )}
        />
        <Route
          path="/menu"
          render={() => (
            <Menu restaurants={restaurants} admin={admin} token={token} />
          )}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
