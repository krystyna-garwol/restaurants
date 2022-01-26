import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";

export const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className="container">
      <div className="align-items-center profile-header mb-5 text-center text-md-left">
        <div>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Spinner />,
});
