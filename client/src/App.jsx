import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";


// import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            <Navigate to="/"  />
          }
        /> */}

   <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/chat"
          element={<ChatPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;