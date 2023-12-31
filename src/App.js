import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./component/ChangePassword";
import CurrentPost from "./component/CurrentPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/editProfile" element={<EditProfile/>} />
        <Route path="/changePassword" element={<ChangePassword/>}/>
        <Route path="/currPost" element={<CurrentPost/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
