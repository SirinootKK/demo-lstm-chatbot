import MdeBERta from "./pages/MdeBERTa.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WangchanBERTa from "./pages/WangchanBERTa.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/chatwangchanberta" replace />}
        />
        <Route path="/chatmdeberta" element={<MdeBERta />} />
        <Route path="/chatwangchanberta" element={<WangchanBERTa />} />
      </Routes>
    </Router>
  );
}

export default App;
