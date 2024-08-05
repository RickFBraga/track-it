import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Hoje from "./pages/Hoje";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { UserProvider } from "./contexts/UserContext";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route element={<Login setToken={setToken} />} path="/" />
          <Route element={<Cadastro />} path="/cadastro" />
          <Route element={<Home token={token} />} path="/home" />
          <Route element={<Hoje token={token} />} path="/hoje" />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
