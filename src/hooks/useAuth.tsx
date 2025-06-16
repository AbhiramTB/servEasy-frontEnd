export const useAuth = () => {
  const userAccessToken = localStorage.getItem("accessToken");
  const adminAccessToken = localStorage.getItem("adminToken");

  return { userAccessToken, adminAccessToken };
};
