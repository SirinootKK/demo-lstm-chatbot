/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Navbar({ selectedChatType, handleChatTypeChange }) {
  return (
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
        to="/wangchanberta"
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
  );
}

export default Navbar;
