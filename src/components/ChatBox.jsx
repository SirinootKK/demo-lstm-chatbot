import { useState, useEffect, useRef } from "react";
import { Input } from "@material-tailwind/react";
import { userImg, botImg } from "./images/index.js";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botResponses, setBotResponses] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botResponses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage) return;

    setUserMessage("");
    setIsLoading(true);

    setBotResponses((prevResponses) => [
      ...prevResponses,
      { message: userMessage, isUserMessage: true },
    ]);

    try {
      const response = await fetch("/api/get_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      setBotResponses((prevResponses) => [
        ...prevResponses,
        { message: data.response, isUserMessage: false },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="w-full max-w-5xl h-full md:m-4 md:h-5/6 bg-secondary md:rounded-xl shadow-xl flex flex-col">
        <h1 className="text-center font-semibold text-secondaryLight mb-4 mt-5 text-lg h-16 flex items-center justify-center">
          {isLoading ? "Loading..." : "ChatLSTM"}
        </h1>
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
        <div className="flex-grow overflow-auto h-full" ref={chatContainerRef}>
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
              <div className="px-4">{response.message}</div>
            </div>
          ))}
        </div>
        <div className="h-36 w-full flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full h-fit relative px-12"
          >
            <Input
              type="text"
              value={userMessage}
              className="w-full flex rounded-xl p-4 bg-primaryLight shadow-2xl text-white outline-none"
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder={isLoading ? "Loading..." : "Send a message..."}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="z-20 w-fit h-fit text-secondaryLight absolute right-16 top-1/2 -translate-y-1/2"
              disabled={isLoading}
            >
              {!isLoading ? <SendIcon fontSize="small" /> : null}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
