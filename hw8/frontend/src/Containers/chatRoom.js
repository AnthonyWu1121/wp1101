import Title from '../Components/Title'
import Message from '../Components/Message'

import { Button, Input, Tag } from 'antd'


const Chatroom = ({messages, username, setUsername, body, setBody, sendMessage, bodyRef, displayStatus, clearMessages}) => {
    return (
    <>
        <Title>
            <h1>Simple Chat</h1>
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
        <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    bodyRef.current.focus()
                }
            }}
            style={{ marginBottom: 10 }}
        ></Input>
        <Input.Search // const { Search } = Input (destructed component)
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
                if(!msg || !username){
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter a username and a message body.'
                    })
                    return
                }
                sendMessage({name: username, body: msg})
                setBody('')
            }}
        ></Input.Search>
    </>
    );
}

export default Chatroom;