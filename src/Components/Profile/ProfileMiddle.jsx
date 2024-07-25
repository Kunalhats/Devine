import React, { useState, useEffect, useMemo } from 'react';
import Info from './ProfileComponents/InfoProfile/Info';
import UserHome from '../UserHome/UserHome';
import ProfileInputPost from './ProfileComponents/ProfileInputPost';
import moment from 'moment';
import Profile from '../../assets/profile.jpg';
import img1 from '../../assets/User-post/img1.jpg';
import img2 from '../../assets/User-post/img2.jpg';
import img3 from '../../assets/User-post/img3.jpg';
import '../Profile/ProfileMiddle.css';

const ProfileMiddle = ({
  following,
  search,
  images,
  setImages,
  profileImg,
  setProfileImg,
  name,
  setName,
  userName,
  setUserName,
  modelDetails,
  setModelDetails,
}) => {
  const [userPostData, setUserPostData] = useState([
    {
      id: 1,
      username: 'Vijay',
      profilepicture: Profile,
      img: img1,
      datetime: moment('20230401', 'YYYYMMDD').fromNow(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      like: 22,
      comment: 12,
    },
    {
      id: 2,
      username: 'Vijay',
      profilepicture: Profile,
      img: img2,
      datetime: moment('20230525', 'YYYYMMDD').fromNow(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      like: 84,
      comment: 30,
    },
    {
      id: 3,
      username: 'Vijay',
      profilepicture: Profile,
      img: img3,
      datetime: moment.utc('2023-08-13 12:45:00').local().startOf('seconds').fromNow(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      like: 340,
      comment: 76,
    },
  ]);

  const [body, setBody] = useState('');
  const [importFile, setImportFile] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    return () => {
      if (images) {
        URL.revokeObjectURL(images);
      }
    };
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editPostId !== null) {
      const updatedPosts = userPostData.map((post) =>
        post.id === editPostId
          ? {
              ...post,
              body,
              img: images ? URL.createObjectURL(images) : post.img,
            }
          : post
      );
      setUserPostData(updatedPosts);
      setEditPostId(null);
    } else {
      const id = userPostData.length ? userPostData[0].id + 1 : 1;
      const username = 'Vijay';
      const profilepicture = Profile;
      const datetime = moment.utc(new Date()).local().startOf('seconds').fromNow();
      const img = images ? URL.createObjectURL(images) : null;

      const newPost = {
        id,
        profilepicture,
        username,
        datetime,
        img,
        body,
        like: 0,
        comment: 0,
      };

      setUserPostData([newPost, ...userPostData]);
    }

    setBody('');
    setImages(null);
  };

  const filteredPosts = useMemo(() => {
    return userPostData.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [userPostData, search]);

  const handleEdit = (post) => {
    setBody(post.body);
    setEditPostId(post.id);
    if (post.img) {
      fetch(post.img)
        .then(response => response.blob())
        .then(blob => setImages(new File([blob], 'temp.jpg')))
        .catch(err => console.error('Failed to fetch image', err));
    } else {
      setImages(null);
    }
  };

  return (
    <div className="profileMiddle">
      <Info
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
      />

      <ProfileInputPost
        modelDetails={modelDetails}
        profileImg={profileImg}
        handleSubmit={handleSubmit}
        body={body}
        setBody={setBody}
        importFile={importFile}
        setImportFile={setImportFile}
        images={images}
        setImages={setImages}
      />

      <UserHome
        modelDetails={modelDetails}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={filteredPosts}
        images={images}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProfileMiddle;