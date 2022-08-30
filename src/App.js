import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodoList from "./TodoList";
import { AuthContext } from "./components/Context.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);
  const API_URL = `https://todoo.5xcamp.us/`;
  return (
    <HashRouter>
      <AuthContext.Provider value={{ token, setToken, API_URL }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  );
};

export default App;
