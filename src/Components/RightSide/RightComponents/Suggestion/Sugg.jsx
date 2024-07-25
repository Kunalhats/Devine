import React, { useState } from 'react';
import Simg1 from "../../../../assets/Suggestion/img-1.jpg";
import Simg2 from "../../../../assets/Suggestion/img-2.jpg";
import "../Suggestion/Sugg.css";

const Sugg = () => {
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "Cristiano Ronaldo", img: Simg1, followed: false },
    { id: 2, name: "Elon Musk", img: Simg2, followed: false }
  ]);

  const handleFollow = (id) => {
    setSuggestions(suggestions.map(suggestion =>
      suggestion.id === id
        ? { ...suggestion, followed: !suggestion.followed }
        : suggestion
    ));
  };

  const handleDismiss = (id) => {
    setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
  };

  return (
    <div className="Sugg-comp">
      <h2>Suggestion For You</h2>
      {suggestions.map(suggestion => (
        <div key={suggestion.id} className="sugg-people">
          <div className="s-left">
            <img src={suggestion.img} alt={suggestion.name} />
            <h3>{suggestion.name}</h3>
          </div>
          <div className="s-right">
            <button
              className={suggestion.followed ? 'followed' : 'follow'}
              onClick={() => handleFollow(suggestion.id)}
            >
              {suggestion.followed ? 'Following' : 'Follow'}
            </button>
            <button
              className="dismiss"
              onClick={() => handleDismiss(suggestion.id)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sugg;
