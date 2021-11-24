import http from 'http';
import express from 'express';
import dotenv from  'dotenv-defaults';
import { mongoose } from "mongoose";
import WebSocket from "ws";
import Message from './models/message';

//10:50
dotenv.config();

mongoose.connection(process.env.MONGO_URL, );
const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});


db.once('open', () => {
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            switch (task){
                case 'input':{
                    const {name, body} = payload
                    const message = new Message({name, body})
                    try{
                        await message.save();
                    }catch(e){
                        throw new Error("Message DB save error: " + e);
                    }
                    sendData(['output', [payload]], ws)
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws)
                }
                break
            }
            await dbMessage.save();
        }
        sendData(['output', [payload]])
    })
    server.listen(PORT, )
})