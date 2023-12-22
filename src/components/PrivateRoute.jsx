import React, { useContext } from 'react';
import { Context } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Context);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
