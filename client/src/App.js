import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Spinner from "./components/Spinner";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Footer from "./components/Footer";
import AddRestaurant from "./views/AddRestaurant";
import history from "./utils/history";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

const App = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState();
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route path="/" exact render={() => <Home token={token} />} />
        <Route path="/profile" component={Profile} />
        <Route path="/add-restaurant" component={AddRestaurant} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
