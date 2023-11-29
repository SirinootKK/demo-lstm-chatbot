function BotContextInfo({ response }) {
  return (
    <div className="flex flex-col items-start px-[40px] md:px-[72px] py-1 text-white">
      {response.simitar_context &&
        response.simitar_context.map((item, idx) => (
          <div
            key={idx}
            className={`pt-2 ${item.includes("          ") ? "mb-2" : ""}`}
          >
            {item.split(/\s{2,}/).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
      {response.simitar_context && (
        <div className="h-[1px] bg-white border-0 w-full shadow-xl" />
      )}
    </div>
  );
}

export default BotContextInfo;
