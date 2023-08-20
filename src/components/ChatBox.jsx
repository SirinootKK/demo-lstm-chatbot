import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";

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
      <div className="shadow-xl rounded-xl w-9/12 p-4 bg-secondary">
        <div className="flex justify-center items-center font-semibold text-secondaryLight my-5 ">
          ChatLSTM
        </div>
        {/* {botResponse && ( */}
        <div className="bg-purple rounded-lg p-5 mt-7 text-white">
          {/* <strong>Bot Response:</strong>  */}
          {botResponse}
        </div>
        {/* )} */}
        <div className="space-y-4">
          <div className="flex items-center">
            <form onSubmit={handleSubmit}>
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="pr-20"
                />
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                >
                  <SendIcon />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ChatBox;
