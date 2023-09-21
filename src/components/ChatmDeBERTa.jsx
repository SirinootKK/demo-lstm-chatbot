import PropTypes from "prop-types";
import { userImg, botImg } from "./images/index.js";
import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";

function ChatmDeBERTa({
  userMessage,
  //   setUserMessage,
  //   isLoading,
  //   handleSubmit,
  botResponses,
  //   setBotResponses,
  chatContainerRef,
}) {
  return (
    <>
      <ChatMessages
        botResponses={botResponses}
        userImg={userImg}
        botImg={botImg}
        chatContainerRef={chatContainerRef}
        selectedChatOption="ChatmDeBERTa"
        userMessage={userMessage}
      />
      {/* <ChatInput
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        setBotResponses={setBotResponses}
      /> */}
    </>
  );
}

ChatmDeBERTa.propTypes = {
  userMessage: PropTypes.string.isRequired,
  setUserMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  botResponses: PropTypes.array.isRequired,
  setBotResponses: PropTypes.func.isRequired,
  chatContainerRef: PropTypes.object.isRequired,
};

export default ChatmDeBERTa;
