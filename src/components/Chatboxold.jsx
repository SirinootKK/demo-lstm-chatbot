import { useState, useEffect, useRef } from "react";
import { userImg, botImg } from "./images/index.js";
import ChatOptions from "./ChatOptions.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";

function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [selectedChatOption, setSelectedChatOption] = useState("ChatLSTM");
  const [chatLSTMUserMessage, setChatLSTMUserMessage] = useState("");
  const [chatLSTMResponses, setChatLSTMResponses] = useState([]);

  const [chatMDeBERTaUserMessage, setChatMDeBERTaUserMessage] = useState("");
  const [chatMDeBERTaResponses, setChatMDeBERTaResponses] = useState([]);

  const [chatWangchanBERTaUserMessage, setChatWangchanBERTaUserMessage] =
    useState("");
  const [chatWangchanBERTaResponses, setChatWangchanBERTaResponses] = useState(
    []
  );
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [
    botResponses,
    chatLSTMResponses,
    chatMDeBERTaResponses,
    chatWangchanBERTaResponses,
  ]);

  const handleScroll = (e) => {
    const strength = Math.abs(e.deltaY);

    if (e.deltaY === 0) return;

    const el = e.currentTarget;

    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      behavior: strength > 70 ? "auto" : "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage) return;
    setUserMessage("");
    setIsLoading(true);

    let apiEndpoint = "";

    switch (selectedChatOption) {
      case "ChatLSTM":
        apiEndpoint = "/api/get_response";
        setChatLSTMUserMessage(userMessage);
        break;
      case "ChatmDeBERTa":
        apiEndpoint = "/api/get_response_mde";
        setChatMDeBERTaUserMessage(userMessage);
        break;
      case "ChatwangchanBERTa":
        apiEndpoint = "/api/get_response_wc";
        setChatWangchanBERTaUserMessage(userMessage);
        break;
      default:
        apiEndpoint = "/api/get_response";
    }
    const userMessageData = { message: userMessage, isUserMessage: true };
    setBotResponses((prevResponses) => [...prevResponses, userMessageData]);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMessageData),
      });
      const data = await response.json();
      switch (selectedChatOption) {
        case "ChatLSTM":
          setChatLSTMResponses((prevResponses) => [
            ...prevResponses,
            { message: userMessage, isUserMessage: true },
            { message: data.response, isUserMessage: false },
          ]);
          break;
        case "ChatmDeBERTa":
          setChatMDeBERTaResponses((prevResponses) => [
            ...prevResponses,
            { message: userMessage, isUserMessage: true },
            { message: data.response, isUserMessage: false },
          ]);
          break;
        case "ChatwangchanBERTa":
          setChatWangchanBERTaResponses((prevResponses) => [
            ...prevResponses,
            { message: userMessage, isUserMessage: true },
            { message: data.response, isUserMessage: false },
          ]);
          break;
        default:
          setChatLSTMResponses((prevResponses) => [
            ...prevResponses,
            { message: userMessage, isUserMessage: true },
            { message: data.response, isUserMessage: false },
          ]);
          break;
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      window.alert("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (e) => {
    setUserMessage(e);
  };

  const examples = [
    "มีข้อมูลสำหรับนิสิตปริญญาตรีในการทำการวิจัยหรือเปล่า",
    "จุดเด่นของหน้า Dashboard ของ IQ360 Basic คืออะไร",
    "NCX ครอบคลุมแหล่งอะไร",
    "ที่อยู่บริษัท",
    "บริษัทฯ ให้บริการอะไรบ้าง",
    "DXT360 มีข้อมูลจากแหล่งข้อมูลอะไรบ้าง",
    "มีบริการฐานข้อมูลราคาพิเศษสำหรับนักศึกษาเพื่อใช้ทำวิจัยหรือไม่",
    "Page Rank ของ Online Media คืออะไร",
  ];

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="w-full max-w-5xl h-full md:m-4 md:h-[90vh] bg-secondary md:rounded-xl shadow-xl flex flex-col">
        <ChatOptions
          selectedChatOption={selectedChatOption}
          setSelectedChatOption={setSelectedChatOption}
          isLoading={isLoading}
        />
        <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
        <ChatMessages
          botResponses={
            selectedChatOption === "ChatLSTM"
              ? chatLSTMResponses
              : selectedChatOption === "ChatmDeBERTa"
              ? chatMDeBERTaResponses
              : selectedChatOption === "ChatwangchanBERTa"
              ? chatWangchanBERTaResponses
              : []
          }
          userImg={userImg}
          botImg={botImg}
          chatContainerRef={chatContainerRef}
          selectedChatOption={selectedChatOption}
          userMessage={
            selectedChatOption === "ChatLSTM"
              ? chatLSTMUserMessage
              : selectedChatOption === "ChatmDeBERTa"
              ? chatMDeBERTaUserMessage
              : selectedChatOption === "ChatwangchanBERTa"
              ? chatWangchanBERTaUserMessage
              : ""
          }
        />
        <ul
          className={`flex h-[85px] px-8 w-full overflow-y-hidden items-center gap-x-2 select-none ${
            !isLoading
              ? "horizontal-scrollbar overflow-x-scroll sm:overflow-x-hidden hover:overflow-x-scroll"
              : "overflow-x-hidden"
          }`}
          onWheel={!isLoading ? (e) => handleScroll(e) : undefined}
        >
          {examples.map((example, index) => (
            <h1
              key={index}
              className={`bg-primaryLight bg-opacity-50 whitespace-nowrap text-white text-sm py-2 px-4 rounded-xl flex items-center flex-nowrap w-full h-fit cursor-pointer ${
                !isLoading ? "hover:bg-secondaryLight hover:bg-opacity-50" : ""
              }`}
              onClick={
                !isLoading ? () => handleExampleClick(example) : undefined
              }
            >
              {example}
            </h1>
          ))}
        </ul>
        <ChatInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          setBotResponses={setBotResponses}
        />
      </div>
    </div>
  );
}

export default ChatBox;
