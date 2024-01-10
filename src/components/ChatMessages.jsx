/* eslint-disable react/prop-types */
import { userImg, botImg } from "./images/index";

function ChatMessages({
  botResponses,
  chatContainerRef,
  userMessage,
  selectedChatType,
}) {
  const welcomeMessage =
    selectedChatType === "ChatmDeBERTa"
      ? "Welcome to ChatmDeBERTa"
      : "Welcome to ChatWangchanBERTa";

  const distanceProperty =
    selectedChatType === "ChatmDeBERTa" ? "distance" : "wc_distance";

  const semanticAnswerProperty =
    selectedChatType === "ChatmDeBERTa" ? "semantic_mde" : "semantic_wc";

  const semanticScoreProperty =
    selectedChatType === "ChatmDeBERTa" ? "score" : "score_wc";

  return (
    <div
      className="flex-grow overflow-auto vertical-scrollbar h-full"
      ref={chatContainerRef}
    >
      {botResponses.length === 0 && !userMessage && (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-gray-500 opacity-60 text-2xl">
            {welcomeMessage}
          </h1>
        </div>
      )}
      {botResponses.map((response, index) => (
        <div
          key={index}
          className={`flex flex-row md:items-center space-x-1 px-[40px] md:px-[72px] py-6 text-white ${
            response.isUserMessage ? "bg-secondary" : "bg-purple "
          }`}
        >
          <img
            src={response.isUserMessage ? userImg : botImg}
            className="object-cover h-[48px] w-[48px]"
            alt={response.isUserMessage ? "User" : "Bot"}
          />
          <div className="px-4">
            {response.isUserMessage ? (
              <div>{response.message}</div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-secondaryLight">
                  doc2vec
                </p>
                {response.message}
              </div>
            )}

            <div className="text-sm">
              {response.isUserMessage ? (
                ""
              ) : (
                <>
                  {response &&
                    (response.distance > 0.49 ||
                      response.wc_distance > 0.49) && (
                      <p className="text-xs mt-1">
                        confident = {response[distanceProperty]}
                      </p>
                    )}
                  {response[semanticAnswerProperty] && (
                    <>
                      <p className="text-sm font-semibold text-secondaryLight mt-3">
                        sentence tranformer
                      </p>
                      <p className="text-sm mt-1">
                        {response[semanticAnswerProperty]}
                      </p>
                      <p className="text-xs mt-1">
                        Score: {response[semanticScoreProperty]}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
