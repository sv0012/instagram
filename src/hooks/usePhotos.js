
import { useState, useEffect } from 'react';

import { getFollowedPhotos, getUserPhotos } from '../services/firebase';


const usePhotos = (user) => {

    const [photos, setPhotos] = useState(null);
    
    
   
   

    useEffect(() => {
      async function getTimelinePhotos() {
        
        let followedUserPhotos = [];
        let userPhotos = [];
        let followedAndUserPhotos = [];
        
       
        //does the user follow people
        if(user?.following?.length > 0) {
           followedUserPhotos = await getFollowedPhotos(user?.userId,user?.following);
        }
         
         
        if(user?.userId) {
         userPhotos = await getUserPhotos(user?.userId);
        }
        
  
         
         followedAndUserPhotos = [...followedUserPhotos,...userPhotos];
       
  
         followedAndUserPhotos.sort((a,b)=>b.dateCreated - a.dateCreated);
         setPhotos(followedAndUserPhotos);
         
       }
  
      getTimelinePhotos()
      
    
    }, [user?.userId,user?.following]);
    

    return  photos ;
}

export default usePhotos;
