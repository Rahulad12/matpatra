import {Outlet,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AdminRoute = () => {
    const {citizenInfo} = useSelector(state => state.auth);

    if(citizenInfo && citizenInfo.isAdmin){
        return <Outlet />;
    }else{
        return <Navigate to="/auth" replace />;
    }
};

export default AdminRoute;