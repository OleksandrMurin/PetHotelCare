import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const connectionAPIString ="http://localhost:5263"
//   useEffect(() => {
//     // Проверяем, есть ли токен в локальном хранилище при загрузке приложения
//     if () {
//       axios.get('${connectionAPIString}/api/Account/GetUser', {
//       })
//       .then(response => {
//         setUser(response.data);
//         setIsAuthenticated(true);
//       })
//       .catch(() => {
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//     } else {
//       setLoading(false);
//     }
//   }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${connectionAPIString}/api/Account/Login`, {
        email,
        password
      });
      const user = await axios.get(`${connectionAPIString}/api/Account/GetUser`, {withCredentials: true});
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (name, email, password, confirmPassword ) => {
    try {
      const response = await axios.post(`${connectionAPIString}/api/Account/Register`, {
        name,
        email,
        password,
        confirmPassword
        
      });
      console.log(response)
      const user = await axios.get(`${connectionAPIString}/api/Account/GetUser`, {withCredentials: true});
      console.log(user)
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading, connectionAPIString }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
