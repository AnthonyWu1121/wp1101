import Title from '../Components/Title'
import Message from '../Components/Message'

import { Button, Input, Tag } from 'antd'
import { useState, useRef } from 'react'

const Chatroom = ({appMe, displayStatus, messages, sendMessage, clearMessages}) => {
    const [body, setBody] = useState('')

    const bodyRef = useRef(null)

    return (
    <>
        <Title>
            <h1>{appMe}'s Chatroom</h1>
            <Button type="primary" danger onClick={clearMessages}>
                Clear
            </Button>
        </Title>
        <Message>
            {messages.length === 0 ? (
                <p style={{ color: '#ccc' }}>No messages...</p>
            ) : (
                messages.map(({name, body}, i) => (
                <p className='App-messages' key={i}>
                    <Tag color='blue'>{name}</Tag> {body}
                </p>
                ))
            )}
        </Message>
        <Input.Search
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
                if(!msg || !(appMe)){
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter a message body.'
                    })
                    return
                }
                sendMessage({name: appMe, body: msg})
                setBody('')
            }}
        ></Input.Search>
    </>
    );
}

export default Chatroom;