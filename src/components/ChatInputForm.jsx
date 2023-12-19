/* eslint-disable react/prop-types */
import { Input } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";

const ChatInputForm = ({ userMessage, isLoading, onChange, onSubmit }) => {
  return (
    <div className="h-28 w-full flex items-center bg pb-2">
      <form
        onSubmit={onSubmit}
        className="flex w-full h-fit relative px-6 md:px-12"
      >
        <Input
          type="text"
          value={userMessage}
          className="w-full flex rounded-xl p-4 bg-primaryLight shadow-2xl text-white outline-none"
          onChange={onChange}
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
  );
};

export default ChatInputForm;
