import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';


const useUser = () => {
    const [activeUser, setActiveUser] = useState();
    const {user} = useContext(UserContext);

    useEffect(() => {
      async function getUserObjByUserId() {
          //we need a func that we can call(firebase service) that gets the user data based on id 
          const [response] = await getUserByUserId(user.uid);
          setActiveUser(response);
          
      }
      if(user?.uid){
          getUserObjByUserId();
      }
    }, [user])

    return { user : activeUser }
}

export default useUser
