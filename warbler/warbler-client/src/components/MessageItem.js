import React from 'react';
import Moment from 'react-moment'
import {Link} from 'react-router-dom';
//import default image

const MessageItem = ({isCorrectUser,date, profileImageUrl, text, username, removeMessage}) => (
  <div>
    <li className='list-group-item'>
      <img src={profileImageUrl} alt={username} height='100' widht='100' className='timeline-image'/>
      <div className='message-area'>
        <Link to='/'>@{username} &nbsp;</Link>
        <span className='text-muted'>
          <Moment className='text-muted' format='DD MMM YYYY'>
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && (
          <a className='btn btn-danger' onClick={removeMessage}>
            Delete
          </a>
        )}
      </div>
    </li>
  </div>
);

export default MessageItem;
