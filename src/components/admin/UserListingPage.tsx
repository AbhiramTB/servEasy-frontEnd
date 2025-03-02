import React, { useState } from 'react';

const UserListingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Sample user data
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '+1 (555) 123-4567', initials: 'SJ', status: 'Active' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', phone: '+1 (555) 234-5678', initials: 'MC', status: 'Active' },
    { id: 3, name: 'Jessica Williams', email: 'jessica.w@example.com', phone: '+1 (555) 345-6789', initials: 'JW', status: 'Active' },
    { id: 4, name: 'David Rodriguez', email: 'david.r@example.com', phone: '+1 (555) 456-7890', initials: 'DR', status: 'Active' },
    { id: 5, name: 'Emma Thompson', email: 'emma.t@example.com', phone: '+1 (555) 567-8901', initials: 'ET', status: 'Active' },
    { id: 6, name: 'Alexander Kim', email: 'alex.kim@example.com', phone: '+1 (555) 678-9012', initials: 'AK', status: 'Active' },
    { id: 7, name: 'Olivia Martinez', email: 'olivia.m@example.com', phone: '+1 (555) 789-0123', initials: 'OM', status: 'Active' },
    { id: 8, name: 'James Wilson', email: 'james.w@example.com', phone: '+1 (555) 890-1234', initials: 'JW', status: 'Active' },
  ];

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-900', 'bg-green-900', 'bg-purple-900', 'bg-red-900', 
      'bg-amber-900', 'bg-indigo-900', 'bg-pink-900', 'bg-teal-900'
    ];
    
    const textColors = [
      'text-blue-300', 'text-green-300', 'text-purple-300', 'text-red-300',
      'text-amber-300', 'text-indigo-300', 'text-pink-300', 'text-teal-300'
    ];
    
    // Use the sum of character codes in the name to deterministically select a color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % colors.length;
    
    return {
      bg: colors[colorIndex],
      text: textColors[colorIndex]
    };
  };

  const handleBlockUser = (userId: number) => {
    // Implement block user functionality
    console.log(`Blocking user with ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and primary nav */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="flex space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600">Users</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Products</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Analytics</a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Settings</a>
                </div>
              </div>
            </div>

            {/* Right side nav - profile, notifications, etc */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <input type="text" className="bg-gray-700 rounded px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-40" placeholder="Search users..." />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute right-2 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notification bell */}
              <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-300 font-medium">JD</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, toggle based on state */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600">Users</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Products</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Analytics</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Settings</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-300 font-medium">JD</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">John Doe</div>
                <div className="text-sm font-medium text-gray-400">john@example.com</div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="mt-1 text-gray-400">Manage your user accounts from here.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New User
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* User cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {users.map(user => {
            const colorScheme = getRandomColor(user.name);
            return (
              <div key={user.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-md">
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className={`h-12 w-12 rounded-full ${colorScheme.bg} flex items-center justify-center`}>
                      <span className={`${colorScheme.text} font-medium text-lg`}>{user.initials}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                        {user.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">{user.email}</span>
                    </div>
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-300">{user.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-700">
                  <button className="flex-1 py-3 text-gray-300 hover:bg-gray-700 transition-colors duration-200 ease-in-out text-sm font-medium">
                    View Profile
                  </button>
                  <button 
                    onClick={() => handleBlockUser(user.id)}
                    className="flex-1 py-3 text-red-400 hover:bg-gray-700 transition-colors duration-200 ease-in-out text-sm font-medium flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    Block
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> users
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-blue-400 hover:bg-gray-700">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
                  ...
                </span>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserListingPage;








// import React, { useState } from 'react';

// // Extended user type with additional information
// interface UserDetails {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   initials: string;
//   status: string;
//   // Additional fields for detailed view
//   role: string;
//   department: string;
//   location: string;
//   joinDate: string;
//   lastActive: string;
//   accountType: string;
//   profileImage?: string;
//   twoFactorEnabled: boolean;
//   activity: {
//     date: string;
//     action: string;
//   }[];
// }

// // Sample extended user data
// const extendedUsers: UserDetails[] = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@example.com',
//     phone: '+1 (555) 123-4567',
//     initials: 'SJ',
//     status: 'Active',
//     role: 'Product Manager',
//     department: 'Product',
//     location: 'New York, USA',
//     joinDate: '2021-05-12',
//     lastActive: '2025-03-01',
//     accountType: 'Admin',
//     twoFactorEnabled: true,
//     activity: [
//       { date: '2025-03-01', action: 'Updated profile information' },
//       { date: '2025-02-28', action: 'Created new project "Dashboard Redesign"' },
//       { date: '2025-02-25', action: 'Commented on Task #1342' }
//     ]
//   },
//   // More users would be defined here
// ];

// interface UserInfoProps {
//   userId: number;
//   onClose: () => void;
// }

// const UserInfoComponent: React.FC<UserInfoProps> = ({ userId, onClose }) => {
//   const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'security'>('overview');
  
//   // Find the user with the matching ID
//   const user = extendedUsers.find(u => u.id === userId) || extendedUsers[0];
  
//   // Function to format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };
  
//   const getColorScheme = (name: string) => {
//     const colors = [
//       'bg-blue-900', 'bg-green-900', 'bg-purple-900', 'bg-red-900', 
//       'bg-amber-900', 'bg-indigo-900', 'bg-pink-900', 'bg-teal-900'
//     ];
    
//     const textColors = [
//       'text-blue-300', 'text-green-300', 'text-purple-300', 'text-red-300',
//       'text-amber-300', 'text-indigo-300', 'text-pink-300', 'text-teal-300'
//     ];
    
//     // Use the sum of character codes in the name to deterministically select a color
//     const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
//     const colorIndex = charSum % colors.length;
    
//     return {
//       bg: colors[colorIndex],
//       text: textColors[colorIndex]
//     };
//   };
  
//   const colorScheme = getColorScheme(user.name);
  
//   const statusBadgeStyle = user.status === 'Active' 
//     ? 'bg-green-900/30 text-green-400' 
//     : 'bg-red-900/30 text-red-400';
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
//         {/* Header with close button */}
//         <div className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
//           <h2 className="text-xl font-semibold text-white">User Information</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-white"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* User Header */}
//         <div className="p-6 border-b border-gray-700 flex items-center">
//           <div className={`h-16 w-16 rounded-full ${colorScheme.bg} flex items-center justify-center`}>
//             <span className={`${colorScheme.text} font-medium text-xl`}>{user.initials}</span>
//           </div>
//           <div className="ml-5">
//             <h3 className="text-2xl font-bold text-white">{user.name}</h3>
//             <div className="flex items-center space-x-3 mt-1">
//               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeStyle}`}>
//                 {user.status}
//               </span>
//               <span className="text-gray-400">{user.role}</span>
//               <span className="text-gray-500">•</span>
//               <span className="text-gray-400">{user.department}</span>
//             </div>
//           </div>
//           <div className="ml-auto space-x-2">
//             <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//               </svg>
//               Edit
//             </button>
//             <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//               Message
//             </button>
//           </div>
//         </div>
        
//         {/* Tabs */}
//         <div className="border-b border-gray-700">
//           <nav className="flex">
//             <button 
//               onClick={() => setActiveTab('overview')}
//               className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
//             >
//               Overview
//             </button>
//             <button 
//               onClick={() => setActiveTab('activity')}
//               className={`px-4 py-3 text-sm font-medium ${activeTab === 'activity' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
//             >
//               Activity
//             </button>
//             <button 
//               onClick={() => setActiveTab('security')}
//               className={`px-4 py-3 text-sm font-medium ${activeTab === 'security' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
//             >
//               Security
//             </button>
//           </nav>
//         </div>
        
//         {/* Content */}
//         <div className="p-6 overflow-y-auto">
//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-400 mb-2">Contact Information</h4>
//                   <div className="bg-gray-900 rounded-lg p-4 space-y-3">
//                     <div className="flex">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-gray-300">{user.email}</span>
//                     </div>
//                     <div className="flex">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       <span className="text-gray-300">{user.phone}</span>
//                     </div>
//                     <div className="flex">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       <span className="text-gray-300">{user.location}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-400 mb-2">Account Details</h4>
//                   <div className="bg-gray-900 rounded-lg p-4">
//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <div className="text-xs text-gray-500">Join Date</div>
//                         <div className="text-gray-300">{formatDate(user.joinDate)}</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-500">Last Active</div>
//                         <div className="text-gray-300">{formatDate(user.lastActive)}</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-500">Account Type</div>
//                         <div className="text-gray-300">{user.accountType}</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-500">2FA Status</div>
//                         <div className={user.twoFactorEnabled ? "text-green-400" : "text-red-400"}>
//                           {user.twoFactorEnabled ? "Enabled" : "Disabled"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-400 mb-2">Permissions</h4>
//                   <div className="bg-gray-900 rounded-lg p-4">
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">View Dashboard</span>
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400">
//                           Granted
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Manage Users</span>
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400">
//                           Granted
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Edit Products</span>
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400">
//                           Granted
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">View Analytics</span>
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400">
//                           Granted
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Modify System Settings</span>
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/30 text-red-400">
//                           Denied
//                         </span>
//                       </div>
//                     </div>
//                     <button className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded flex items-center justify-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                       Edit Permissions
//                     </button>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-400 mb-2">Notes</h4>
//                   <div className="bg-gray-900 rounded-lg p-4">
//                     <div className="text-gray-300 text-sm">
//                       Team lead for the products division. Responsible for quarterly roadmap planning. Key stakeholder for the dashboard redesign project.
//                     </div>
//                     <button className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded flex items-center justify-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                       Edit Notes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'activity' && (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="text-sm font-medium text-gray-400">Recent Activity</h4>
//                 <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
//               </div>
//               <div className="space-y-4">
//                 {user.activity.map((item, index) => (
//                   <div key={index} className="bg-gray-900 rounded-lg p-4 flex">
//                     <div className="bg-blue-900/30 h-10 w-10 rounded-full flex items-center justify-center mr-4">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <div className="text-gray-300">{item.action}</div>
//                       <div className="text-gray-500 text-sm">{formatDate(item.date)}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'security' && (
//             <div className="space-y-6">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-400 mb-3">Two-Factor Authentication</h4>
//                 <div className="bg-gray-900 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-white font-medium">Two-Factor Authentication</div>
//                       <div className="text-gray-400 text-sm mt-1">
//                         {user.twoFactorEnabled 
//                           ? "Two-factor authentication is currently enabled." 
//                           : "Enable two-factor authentication for enhanced security."}
//                       </div>
//                     </div>
//                     <div className={`px-3 py-1.5 rounded font-medium text-sm ${user.twoFactorEnabled ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
//                       {user.twoFactorEnabled ? "Enabled" : "Disabled"}
//                     </div>
//                   </div>
//                   <button className={`mt-4 w-full py-2 text-sm font-medium rounded flex items-center justify-center ${user.twoFactorEnabled ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'}`}>
//                     {user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
//                   </button>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-sm font-medium text-gray-400 mb-3">Password</h4>
//                 <div className="bg-gray-900 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-white font-medium">Change Password</div>
//                       <div className="text-gray-400 text-sm mt-1">
//                         Last changed 45 days ago
//                       </div>
//                     </div>
//                   </div>
//                   <button className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                     Change Password
//                   </button>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="text-sm font-medium text-gray-400 mb-3">Login Sessions</h4>
//                 <div className="bg-gray-900 rounded-lg p-4">
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <div className="bg-green-900/30 h-10 w-10 rounded-full flex items-center justify-center mr-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                       <div className="flex-grow">
//                         <div className="flex justify-between">
//                           <div className="text-white font-medium">Current Session</div>
//                           <div className="text-green-400 text-sm">Active Now</div>
//                         </div>
//                         <div className="text-gray-400 text-sm mt-1">
//                           Windows 11 • Chrome • New York, USA
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start">
//                       <div className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center mr-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                       <div className="flex-grow">
//                         <div className="flex justify-between">
//                           <div className="text-white font-medium">Mobile Session</div>
//                           <div className="text-gray-400 text-sm">2 hours ago</div>
//                         </div>
//                         <div className="text-gray-400 text-sm mt-1">
//                           iOS 16 • Mobile Safari • Boston, USA
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <button className="mt-4 w-full py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 text-sm font-medium rounded flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
//                     Logout of All Sessions
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Footer actions */}
//         <div className="border-t border-gray-700 p-4 flex justify-end space-x-3 mt-auto">
//           <button 
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded"
//           >
//             Close
//           </button>
//           <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-medium rounded flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//             </svg>
//             Suspend Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // This is how you would use the component in your UserListingPage
// const UserListingPageWithDetails: React.FC = () => {
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
//   const viewUserDetails = (userId: number) => {
//     setSelectedUserId(userId);
//   };
  
//   const closeUserDetails = () => {
//     setSelectedUserId(null);
//   };
  
//   // Inside your existing component, modify the "View Profile" button to:
//   // onClick={() => viewUserDetails(user.id)}
  
//   return (
//     <div>
//       {/* Your existing UserListingPage code here */}
      
//       {/* Render the UserInfoComponent when a user is selected */}
//       {selectedUserId !== null && (
//         <UserInfoComponent userId={selectedUserId} onClose={closeUserDetails} />
//       )}
//     </div>
//   );
// };

// export default UserListingPageWithDetails;