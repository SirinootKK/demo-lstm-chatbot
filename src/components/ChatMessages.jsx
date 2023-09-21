// ChatMessages.jsx
import PropTypes from "prop-types";
import { useEffect } from "react"; // Import useEffect

function ChatMessages({
  botResponses,
  userImg,
  botImg,
  chatContainerRef,
  selectedChatOption,
  userMessage,
}) {
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botResponses, chatContainerRef]);

  return (
    <div
      className="flex-grow overflow-auto vertical-scrollbar h-full"
      ref={chatContainerRef}
    >
      {botResponses.length === 0 && !userMessage && (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-gray-500 opacity-60 text-2xl">
            Welcome to{" "}
            {selectedChatOption === "ChatLSTM"
              ? "ChatLSTM"
              : selectedChatOption === "ChatmDeBERTa"
              ? "ChatmDeBERTa"
              : selectedChatOption === "ChatwangchanBERTa"
              ? "ChatwangchanBERTa"
              : ""}
          </h1>
        </div>
      )}
      {botResponses.map((response, index) => (
        <div
          key={index}
          className={`flex flex-row md:items-center space-x-2 px-[40px] md:px-[72px] py-6 text-white ${
            response.isUserMessage ? "bg-secondary" : "bg-purple "
          }`}
        >
          <img
            src={response.isUserMessage ? userImg : botImg}
            className="object-cover h-[48px] w-[48px]"
            alt={response.isUserMessage ? "User" : "Bot"}
          />
          <div className="px-4">
            {response.isUserMessage
              ? `${response.message}`
              : `${response.message}`}
          </div>
        </div>
      ))}
    </div>
  );
}

ChatMessages.propTypes = {
  botResponses: PropTypes.array.isRequired,
  userImg: PropTypes.string.isRequired,
  botImg: PropTypes.string.isRequired,
  chatContainerRef: PropTypes.object.isRequired,
  selectedChatOption: PropTypes.string.isRequired,
  userMessage: PropTypes.string.isRequired,
};

export default ChatMessages;
