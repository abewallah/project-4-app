import React, { useState, useEffect } from 'react';

function MessageCard({ index, message, setRefresh }) {
  const [currentUser, setCurrentUser] = useState('');

  function deleteMessage(id) {
    fetch(`https://evening-mesa-39907.herokuapp.com/messages/${message._id}`, {
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
          console.log(response);
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (!currentUser) setCurrentUser(data.profile);

          console.log('currentUser', currentUser);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      {currentUser._id !== message.user ? (
        <div className='d-flex justify-content-start mb-4'>
          <div className='img_cont_msg'>
            <img
              src='https://ps.w.org/wp-user-avatar/assets/icon-256x256.png?rev=1755722'
              className='rounded-circle user_img_msg'
            />
          </div>
          <div className='msg_cotainer'>
            {message.message}
            <span className='msg_time'>{message.createdAt}</span>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-end mb-4'>
          <div className='msg_cotainer_send'>
            {message.message}

            <span className='msg_time_send'>{message.createdAt}</span>
          </div>

          <div className='img_cont_msg'>
            <img
              src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
              className='rounded-circle user_img_msg'
            />
          </div>
          <div>
            <span onClick={() => deleteMessage(message._id)}>
              <a>
                <i className='fas fa-minus-circle'></i>
              </a>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageCard;
