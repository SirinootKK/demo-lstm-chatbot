import { useState, useEffect, useRef } from "react";
import { Input } from "@material-tailwind/react";
import { userImg, botImg } from "./images/index.js";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [examples] = useState([
    "NCX ครอบคลุมแหล่งข้อมูลอะไรบ้าง",
    "จุดเด่นของหน้า Dashboard ของ IQ360 Basic คืออะไร",
    "บริการของบริษัทมีอะไรบ้าง",
    "สัญญาจ้างขั้นต่ำกี่เดือน",
    "สัญญาการรับบริการขั้นต่ำกี่เดือน",
    "รับทำ Crisis หรือไม่",
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

    if (
      !(el.scrollLeft === 0 && e.deltaY < 0) &&
      !(
        el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
        e.deltaY > 0
      )
    ) {
      e.preventDefault();
    }

    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      behavior: strength > 70 ? "auto" : "smooth",
    });
  };

  const handleExampleClick = (example) => {
    setUserMessage(example);
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
          {isLoading ? (
            <h1 className="text-lightPurple">Loading...</h1>
          ) : (
            "ChatLSTM"
          )}
        </h1>
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
        <div
          className="flex-grow overflow-auto vertical-scorllbar h-full"
          ref={chatContainerRef}
        >
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
        <ul
          className="flex h-28 pl-6 w-full horizontal-scorllbar overflow-x-scroll sm:overflow-x-hidden hover:overflow-x-scroll overflow-y-hidden items-center gap-x-2 select-none"
          onWheel={handleScroll}
        >
          {examples.map((example, index) => (
            <h1
              key={index}
              onClick={() => handleExampleClick(example)}
              className="bg-primaryLight whitespace-nowrap text-white text-sm p-2 rounded-md flex items-center flex-nowrap w-full h-fit"
            >
              {example}
            </h1>
          ))}
        </ul>
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
    </div>
  );
}

export default ChatBox;
