import { useState } from 'react';

const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){
            case 'init': {
                console.log('fe init', payload);
                setMessages(() => payload);
                break;
            }
            case 'output': {
                console.log('fe output', payload);
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            case 'cleared': {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const sendMessage = (payload) => {
        console.log(payload);
        sendData(["input", payload])
    }

    const clearMessages = () => {
        sendData(['clear']);
    }

    return{
        status,
        messages,
        sendMessage,
        clearMessages
    };
};

export default useChat;