import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import UtilityRoutes from './UtilityRoutes';

const RootRoutes = () => {
    const location = useLocation();

    const isUtilityRoute =
        location.pathname.startsWith('/verify-certificate');

    return isUtilityRoute ? <UtilityRoutes /> : <AppRoutes />;
};

export default RootRoutes;