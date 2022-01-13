import React, { useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/loggedInUser';




import usePhotos from '../hooks/usePhotos';



import Post from './post';


const Timeline = () => {
  const { user } = useContext(LoggedInUserContext);

  const { user: { following } = {} } = useContext(
    LoggedInUserContext
  );
  
  const photos = usePhotos(user);
  

useEffect(() => {
      
}, [])




  return (
    <div className="container col-span-2">
    {following===undefined ?(
      <Skeleton count={2} width={640} height={500} className="mb-5" />
    ) : following.length===0 ?(
      <p className="flex justify-center font-bold">Follow other people to see Photos</p>
    ) : photos? (
     photos.map((content) => <Post key={content.docId} content={content} />)          
    ) : null}

    
  </div>
    
  )
}

export default Timeline
