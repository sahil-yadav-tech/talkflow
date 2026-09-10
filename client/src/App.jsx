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


// import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/login" replace />
          }
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