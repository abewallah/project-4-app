import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CreateChatRoom from './CreateChatRoom';
import CreateMessage from '../messages/CreateMessage';
import ChatCard from '../../components/chatrooms/ChatCard';
import MessageCard from '../../components/messages/MessageCard';
import UserCard from '../../components/users/UserCard';
import EditChatRoom from './EditChatRoom';

const ChatRoomPage = () => {
  const history = useHistory();
  const [refresh, setRefresh] = useState('');
  const [currentChatRoom, setCurrentChatRoom] = useState('');
  const [editCurrentChatRoom, setEditCurrentChatRoom] = useState('');
  const [chatrooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = {
      token: localStorage.getItem('token'),
    };

    if (!token.token) history.push('./login');

    fetch('https://evening-mesa-39907.herokuapp.com/chatrooms')
      .then((response) => response.json())
      .then((data) => {
        setChatRooms(data);
      })
      .catch((err) => console.log(err));
  }, [refresh, editCurrentChatRoom]);

  useEffect(() => {
    if (currentChatRoom)
      fetch(`https://evening-mesa-39907.herokuapp.com/messages/${currentChatRoom}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        });
  }, [currentChatRoom, refresh]);

  return (
    <>
      {editCurrentChatRoom ? (
        <div className='d-flex justify-content-evenly mt-5'>
          <EditChatRoom
            setEditCurrentChatRoom={setEditCurrentChatRoom}
            editCurrentChatRoom={editCurrentChatRoom}
          />
        </div>
      ) : (
        <div className='container-fluid h-100 mainChatCont'>
          <div className='row  h-100'>
            <div className='d-flex justify-content-evenly chat mt-5'>
              <div className='d-flex flex-column chatLeftSide'>
                <div className='card mb-sm-3 mb-md-3 chatrooms_card'>
                  <div className='card-header'>
                    <div className='input-group'>
                      <input
                        type='text'
                        placeholder='Search...'
                        className='form-control search'
                      />
                      <span className='input-group-text search_btn'>
                        <i className='fas fa-search'></i>
                      </span>
                    </div>
                  </div>
                  <div className='card-body chatrooms_body'>
                    <ul className='chatrooms'>
                      <li className='active'>
                        {chatrooms.map((chatroom, index) => {
                          return (
                            <ChatCard
                              key={chatroom._id}
                              chatroom={chatroom}
                              users={chatroom.users}
                              index={index}
                              setRefresh={setRefresh}
                              setCurrentChatRoom={setCurrentChatRoom}
                              setEditCurrentChatRoom={setEditCurrentChatRoom}
                            />
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
                <CreateChatRoom chatrooms={chatrooms} setRefresh={setRefresh} />
              </div>
              <div className='d-flex'>
                <div className='chat'>
                  <div className='card'>
                    <UserCard
                      chatrooms={chatrooms}
                      messages={messages}
                      currentChatRoom={currentChatRoom}
                    />
                    <div className='card-body msg_card_body'>
                      {messages.map((message, index) => {
                        return (
                          <MessageCard
                            key={message._id}
                            index={index}
                            message={message}
                            setRefresh={setRefresh}
                          />
                        );
                      })}
                    </div>
                    <CreateMessage
                      messages={messages}
                      currentChatRoom={currentChatRoom}
                      setRefresh={setRefresh}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoomPage;
