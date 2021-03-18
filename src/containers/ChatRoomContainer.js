import React from 'react';
import ChatRoomPage from '../pages/chatrooms/ChatRoomPage';

import './cssChatBoxTemp.css';

const ChatRoomContainer = ({ token }) => {
  return <ChatRoomPage token={token} />;
};

export default ChatRoomContainer;
