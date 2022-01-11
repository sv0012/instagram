import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import useUser from '../hooks/useUser'
import Post from './post';


const Timeline = () => {
    const { photos } = usePhotos();

    

    
    return (
        <div className="container col-span-2" >
            {!photos ?(
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ?(
        photos.map((content) => <Post key={content.docId} content={content} />) 
      ) :  (
        <p className="flex justify-center font-bold">Follow other people to see Photos</p>    
      ) }
        </div>
    )
}

export default Timeline
