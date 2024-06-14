import Admin from "./Component/Admin";
import Home from "./Component/Home";
import UserLogin from "./Component/UserLogin";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const login = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {!login && <Route path="/" element={<UserLogin />} />}
        {login && <Route path="/" element={<Home />} />}
        {login && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
