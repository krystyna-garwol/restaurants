import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
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
    return <Loading />;
  }

  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route path="/" exact render={() => <Home token={token} />} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
