import PropTypes from "prop-types";

function ChatOptions({ selectedChatOption, setSelectedChatOption, isLoading }) {
  return (
    <div className="text-center font-semibold text-secondaryLight mb-4 mt-5 text-lg h-16 flex items-center justify-center">
      {isLoading ? (
        <h1 className="text-lightPurple">Loading...</h1>
      ) : (
        <div className="flex space-x-10">
          <h1
            className={
              selectedChatOption === "ChatLSTM" ? "text-lightPurple" : ""
            }
            onClick={() => setSelectedChatOption("ChatLSTM")}
          >
            ChatLSTM
          </h1>
          <h1
            className={
              selectedChatOption === "ChatmDeBERTa" ? "text-lightPurple" : ""
            }
            onClick={() => setSelectedChatOption("ChatmDeBERTa")}
          >
            ChatmDeBERTa
          </h1>
          {/* <h1
            className={
              selectedChatOption === "ChatwangchanBERTa"
                ? "text-lightPurple"
                : ""
            }
            onClick={() => setSelectedChatOption("ChatwangchanBERTa")}
          >
            ChatwangchanBERTa
          </h1> */}
        </div>
      )}
    </div>
  );
}

ChatOptions.propTypes = {
  selectedChatOption: PropTypes.string.isRequired,
  setSelectedChatOption: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ChatOptions;
