import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Settings from "./components/settings/Settings";
import Notifications from "./components/notifications/Notifications";
import Privacy from "./components/privacy/Privacy";

const App = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <Toaster />
      {path === "/" && <Header /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/chat" element={<Chat />} />
      </Routes>
      {path === "/" && <Footer />}
    </div>
  );
};

export default App;
