import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const auth = localStorage.getItem('users'); // Consider parsing if it's a JSON object
  return auth ? <Outlet /> : <Navigate to='/signup' />;
};

export default PrivateComponent;
