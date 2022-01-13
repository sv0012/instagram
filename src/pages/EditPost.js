import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Edit from '../components/Edit';
import Header from '../components/Header';

import { getPostByPhotoId } from '../services/firebase';

const EditPost = () => {

    const  {postId}  = useParams();
      
    const [response, setResponse] = useState([]);

    useEffect(() => {
         
        getPostByPhotoId(postId).then(result=>setResponse(result))
      
  
    }, [postId])
    
   
    
   
    

    return (
        <div className="bg-gray-background">
        <Header />
        {
             response.map((content) => <Edit key={content.docId}  caption={content.caption} imageSrc={content.imageSrc} docId={content.docId} />)
        }
       
        

    </div>
    )
}

export default EditPost
