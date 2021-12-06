import http from 'http';
import express from 'express';
import dotenv from  'dotenv-defaults';
import mongoose from "mongoose";
import {WebSocketServer} from "ws";
import Message from './models/message.js';
import {sendData, sendStatus, initData} from './wssConnect.js';

//10:50
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));

const broadcastMessge = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    })
}

const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

db.once('open', () => {
    console.log('MongoDB connected!');
    wss.on('connection', (ws) => {
        initData(ws);
        ws.onmessage = async (byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task){
                case 'input': {
                    const {name, body} = payload
                    const message = new Message({name, body})
                    try{
                        await message.save();
                    }catch(e){
                        throw new Error("Message DB save error: " + e);
                    }
                    // sendData(['output', [payload]], ws)
                    // sendStatus({
                    //     type: 'success',
                    //     msg: 'Message sent.'
                    // }, ws)
                    broadcastMessge(['output', [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    })
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        // sendData(['cleared'], ws)
                        // sendStatus({
                        //     type: 'info',
                        //     msg: 'Message cache cleared.'
                        // }, ws)
                        broadcastMessge(['cleared'], {
                            type: 'info',
                            msg: 'Message cache cleared.'
                        })
                    })
                    
                    break
                }
                default: break
            }
        }
    })

    const PORT = process.env.port || 4000
    server.listen(PORT, () => {
        console.log(`Server is up on port ${PORT}!`);
    })
})