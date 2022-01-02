import {
  makeName,
  checkChatBox,
  newChatBox
} from './utility'
import ChatBox from './ChatBox';

const Query = {
  chatBox: async (parent, { name1, name2 }, { db, pubsub }, info) => {
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "queryChatBox");
    // if(!chatBox) chatBox = await newChatBox(db, chatBoxName);
    return chatBox;
  }
};

export default Query;
