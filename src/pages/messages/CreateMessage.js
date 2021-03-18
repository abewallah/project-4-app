import React, { useState, useEffect } from 'react';

function CreateMessage({ currentChatRoom, setRefresh }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [messageForm, setMessageForm] = useState({
    message: '',
    chatRoom: {},
    user: {},
  });

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
          setError(error);
        })
        .then((data) => {
          if (!currentUser) setCurrentUser(data.profile);
        })
        .catch((err) => console.log(err));
    }
  }, [setMessageForm]);

  const handleChange = (event) => {
    event.preventDefault();
    setMessageForm((messageForm) => ({
      ...messageForm,
      message: event.target.value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      ...messageForm,
      user: currentUser._id,
      chatRoom: currentChatRoom,
    };

    fetch('https://evening-mesa-39907.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessageForm({
          message: '',
        });
        setRefresh(data.message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='card-footer'>
      <div className='input-group mb-3 text-white'>
        <textarea
          name='text'
          className='form-control type_msg'
          placeholder='Type your message...'
          value={messageForm.message}
          onChange={handleChange}
        />
        <span
          onClick={handleSubmit}
          type='submit'
          className='input-group-text send_btn'
        >
          <i className='fas fa-location-arrow'></i>
        </span>
      </div>
    </div>
  );
}

export default CreateMessage;
