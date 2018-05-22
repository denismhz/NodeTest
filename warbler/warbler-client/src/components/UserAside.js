import React from 'react';
//import image

const UserAside = ({profileImageUrl, username}) => (
  <aside className='col-sm-2'>
    <div className='panel panel-default'>
      <div className='panel-body'>
        <img 
          src={profileImageUrl} 
          alt={username} 
          className='img-thumbnail'
          width='200'
          height='200'
        />
      </div>
    </div>
  </aside>
);

export default UserAside;
