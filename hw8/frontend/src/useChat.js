import { useState } from 'react';

const client = new WebSocket('ws://lacalhost:4000')

const sendData = async (data) => {
    await client.send(
        JSON.stringify(data)
    );
};

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){
            case 'output': {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            default: break;
        }
    }

    const sendMessage = (payload) => {
        console.log(payload);
        sendData(["input", payload])
    }
    return{
        status,
        messages,
        sendMessage
    };
};

export default useChat;