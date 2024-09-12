import axios from 'axios';
import { useEffect, useState, useContext, createContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({
  register: () => {},
  userInfo: '',
  login: () => {},
  logout: () => {},
});
const baseUrl = 'http://127.2.2.1:8000';

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }

  const register = async (userData, navigate) => {
    try {
      const { data } = await axios.post(`${baseUrl}/user/`, userData);
      setUserInfo({ ...data.data });
      toast.success('User registered successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const login = async (userData, navigate) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login/`, userData);
      setUserInfo({
        token: data.token,
        accessToken: data.jswbtoken.access,
        refreshToken: data.jswbtoken.refresh,
        email: data.email,
      });
      localStorage.setItem('user', JSON.stringify({
        token: data.token,
        accessToken: data.jswbtoken.access,
        refreshToken: data.jswbtoken.refresh,
        email: data.email,
      }));
      toast.success('User logged in successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async (navigate) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    if (!token) {
      toast.error('No token found');
      return;
    }

    try {
      await axios.post(`${baseUrl}/auth/logout/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Logged out successfully');
      localStorage.removeItem('user');
      setUserInfo(null);
      navigate('/auth/login');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ register, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);