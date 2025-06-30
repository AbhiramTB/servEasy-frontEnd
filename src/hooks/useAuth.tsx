export const useAuth = () => {
  const userAccessToken = localStorage.getItem("accessToken");
  console.log(userAccessToken);
  
  const adminAccessToken = localStorage.getItem("adminToken");
  
  return { userAccessToken, adminAccessToken };
};
