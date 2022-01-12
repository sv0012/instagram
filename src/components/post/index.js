import React, { useContext } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';
import UserContext from '../../context/user';
import useUser from '../../hooks/useUser';


const Post = ({ content }) => {

    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);

  
    

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header loggedInUsername = {user?.username} username={content.username} postId={content.photoId} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
    )
}

export default Post;

Post.propTypes = {
    content: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      docId: PropTypes.string.isRequired,
      userLikedPhoto: PropTypes.bool.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      dateCreated: PropTypes.number.isRequired
    })
  };
