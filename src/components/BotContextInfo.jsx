/* eslint-disable react/prop-types */
// import { useEffect } from "react";
function BotContextInfo({ response, selectedChatType }) {
  const contextProperty =
    selectedChatType === "ChatWangchanBERTa"
      ? "wc_similar_context"
      : "simitar_context";

  // useEffect(() => {
  //   console.log("selectedChatType in BotContextInfo:", selectedChatType);
  // }, [selectedChatType]);

  return (
    <div className="flex flex-col items-start px-[40px] py-1 text-white">
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
          </div>
        ))}
      {response[contextProperty] && (
        <div className="h-[1px] bg-white border-0 w-full shadow-xl" />
      )}
    </div>
  );
}

export default BotContextInfo;
