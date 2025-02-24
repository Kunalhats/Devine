import React, { useState } from 'react';
import "../Home/Post.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import { PiSmileySad } from "react-icons/pi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";
import { LiaFacebookF } from "react-icons/lia";
import { FiInstagram } from "react-icons/fi";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RxTwitterLogo } from "react-icons/rx";
import { FiGithub } from "react-icons/fi";
import Comments from '../Comments/Comments';
import moment from 'moment';

const PostUser = ({ posts, post, setPosts, profileImg, modelDetails, images }) => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.like);
  const [unlike, setUnlike] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [socialIcons, setSocialIcons] = useState(false);

  const handleLikes = () => {
    setLike(unlike ? like - 1 : like + 1);
    setUnlike(!unlike);
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(val => val.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    setShowDelete(false);
  };

  const handleCommentInput = (e) => {
    e.preventDefault();

    const newComment = {
      id: comments.length ? comments[comments.length - 1].id + 1 : 1,
      profilePic: profileImg,
      username: modelDetails.ModelName,
      comment: commentInput,
      time: moment.utc(new Date()).local().startOf('seconds').fromNow(),
      likes: 0
    };

    setComments([...comments, newComment]);
    setCommentInput("");
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-user'>
          <img src={profileImg} className='p-img' alt="" />
          <div>
            <h2>{modelDetails.ModelName}</h2>
            <p className='datePara'>{post.datetime}</p>
          </div>
        </div>
        <div className='delete'>
          {showDelete && (
            <div className="options">
              <button><PiSmileySad />Not Interested in this post</button>
              <button><IoVolumeMuteOutline />Mute this user</button>
              <button><MdBlockFlipped />Block this user</button>
              <button onClick={() => handleDelete(post.id)}><AiOutlineDelete />Delete</button>
              <button><MdReportGmailerrorred />Report post</button>
            </div>
          )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)} />
        </div>
      </div>

      <p className='body'>
        {post.body.length <= 300 ? post.body : `${post.body.slice(0, 300)}...`}
      </p>

      {post.img && (<img src={post.img} alt="" className="post-img" />)}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <p className='heart' onClick={handleLikes}>
              {unlike ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />}
            </p>
            <MessageRoundedIcon onClick={() => setShowComment(!showComment)} className='msg' />
            <ShareOutlinedIcon onClick={() => setSocialIcons(!socialIcons)} className='share' />
            {socialIcons && (
              <div className="social-buttons">
                <a href="http://www.facebook.com" target="blank" className="social-margin">
                  <div className="social-icon facebook">
                    <LiaFacebookF className='social-links' />
                  </div>
                </a>
                <a href="https://pinterest.com/" target="blank" className="social-margin">
                  <div className="social-icon instagram">
                    <FiInstagram className='social-links' />
                  </div>
                </a>
                <a href="http://linkedin.com/" className="social-margin" target="blank">
                  <div className="social-icon linkedin">
                    <BiLogoLinkedin className='social-links' />
                  </div>
                </a>
                <a href="https://github.com/" target="blank" className="social-margin">
                  <div className="social-icon github">
                    <FiGithub className='social-links' />
                  </div>
                </a>
                <a href="http://youtube.com/" target="blank" className="social-margin">
                  <div className="social-icon youtube">
                    <AiFillYoutube className='social-links' />
                  </div>
                </a>
                <a href="http://twitter.com/" target="blank" className="social-margin">
                  <div className="social-icon twitter">
                    <RxTwitterLogo />
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="like-comment-details">
            <span className='post-like'>{like} people like it,</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div>
          {showComment && (
            <div className="commentSection">
              <form onSubmit={handleCommentInput}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className='emoji' />
                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder='Add a comment...'
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />
                  <button type='submit'><SendRoundedIcon className='send' /></button>
                </div>
              </form>
              <div className="sticky">
                {comments.map((cmt) => (
                  <Comments
                    modelDetails={modelDetails}
                    className="classComment"
                    cmt={cmt}
                    key={cmt.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostUser;
