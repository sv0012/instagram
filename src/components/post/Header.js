import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { getUserByUsername } from '../../services/firebase';




const Header = ({ loggedInUsername, username, postId }) => {
  const [proPic, setProPic] = useState('')
  useEffect(() => {
    async function getPostUserDetails() {
      const [user] = await getUserByUsername(username);
      if (user) {
        setProPic(user.imageSrc);
      }
    }

    getPostUserDetails();

  }, [])
  return (
    <div className="flex justify-between border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex  items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={proPic}
            alt=''
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
          <p className="font-bold">{username}</p>
        </Link>
        
      </div>
      <div className='flex  items-center'>
      {loggedInUsername == username &&
          <>
            <Link to={`/edit-post/${postId}`} >
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </Link>
          </>}
      </div>
     
        
      
    </div>
  )
}

export default Header
