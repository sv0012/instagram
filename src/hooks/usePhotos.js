import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';


const usePhotos = (user) => {

    const [photos, setPhotos] = useState(null);
    const {
      user : {uid: userId = ''}
    } = useContext(UserContext);

    useEffect(() => {
      async function getTimelinePhotos() {
       const [{ following }] = await getUserByUserId(userId);
       let followedUserPhotos = [];

      
       //does the user follow people
        if(following.length > 0) {
          followedUserPhotos = await getPhotos(userId,following);
        }

        followedUserPhotos.sort((a,b)=>b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);

      }
  
      getTimelinePhotos();
      
    }, [userId,photos]);


    return { photos };
}

export default usePhotos
