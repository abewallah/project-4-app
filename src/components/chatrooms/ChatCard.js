import React, { useState, useEffect } from 'react';

function ChatCard({
  chatroom,
  setCurrentChatRoom,
  setRefresh,
  setEditCurrentChatRoom,
  users,
}) {
  const [currentUser, setCurrentUser] = useState('');

  const chatroomUser = chatroom.users;

  function deleteChatroom() {
    fetch(`https://evening-mesa-39907.herokuapp.com/chatrooms/${chatroom._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefresh(data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const token = {
      token: localStorage.getItem('token'),
    };

    // console.log('Token = ', typeof token);
    if (token) {
      fetch('https://evening-mesa-39907.herokuapp.com/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (!currentUser) setCurrentUser(data.profile);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className='d-flex mb-2 bd-highlight chatCardCont'>
      <span onClick={() => setCurrentChatRoom(chatroom._id)}>
        <div className='img_cont chatroomImgBtn'>
          <img
            src='https://miro.medium.com/max/935/1*M_PoTEmelbIbw3nLcWHjSg.png'
            className='rounded-circle user_img'
            alt=''
          />
          <span className='online_icon'></span>
        </div>
      </span>
      <div className='user_info'>
        <span>{chatroom.name}</span>
        <p>{chatroom.name} is online</p>
      </div>
      {chatroomUser !== currentUser._id ? (
        <div>
          <h5></h5>
        </div>
      ) : (
        <div className='chatroomBtnDiv'>
          <div className='chatroomBtnDiv'>
            <span
              className='chatroomBtn input-group-text'
              onClick={() => setEditCurrentChatRoom(chatroom)}
            >
              <i className='fas fa-edit'></i>
            </span>
          </div>

          <div className='chatroomBtnDiv'>
            <span
              className='chatroomBtn input-group-text'
              onClick={() => deleteChatroom(chatroom._id)}
            >
              <i className='fas fa-trash'></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatCard;
