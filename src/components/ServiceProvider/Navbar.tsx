import React from "react"


interface NavbarProps{
    profile:string,
    
}
const Navbar:React.FC<NavbarProps> = ({profile}) => {

        return (
    <div>
      <div className="navbar bg-primary     shadow-lg">
      <div className="navbar-start">
      
        
        <a className="btn btn-ghost text-xl  font-serif  text-primary-content">ServEasy</a>
         
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="font-medium ">Home</a></li>
          <li>
          <details>
                <summary className="font-medium">Services</summary>
                <ul className="p-2 bg-base-100">
                  <li><a>Add New Services</a></li>
                  <li><a> Edit  Services </a></li>
                  <li><a>Enable/Disable</a></li>
                </ul>
              </details>
          </li>
          <li><a className="font-medium"> Service Management</a></li>
            <li><a className="font-medium">Booking </a></li>
            <li><a className="font-medium">Contact</a></li>
        </ul>
      </div>
      <div className="flex-none ml-20">
    

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-16 rounded-full">
          <img
            alt="profile Image"
            src={profile} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
   
    
    
      </div>
    </div>
  )
   
}

export default Navbar
