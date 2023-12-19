/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Navbar({ selectedChatType, handleChatTypeChange }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Link
          to="/chatmdeberta"
          className={`${
            selectedChatType === "ChatmDeBERTa"
              ? "bg-primaryLight text-white"
              : "text-secondaryLight"
          } font-semibold text-lg h-16 flex items-center justify-center p-2 mr-4 rounded-lg`}
          onClick={() => handleChatTypeChange("ChatmDeBERTa")}
        >
          ChatmDeBERTa
        </Link>
        <Link
          to="/chatwangchanberta"
          className={`${
            selectedChatType === "ChatWangchanBERTa"
              ? "bg-primaryLight text-white"
              : "text-secondaryLight"
          } font-semibold text-lg h-16 flex items-center justify-center p-2 rounded-lg`}
          onClick={() => handleChatTypeChange("ChatWangchanBERTa")}
        >
          ChatWangchanBERTa
        </Link>
      </div>
      <div className="h-[2px] bg-primary border-0 w-full shadow-xl" />
    </div>
  );
}

export default Navbar;
