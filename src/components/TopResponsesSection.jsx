/* eslint-disable react/prop-types */
import BotContextInfo from "./BotContextInfo";

const TopResponsesSection = ({ botResponses, selectedChatType }) => {
  // console.log("selectedChatType in TopResponsesSection:", selectedChatType);
  return (
    <div className="w-full max-w-5xl ml-1 h-[95dvh] bg-secondary md:rounded-xl shadow-xl overflow-auto vertical-scrollbar flex-1">
      <h1 className="text-center text-secondaryLight lg:text-lg h-16 flex items-center justify-center">
        คู่ถาม-ตอบที่ใกล้เคียง 5 อันดับแรก
      </h1>
      <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
      {botResponses.map((response, index) => (
        <BotContextInfo
          key={index}
          response={response}
          selectedChatType={selectedChatType}
        />
      ))}
    </div>
  );
};

export default TopResponsesSection;
