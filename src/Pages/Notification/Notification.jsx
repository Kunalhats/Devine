import React from 'react';
import "../Notification/Notification.css";
import img1 from "../../assets/Following/img-1.jpg";
import img2 from "../../assets/Following/img-2.jpg";
import img3 from "../../assets/Following/img-3.jpg";
import img4 from "../../assets/Following/img-5.jpg";
import { AiOutlineHome } from "react-icons/ai";
import ProfileImg from "../../assets/profile.jpg";
import { Link } from 'react-router-dom';

const Notification = () => {
  return (
    <div className="noti-overall">
      <div className='nav-section'>
        <Link to="/home" className='noti-div'>
          <AiOutlineHome className='noti-Home-Icon' />
        </Link>
        <Link to="/profile" className='profile-link'>
          <img src={ProfileImg} alt="Profile" className="profile-img" />
        </Link>
      </div>

      <div className="notification-group">
        <h1>Notifications</h1>
        <div className="notification-section">
          {[
            { img: img1, name: "Mike Tysion", action: "liked your profile picture", time: "10 mins ago" },
            { img: img2, name: "Violet", action: "liked your profile picture", time: "1 day ago" },
            { img: img2, name: "Violet", action: "liked your cover picture", time: "20 secs ago" },
            { img: img3, name: "Brandon", action: "liked your profile picture", time: "5 hours ago" },
            { img: img4, name: "Camille", action: "liked your profile picture", time: "1 min ago" }
          ].map((notification, index) => (
            <div key={index} className="notification-msg">
              <img src={notification.img} alt={`${notification.name}'s profile`} />
              <div className="notification-content">
                <p>
                  <strong>{notification.name}</strong> {notification.action}
                  <br />
                  <small>{notification.time}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
