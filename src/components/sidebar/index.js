import React, { useContext } from 'react';
import LoggedInUserContext from '../../context/loggedInUser';

import Suggestions from './Suggestions';
import User from './User';


const Sidebar = () => {
    const { user: { docId = '', fullName, username, userId, following, imageSrc } = {} } = useContext(
        LoggedInUserContext
      );


    return (
        <div className="lg:pl-2 lg:pr-2"  >
            <User imageSrc={imageSrc} username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    )
}

export default Sidebar