import { message } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

import Chatroom from './ChatRoom'
import SignIn from './SignIn'

const App = () => {
  const [appMe, setAppMe] = useState('')
  const [appSignedIn, setAppSignedIn] = useState(false)

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

  const chatRoom = 
    <Chatroom
      appMe={appMe}
      displayStatus={displayStatus}
    />

  const signIn = 
    <SignIn
      setAppMe={setAppMe}
      setAppSignedIn={setAppSignedIn}
      displayStatus={displayStatus}
    />

  return (
    <Wrapper>
      {appSignedIn ? chatRoom : signIn}
    </Wrapper>
  )
}

export default App
