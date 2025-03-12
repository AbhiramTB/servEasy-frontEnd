import AuthPage from "./components/User/AuthModel/SignInSignUp/SignInSingUp";
import Home from "./components/User/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Otp from "./components/User/AuthModel/Otp";
import Register from "./components/ServiceProvider/Register.tsx";
import AdminSignIn from "../src/components/admin/auth/Sigin.tsx" 
import AdminHome from "../src/components/admin/Home.tsx" 
import UserListingPage from "../src/components/admin/UserListingPage.tsx" 
import Sample from "./sample.tsx";
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
           
            <Route path="/register" element={<Register/>}>

           </Route>

          </Route>
          
          <Route path="/service-provider">
          

          </Route >

          <Route path="/admin">
          <Route path="/admin/sigin" element={<AdminSignIn/>}/>

          <Route path="/admin/home" element={<AdminHome/>}/>
          <Route path="/admin/Users" element={<UserListingPage/>}/>

          
          </Route >

          <Route path="/Test" element={<Sample/>}>

          </Route>
        </Routes>

        
      </BrowserRouter>
    </>
  );
}

export default App;
