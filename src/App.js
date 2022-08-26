import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodoList from "./TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
