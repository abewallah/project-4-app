import React, { useState } from 'react';

function EditChatRoom({ setEditCurrentChatRoom, editCurrentChatRoom }) {
  const editChatRoom = editCurrentChatRoom;

  const [name, setName] = useState('');

  function handleSubmit(event) {
    console.log(editCurrentChatRoom);
    event.preventDefault();
    const obj = { ...editChatRoom, name: name || editChatRoom.name };
    fetch(`https://evening-mesa-39907.herokuapp.com/chatrooms/${editCurrentChatRoom._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEditCurrentChatRoom(null);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <form
      className='mt-3 d-flex justify-content-evenly'
      onSubmit={handleSubmit}
    >
      <div className='card d-flex align-items-center mt-3'>
        <div className='cardBody d-flex align-items-center text-center flex-column'>
          <div className='inputGroup p-3 mt-3'>
            <label htmlFor='chatRoomName'>
              <h1>Chat Room Name: {editCurrentChatRoom.name}</h1>
            </label>
            <input
              type='text'
              name='chatRoomName'
              id='chatRoomName'
              placeholder='Name Your Chatroom'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <button
            className='btn btn-warning'
            onClick={() => setEditCurrentChatRoom(null)}
          >
            Back
          </button>
          <br />
          <button className='btn btn-info' type='submit'>
            Update Room Name{' '}
          </button>
        </div>
      </div>
      <br />
    </form>
  );
}

export default EditChatRoom;
