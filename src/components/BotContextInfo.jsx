/* eslint-disable react/prop-types */
function BotContextInfo({ response, selectedChatType }) {
  const contextProperty =
    selectedChatType === "ChatWangchanBERTa"
      ? "wc_similar_context"
      : "similar_context";

  const disProps =
    selectedChatType === "ChatWangchanBERTa" ? "wc_allDistance" : "allDistance";

  const semanticContextProperty =
    selectedChatType === "ChatWangchanBERTa"
      ? "context_semantic_wc"
      : "context_semantic_mde";

  const semDistanceProperty =
    selectedChatType === "ChatWangchanBERTa"
      ? "info_distance_wc"
      : "info_distance";

  return (
    <div className="flex flex-row">
      <div className="p-4 mb-2 flex-1 text-white">
        <h2 className="text-lg font-semibold mb-2 ">doc2vec</h2>
        {response[contextProperty] &&
          response[contextProperty].map((item, idx) => (
            <div
              key={idx}
              className={`pt-2 ${item.includes("          ") ? "mb-2" : ""}`}
            >
              {item.split(/\s{2,}/).map((line, i) => (
                <p key={i}>
                  <span>{line}</span>
                </p>
              ))}
              {response[disProps][idx] && (
                <div className="text-sm font-light">
                  <span>confident = {response[disProps][idx]}</span>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="p-4 flex-1 ml-2 text-white">
        <h2 className="text-lg font-semibold mb-2 ">sentence tranformer</h2>
        {response[semanticContextProperty] &&
          response[semanticContextProperty].map((item, idx) => (
            <div
              key={idx}
              className={`pt-2 ${item.includes("          ") ? "mb-2" : ""}`}
            >
              {item.split(/\s{2,}/).map((line, i) => (
                <p key={i}>
                  <span>{line}</span>
                </p>
              ))}
              {response[semDistanceProperty][idx] && (
                <div className="text-sm font-light">
                  <span>confident = {response[semDistanceProperty][idx]}</span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default BotContextInfo;
