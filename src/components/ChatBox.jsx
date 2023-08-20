import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";
import { userImg, botImg } from "./images/index.js";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/get_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setBotResponse(data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-full max-w-6xl bg-secondary rounded-xl shadow-xl">
        <div className="text-center font-semibold text-secondaryLight mb-4 mt-5 text-xl">
          ChatLSTM
        </div>
        <hr className="h-px bg-primary border-2 border-primary w-full"></hr>
        <div className="rounded-lg mt-10 text-white">
          {userMessage && (
            <div className="text-left mbออออออออ-2">
              <span className="inline-block px-4 py-2 rounded-lg bg-secondary text-gray-800">
                {userMessage}
              </span>
            </div>
          )}
          <div className="flex flex-row items-center">
            {/* {botResponse ?  ( */}
            <div className="text-right mb-2">
              <span className="flex items-center space-x-2 px-[48px] py-6 rounded-lg bg-purple text-white">
                <img src={botImg} className="object-cover h-[48px] w-[48px]" />
                <span>{botResponse}</span>
              </span>
            </div>
            {/* )} */}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex">
                <Input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full pr-20"
                  placeholder="Type your message..."
                />
                <Button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded ml-2"
                >
                  <SendIcon />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
