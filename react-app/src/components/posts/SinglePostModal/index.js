import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SinglePost from './SinglePost';
import commentImage from '../../../Images/commentbutton.svg'

function SinglePostModal({ postId, commentIcon, postIdCommentIcon, offCommentIcon }) {
  const [showModal, setShowModal] = useState(false);

  const handleCommentIcon = () => {
    if (offCommentIcon) {
      return
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      {commentIcon && <div className='comment-image-contaner'><img className="comment-image-button" onClick={handleCommentIcon} src={commentImage} alt='' /></div>}
      {!commentIcon && <button className='all-comments-button' onClick={() => setShowModal(true)}>View All Comments</button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <SinglePost postId={postId || postIdCommentIcon} />
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;
