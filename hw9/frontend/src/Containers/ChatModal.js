import { useState } from "react";
import {Modal, Input} from "antd";

const ChatModal = ({visible, onCreate, onCancel}) => {
    const [name, setName] = useState('');

    return (
        <>
            <Modal
                title="Add a Chatbox"
                visible={visible}
                onOk={() => {onCreate({name}); setName("");}}
                onCancel={onCancel}
            >
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name here..."
                />
            </Modal>
        </>
    )
}

export default ChatModal;