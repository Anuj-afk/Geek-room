import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"; // Import the CSS
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="Geek-room/login" element={<Login />} />
      <Route path="Geek-room/register" element={<Register />} />
    </Routes>
  );
};

export default App;
