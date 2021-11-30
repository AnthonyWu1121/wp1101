import { message } from 'antd'
import { useState, useEffect, useRef } from 'react'
import useChat from '../Hooks/useChat'
import styled from 'styled-components'

import Chatroom from './chatRoom'
import SignIn from './signIn'

const LOCALSTORAGE_KEY = "save-me";

const App = () => {
  const {status, messages, sendMessage, clearMessages} = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')

  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
  `;

  const displayStatus = (payload) => {
    if (payload.msg) {
      const {type, msg} = payload
      const content = {content: msg, duration: 0.5}
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content);
          break;
      }
    }
  }

  useEffect(() => {displayStatus(status)}, [status])
  
  const bodyRef = useRef(null)

  const chatRoom = 
    <Chatroom
      messages={messages}
      username={username}
      setUsername={setUsername}
      body={body}
      setBody={setBody}
      sendMessage={sendMessage}
      bodyRef={bodyRef}
      displayStatus={displayStatus}
      clearMessages={clearMessages}
    />

  const signIn = 
    <SignIn
      me={me}
      setMe={setMe}
      setSignedIn={setSignedIn}
      displayStatus={displayStatus}
    />

  return (
    <Wrapper>
      {signedIn ? chatRoom : signIn}
    </Wrapper>
  )
}

export default App
