function ExampleList({
  examples,
  isLoading,
  handleExampleClick,
  handleScroll,
}) {
  return (
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
          onClick={!isLoading ? () => handleExampleClick(example) : undefined}
        >
          {example}
        </h1>
      ))}
    </ul>
  );
}

export default ExampleList;
