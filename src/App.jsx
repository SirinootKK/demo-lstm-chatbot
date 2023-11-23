import ChatBox from "./components/ChatBox.jsx";

function App() {
  return <ChatBox />;
}

export default App;
// import ChatBox from "./components/ChatBox/ChatBox.jsx";
// import { useState, useEffect } from "react";

// function App() {
//   const [api, setApi] = useState("get_response_mde");

//   useEffect(() => {
//     // ตรวจสอบว่า api มีค่า "get_response_mde" หรือ "wangchanberta"
//     // และตั้งค่าให้ ChatBox ในทุกครั้งที่ api เปลี่ยนแปลง
//     console.log("API has changed:", api);
//   }, [api]);

//   return <ChatBox api={api} />;
// }

// export default App;
