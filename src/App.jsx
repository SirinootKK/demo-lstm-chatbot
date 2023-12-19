import ChatBox from "./components/ChatBox.jsx";
// import { Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WangchanBERTa from "./components/WangchanBERTa.jsx";

function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Navigate to="/chatmdeberta" replace />} />
        <Route path="/chatmdeberta" element={<ChatBox />} />
        <Route path="/chatwangchanberta" element={<WangchanBERTa />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<Navigate to="/chatmdeberta" replace />} />
        <Route path="/chatmdeberta" element={<ChatBox />} />
        <Route path="/chatwangchanberta" element={<WangchanBERTa />} />
      </Routes>
    </Router>
  );
}

export default App;
