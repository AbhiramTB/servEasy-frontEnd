import AuthPage from "./components/User/AuthModel/SignInSignUp/SignInSingUp";
import Home from "./components/User/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Otp from "./components/User/AuthModel/Otp";
// import Sample from "./components/Sample/Sample";
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
          <Route  path="/dev" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
