import React from 'react';

function UserCard({ messages, currentChatRoom, chatrooms }) {
  return (
    <div className='card-header msg_head'>
      <div className='d-flex bd-highlight'>
        <div className='img_cont'>
          <img
            src='https://miro.medium.com/max/935/1*M_PoTEmelbIbw3nLcWHjSg.png'
            className='rounded-circle user_img'
          />
        </div>
        <div className='user_info'>
          <span>
            {chatrooms.map((name, index) => {
              if (name._id === currentChatRoom) {
                return name.name;
              }
            })}
          </span>
          <p>{messages.length} Messages</p>
        </div>
      </div>
      <span id='action_menu_btn'>
        <i className='fas fa-ellipsis-v'></i>
      </span>
    </div>
  );
}
export default UserCard;
