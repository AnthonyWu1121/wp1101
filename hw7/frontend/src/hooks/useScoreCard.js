import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  /*myturn*/
  addClearMessage: () => {},
  /*myturn*/
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  /*myturn*/
  const addClearMessage = (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };
  /*myturn*/

  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        /*myturn*/
        addClearMessage,
        /*myturn*/
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
