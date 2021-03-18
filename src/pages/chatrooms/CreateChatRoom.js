import React, { useState, useEffect } from 'react';

function CreateChatRoom({ chatrooms, setRefresh }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [chatForm, setChatForm] = useState({
    name: '',
    img: '',
    users: [],
    messages: [],
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

          // console.log('currentUser', currentUser);
        })
        .catch((err) => console.log(err));
    }
  }, [chatrooms]);

  const handleChange = (event) => {
    event.persist();
    setChatForm((chatForm) => ({
      ...chatForm,
      name: event.target.value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const obj = { ...chatForm, users: [currentUser._id] };
    fetch('https://evening-mesa-39907.herokuapp.com/chatrooms', {
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
        
        setChatForm({
          name: '',
        });
        setRefresh(data.name);
        
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='card-footer'>
      <div className='input-group mb-3'>
        <textarea
          type='text'
          name='chatRoomName '
          className='form-control type_msg'
          id='chatRoomName'
          placeholder='Create Your Own Room Name Your Chatroom'
          value={chatForm.name}
          onChange={handleChange}
        />
        <span
          onClick={handleSubmit}
          type='submit'
          className='input-group-text send_btn'
        >
          <i className='fas fa-plus-circle'></i>
        </span>
      </div>
    </div>
  );
}

export default CreateChatRoom;
