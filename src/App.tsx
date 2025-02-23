import "./App.css";
import AuthPage from "./components/AuthModel/SignInSingUp";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
