import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { getUserByUsername } from '../../services/firebase';




const Header = ({username}) => {
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
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={proPic}
            alt={`${username} profile picture`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
    )
}

export default Header
