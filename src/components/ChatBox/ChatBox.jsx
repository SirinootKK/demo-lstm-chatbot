import { useState, useEffect, useRef } from "react";
import { Input } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";
import ChatMessages from "./ChatMessage.jsx";
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
    // Effect สำหรับ scroll ลงมาด้านล่างของ chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botResponses]);

  const handleScroll = (e) => {
    // Function สำหรับ handle scrolling
    const strength = Math.abs(e.deltaY);

    if (e.deltaY === 0) return;

    const el = e.currentTarget;

    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      behavior: strength > 70 ? "auto" : "smooth",
    });
  };

  const handleExampleClick = (e) => {
    // Function สำหรับ handle click ที่ตัวอย่าง
    setUserMessage(e);
  };

  const handleSubmit = async (e) => {
    // Function สำหรับ handle submit form
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
          probability: data.probability,
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
    <div className="flex flex-row justify-center items-center h-full w-full bg-primary">
      <div className="w-full max-w-5xl h-full md:m-2 md:h-[70vh] bg-secondary md:rounded-xl shadow-xl flex flex-col flex-shrink-0">
        {/* ... ส่วนหัว ChatBox */}
        <h1 className="text-center font-semibold text-secondaryLight mb-2 mt-3 text-lg h-16 flex items-center justify-center">
          {isLoading ? (
            <h1 className="text-lightPurple">Loading...</h1>
          ) : (
            "ChatmDeBERTa"
          )}
        </h1>
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />

        {/* ส่วนของ Chat Messages */}
        <ChatMessages
          botResponses={botResponses}
          chatContainerRef={chatContainerRef}
          userMessage={userMessage}
        />

        {/* ส่วนของรายการตัวอย่าง */}
        <ExampleList
          examples={examples}
          isLoading={isLoading}
          handleExampleClick={handleExampleClick}
          handleScroll={handleScroll}
        />

        {/* ส่วนของ input form และ button submit */}
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

            {/* Button สำหรับ submit ข้อความ */}
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

      {/* ส่วนของ Bot Context Information */}
      <div className="w-full max-w-5xl h-full md:m- md:h-[40vh] bg-secondary md:rounded-xl shadow-xl overflow-auto vertical-scrollbar">
        {botResponses.map((response, index) => (
          <BotContextInfo key={index} response={response} />
        ))}
      </div>
    </div>
  );
}

export default ChatBox;