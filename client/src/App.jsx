import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

const App = () => {
  const path = useLocation().pathname;
  return (
    <div>
      
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/chat" element={<Chat />} />
        </Routes>
        {path !== "/chat" && <Footer/>}
      
    </div>
  );
};

export default App;
