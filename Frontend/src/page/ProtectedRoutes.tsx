import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthenticationContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuth, role } = useContext(AuthContext);

  return (
    <Route
      {...(roles ? { roles } : {})}
      render={(props:any) =>
        isAuth && (roles ? roles.includes(role!) : true) ? (
          <children {...props} />
        ) : (
          <Redirect to="/SSABS/user/login" /> // Redirect to login on unauthorized access
        )
      }
    />
  );
};

export default PrivateRoute;
