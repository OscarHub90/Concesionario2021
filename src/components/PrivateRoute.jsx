import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {
    const { user, isAuthenticated, isLoading,loginWithRedirect } = useAuth0();

    if (isLoading) return <div>Loading..</div>;

    if (!isAuthenticated){
        return loginWithRedirect();
    }
    
    return <>{children}</>

};

/*     return isAuthenticated ? (
        <>{children}</>
    ) : (
        <div>
            <div className='text-5xl text-red-400'>No te has logueado!</div>
        <Link to='/'>
            <span className='text-blue-500 font-bold'>Ir a inicio</span>
        </Link>
        </div>
        
    ); 
}; */

export default PrivateRoute;
