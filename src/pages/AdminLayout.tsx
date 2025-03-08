import { Outlet } from "react-router-dom"
import Navbar from "../components/admin/NavBar"

const AdminLayout = () => {
  return (
    <div>
<Navbar />
<Outlet/>      
    </div>
  )
}

export default AdminLayout
