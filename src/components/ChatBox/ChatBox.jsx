import { useState, useEffect, useRef } from "react";
import { Input } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";
import ChatMessages from "./ChatMessages.jsx";
import ExampleList from "./ExampleList.jsx";
import BotContextInfo from "./BotContextInfo.jsx";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [examples] = useState([
    "NCX ครอบคลุมแหล่งข้อมูลอะไรบ้าง",
    "NCX ครอบคลุมแหล่งอะไร",
    "ระบบไม่สามารถเข้าใช้งานได้",
    "ระบบใช้งานไม่ได้",
    "บริษัทฯ ให้บริการอะไรบ้าง",
    "DXT360 มีข้อมูลจากแหล่งข้อมูลอะไรบ้าง",
    "มีบริการฐานข้อมูลราคาพิเศษสำหรับนักศึกษาเพื่อใช้ทำวิจัยหรือไม่",
    "Page Rank ของ Online Media คืออะไร",
  ]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botResponses]);

  const handleScroll = (e) => {
    const strength = Math.abs(e.deltaY);

    if (e.deltaY === 0) return;

    const el = e.currentTarget;

    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      behavior: strength > 70 ? "auto" : "smooth",
    });
  };

  const handleExampleClick = (e) => {
    setUserMessage(e);
  };

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
      const response = await fetch("/api/get_response_mde", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      console.log("API Response:", data);

      setBotResponses((prevResponses) => [
        ...prevResponses,
        {
          message: data.response,
          isUserMessage: false,
          simitar_context: data.simitar_context,
          distance: data.distance,
        },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      window.alert("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    //flex flex-row justify-center items-center
    <div className="h-[100vh] w-full max-w-10xl bg-primary flex p-2">
      {/* max-w-5xl md:h-[98vh]  w-[120vh] h-full*/}
      <div className="w-[120vh] h-[97vh] bg-secondary md:rounded-xl shadow-xl flex flex-col">
        <h1 className="text-center font-semibold text-secondaryLight mb-2 mt-3 text-lg h-16 flex items-center justify-center">
          {isLoading ? (
            <h1 className="text-lightPurple">Loading...</h1>
          ) : (
            "ChatmDeBERTa"
          )}
        </h1>
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />

        <ChatMessages
          botResponses={botResponses}
          chatContainerRef={chatContainerRef}
          userMessage={userMessage}
        />

        <ExampleList
          examples={examples}
          isLoading={isLoading}
          handleExampleClick={handleExampleClick}
          handleScroll={handleScroll}
        />

        <div className="h-28 w-full flex items-center bg pb-2">
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

      <div className="w-full max-w-5xl ml-1 h-[97vh] bg-secondary md:rounded-xl shadow-xl overflow-auto vertical-scrollbar flex-1">
        <h1 className="text-center text-secondaryLight text-lg h-16 flex items-center justify-center">
          คู่ถาม-ตอบ
        </h1>
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
        {botResponses.map((response, index) => (
          <BotContextInfo key={index} response={response} />
        ))}
      </div>
    </div>
  );
}

export default ChatBox;
