import { Outlet } from "react-router-dom"
import Navbar from "../components/admin/NavBar"
import { useTheme } from "../hooks/useTheme"

const AdminLayout = () => {
  useTheme()
  return (
    <div>
<Navbar />
<Outlet/>      
    </div>
  )
}

export default AdminLayout
