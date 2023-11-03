import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginScreen from "./screens/login";
import PostCar from "./screens/postCar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { token_key } from "./constants";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem(token_key);
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location.pathname]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<PostCar />} />
      </Routes>
    </>
  );
}

export default App;
