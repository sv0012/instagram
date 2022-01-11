import React from 'react';
import useUser from '../../hooks/useUser';
import Suggestions from './Suggestions';
import User from './User';


const Sidebar = () => {
    const { user } = useUser();


    return (
        <div className="p-4" >
            <User imageSrc={user?.imageSrc} username={user?.username} fullName={user?.fullName} />
            <Suggestions userId={user?.userId} following={user?.following} loggedInUserDocId={user?.docId} />
        </div>
    )
}

export default Sidebar
//username={username} fullName={fullName} userId={userId}