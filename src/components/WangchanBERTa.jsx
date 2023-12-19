/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Input } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";
import ChatMessages from "./ChatMessages.jsx";
import ExampleList from "./ExampleList.jsx";
import TopResponsesSection from "./TopResponsesSection.jsx";
import Navbar from "./Navbar.jsx";

function WangchanBERTa() {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [selectedChatType, setSelectedChatType] = useState("ChatWangchanBERTa");
  const chatContainerRef = useRef(null);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botResponses]);

  const handleChatTypeChange = (chatType) => {
    setUserMessage("");
    setSelectedChatType(chatType);

    if (chatType === "ChatmDeBERTa") {
      window.location.href = "/chatmdeberta";
    } else if (chatType === "ChatWangchanBERTa") {
      window.location.href = "/chatwangchanberta";
    }
  };

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
    setIsLoading(true);

    const apiEndpoint = "/api/get_response_wc";

    setBotResponses((prevResponses) => [
      ...prevResponses,
      { message: userMessage, isUserMessage: true },
    ]);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      console.log("API Response:", data);
      console.log("sim context", <data className="simitar_context"></data>);

      setBotResponses((prevResponses) => [
        ...prevResponses,
        {
          message: data.response,
          isUserMessage: false,
          simitar_context: data.simitar_context,
          distance: data.distance,
          allDistance: data.distances,
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
    <div className="h-[100dvh] w-full overflow-hidden bg-primary flex p-4 justify-center items-center">
      <div className="w-full md:max-w-5xl max-w-4xl h-[95dvh] bg-secondary md:rounded-xl rounded-lg shadow-xl flex flex-col">
        <Navbar
          selectedChatType={selectedChatType}
          handleChatTypeChange={handleChatTypeChange}
        />

        <ChatMessages
          botResponses={botResponses}
          chatContainerRef={chatContainerRef}
          userMessage={userMessage}
          selectedChatType={selectedChatType}
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
            className="flex w-full h-fit relative px-6 md:px-12"
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

      <TopResponsesSection botResponses={botResponses} />
    </div>
  );
}

export default WangchanBERTa;
