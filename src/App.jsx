import MdeBERta from "./pages/MdeBERTa.jsx";
// import { Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WangchanBERTa from "./pages/WangchanBERTa.jsx";
// import SemanticMde from "./pages/SemanticMde.jsx";

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
        <Route path="/chatmdeberta" element={<MdeBERta />} />
        <Route path="/chatwangchanberta" element={<WangchanBERTa />} />
        {/* <Route path="/semantic/chatwangchanberta" element={<SemanticMde />} /> */}
        {/* <Route path="/chatwangchanberta" element={<WangchanBERTa />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
