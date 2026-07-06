import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { TodoPage } from "../pages/TodoPage";
import { Page404 } from "../components/todo/states";

function NotFoundRoute() {
  const navigate = useNavigate();

  return <Page404 onHome={() => navigate("/")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
