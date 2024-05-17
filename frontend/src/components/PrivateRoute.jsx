import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    
    const { citizenInfo } = useSelector((state) => state.auth);
    return citizenInfo? <Outlet/> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
