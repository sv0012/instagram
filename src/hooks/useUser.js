import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';


const useUser = (userId) => {
    const [activeUser, setActiveUser] = useState();
    

    useEffect(() => {
      async function getUserObjByUserId() {
          //we need a func that we can call(firebase service) that gets the user data based on id 
          const [user] = await getUserByUserId(userId);
          setActiveUser(user || {});
          
      }
      if(userId){
          getUserObjByUserId();
      }
    }, [userId])

    return { user : activeUser, setActiveUser }
}

export default useUser
