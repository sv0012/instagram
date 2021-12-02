import React from 'react';
import useUser from '../../hooks/useUser';
import Suggestions from './Suggestions';
import User from './User';


const Sidebar = () => {
    const {user} = useUser();
    // if(user) {
    //     const {fullName,username,userId} =user;
    // }

  
    return (
        <div className="p-4" >
            <User username={user?.username} fullName={user?.fullName} />
            <Suggestions userId={user?.userId} />    
        </div>
    )
}

export default Sidebar
//username={username} fullName={fullName} userId={userId} 