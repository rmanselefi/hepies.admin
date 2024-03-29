import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {        
      if (auth.isAuthenticated || localStorage.getItem('token')) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
