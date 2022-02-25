import React from 'react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId,

} from '../../services/firebase';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import LoggedInUserContext from '../../context/loggedInUser';




const SuggestedProfile = ({
  profileDocId,
  profilePic,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) => {

  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);
  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    const [user] = await getUserByUserId(userId);
    setActiveUser(user);
  }



  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between ">
      <div className="flex items-center justify-around">
        <img
          className="rounded-full h-8 w-8 flex mr-3"
          src={profilePic}
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}

        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm mr-2">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium mr-1 hidden lg:flex"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

export default SuggestedProfile
