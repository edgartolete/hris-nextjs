export const useAuth = () => {
  const isAuthenticated = true

  const login = () => {
    console.log("login");
  };

  const logout = () => {
    console.log("logout");
  };

  return { login, logout, isAuthenticated };
};
