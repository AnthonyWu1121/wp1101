import {} from './utility';

const Mutation = {
  async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
    if(!name1 || !name2)
      throw new Error("Missing chatBox name for createChatBox");
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("USer does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("USer does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if(!chatBox) chatBox = await newChatBox(db, chatBoxName);
    return chatBox;
  },
};

export { Mutation as default };
