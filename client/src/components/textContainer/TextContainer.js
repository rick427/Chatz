import React from 'react';

import onlineIcon from '../../assets/onlineIcon.png';

import './textContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h3>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h3>
      <h3>Built with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h3>
      {/* <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2> */}
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;