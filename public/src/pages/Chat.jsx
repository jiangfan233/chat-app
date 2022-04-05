import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();

  console.log(location)
  return ( 
    <div>Chat</div>
   );
}
 
export default Chat;