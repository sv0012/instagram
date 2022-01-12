import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import UserContext from '../context/user';
import { getFollowedPhotos, getUserByUserId, getUserPhotos } from '../services/firebase';


const usePhotos = () => {

    const [photos, setPhotos] = useState(null);
    const {
      user : {uid: userId = ''}
    } = useContext(UserContext);

    useEffect(() => {
      async function getTimelinePhotos() {
       const [{ following }] = await getUserByUserId(userId);
       let followedUserPhotos = [];
       let userPhotos = [];
       let followedAndUserPhotos = [];

      
       //does the user follow people
        if(following.length > 0) {
          followedUserPhotos = await getFollowedPhotos(userId,following);

        }
        

        userPhotos = await getUserPhotos(userId);

       

        
        followedAndUserPhotos = [...followedUserPhotos,...userPhotos];
      

        followedAndUserPhotos.sort((a,b)=>b.dateCreated - a.dateCreated);
        setPhotos(followedAndUserPhotos);

      }
  
      getTimelinePhotos();
      console.log(userId)
      console.log(photos)
    }, []);
    

    return { photos };
}

export default usePhotos
