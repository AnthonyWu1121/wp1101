// 12-21-03 32:08

import { useState } from "react"

const useChatBox = (displayStatus) => {
    // chatBoxes is an array of strings as friends
    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = (friend) => {
        if (chatBoxes.some((name) => name === friend)){
            displayStatus({
                type: 'error',
                msg: `${friend}'s chat box has already opened.`,
            });
            return;
            // throw new Error(friend +"'s chat box has already opened.");
        }
        
        setChatBoxes([...chatBoxes, friend]);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.indexOf(activeKey);
        const newChatBoxes = chatBoxes.filter((name) => name !== targetKey);
        setChatBoxes(newChatBoxes);

        return activeKey
            ? activeKey === targetKey
                ? index === 0
                    ? ''
                    : chatBoxes[index - 1]
                : activeKey
            : "" //???
    };
    
    return { chatBoxes, createChatBox, removeChatBox };
}

export default useChatBox;