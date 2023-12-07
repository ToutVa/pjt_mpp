
import { Link } from "react-router-dom";
import FeedContent from "./FeedContent";
import Modal from 'react-modal';
import "css/feed.css";
import { useState } from "react";
import PostDragDrop from "pages/post/PostDragDrop";

const CreatePost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return(
    <>
      <Link className="btn-create-post" onClick={() => {setModalIsOpen(true)}} />
      <Modal className="test" 
             isOpen={modalIsOpen} 
             onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <PostDragDrop />

      </Modal>
    </>
  );
}
const Feed = () => {
  return (
    <>
      <div className="feed"> 
        <div className="left">
          left Side
        </div>
        <div className="center">
          <FeedContent />
          <CreatePost />
        </div>
        <div className="right">
          right Side
        </div>
        
      </div>
    </>
  );
};
export default Feed;