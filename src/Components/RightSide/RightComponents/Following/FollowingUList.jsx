import React, { useState } from 'react';
import "../Following/FollowingU.css";

const FollowingUList = ({ data, following, setFollowing }) => {
  // Initialize follow status
  const [followStatus, setFollowStatus] = useState("Follow Back");

  // Handle follow button click
  const handleFollow = () => {
    if (followStatus === "Follow Back") {
      setFollowStatus("Following");
      // Optionally, add logic for what happens when status changes to "Following"
      setFollowing(following + 1); // Increment following count
    } else if (followStatus === "Following") {
      setFollowStatus("Follow Back");
      setFollowing(following - 1); // Decrement following count
    }
    // You could add other status handling logic here if needed
  };

  return (
    <div className="following-people">
      <div className="following-details">
        <img src={data.img} alt={data.name} />
        <div className="following-name-username">
          <h3>{data.name}</h3>
          <p>{data.username}</p>
        </div>
      </div>
      <button
        className={
          followStatus === "Following" 
            ? 'following' 
            : followStatus === "Requesting" 
              ? 'requesting' 
              : 'follow-back'
        }
        onClick={handleFollow}
      >
        {followStatus}
      </button>
    </div>
  );
};

export default FollowingUList;
