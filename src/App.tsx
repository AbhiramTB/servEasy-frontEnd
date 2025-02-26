import AuthPage from "./components/AuthModel/SignInSingUp";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Otp from "./components/AuthModel/Otp";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<AuthPage />} />
            <Route path="/otp" element={<Otp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
