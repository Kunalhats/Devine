import React from 'react';
import PostUser from './PostUser';

const FeedUser = ({ posts, setPosts, profileImg, modelDetails, images }) => {
  return (
    <div className='feedposts'>
      {posts.map((post) => (
        <PostUser
          key={post.id} // Ensure this is unique for each post
          images={images}
          modelDetails={modelDetails}
          profileImg={profileImg}
          posts={posts}
          post={post}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
};

export default FeedUser;
