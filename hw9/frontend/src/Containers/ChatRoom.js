// 12-21-03 14:27, 15:10, 15:26

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import { Button, Input, Tabs } from 'antd';
import styled from 'styled-components';
import Title from '../Components/Title';
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    display: flex;
`;

const ChatRoom = ({me, displayStatus}) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox(displayStatus);
    const [modalVisible, setModalVisible] = useState(false);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const addChatBox = () => {
        setModalVisible(true);
    };

    return (
    <>
        <Title>
            <h1>{me}'s Chatroom</h1>
            {/* <Button type="primary" danger>
                {" "}
            </Button> */}
        </Title>
        <>
            <Wrapper
                tabBarStyle={{ height: "36px" }}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === "add") addChatBox();
                    else if (action === "remove") {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
            >
                {/* {console.log(chatBoxes)} */}
                {chatBoxes.map((friend) => (
                    <Tabs.TabPane tab={friend} closable={true} key={friend}>
                        <ChatBox me={me} friend={friend} key={friend} />
                    </Tabs.TabPane>
                ))}
            </Wrapper>
            <ChatModal
                visible={modalVisible}
                onCreate={async ({ name }) => {
                    if(!name){
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a name.',
                        });
                        return;
                    }
                    await startChat({
                        variables: {
                            name1: me,
                            name2: name,
                        },
                    });

                    setActiveKey(createChatBox(name));
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
            />
        </>
        <Input.Search
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            enterButton="Send"
            placeholder="Enter message here..."
            onSearch={(msg) => {
                if(!msg){
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter message.',
                    });
                    return;
                }else if(!activeKey){
                    displayStatus({
                        type: 'error',
                        msg: 'Please open a chatbox.',
                    });
                    return;
                }
                sendMessage({ variables: {from: me, to: activeKey, message: msg}});
                setMessageInput('');
                displayStatus({
                    type: 'success',
                    msg: 'Message sent.'
                })
            }}
        />
    </>
    );
}

export default ChatRoom;