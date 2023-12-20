/* eslint-disable react/prop-types */

function ExampleList({ isLoading, handleExampleClick, handleScroll }) {
  const examples = [
    "NCX ครอบคลุมแหล่งข้อมูลอะไรบ้าง",
    "NCX ครอบคลุมแหล่งอะไร",
    "ระบบไม่สามารถเข้าใช้งานได้",
    "ระบบใช้งานไม่ได้",
    "บริษัทฯ ให้บริการอะไรบ้าง",
    "DXT360 มีข้อมูลจากแหล่งข้อมูลอะไรบ้าง",
    "มีบริการฐานข้อมูลราคาพิเศษสำหรับนักศึกษาเพื่อใช้ทำวิจัยหรือไม่",
    "Page Rank ของ Online Media คืออะไร",
  ];

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
        <li
          key={index}
          className={`bg-primaryLight bg-opacity-50 whitespace-nowrap text-white text-sm py-2 px-4 rounded-xl flex items-center flex-nowrap w-full h-fit cursor-pointer ${
            !isLoading ? "hover:bg-secondaryLight hover:bg-opacity-50" : ""
          }`}
          onClick={!isLoading ? () => handleExampleClick(example) : undefined}
        >
          {example}
        </li>
      ))}
    </ul>
  );
}

export default ExampleList;
