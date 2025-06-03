import { Outlet } from "react-router-dom"
import Navbar from "../components/User/Navbar"
import Footer from "../components/ui/Footer"

const Body = () => {
  return (
    <div>
<Navbar/>
<Outlet/>
<Footer/>      
    </div>
  )
}

export default Body
