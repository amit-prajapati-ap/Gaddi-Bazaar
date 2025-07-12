import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";

export const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const tokenName = import.meta.env.VITE_APP_TOKEN_NAME

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Fuction to fetch user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      if (data.success) {
       setUser(data.data.user)
       setIsOwner(data.data.user.role === 'owner')
      } else {
        navigate("/");
      }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  };

  // Function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      const {data} = await axios.get("/api/owner/user-cars");
      if (data.success) {
        setCars(data.data)
      } else {
          toast.error(data.message)
      }
    } catch (error) {
        console.log(error.response.data.message)
    }
  };

  // Function to login user
  const login = async({password, email}) => {
    try {
      const {data} = await axios.post('/api/user/login', {email, password})

      if (data.success) {
        navigate('/')
        setToken(data.data.token)
        localStorage.setItem(tokenName, data.data.token)
        setShowLogin(false)
        setUser(data.data.user)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  // Function to login user
  const register = async({password, email, name}) => {
    try {
      const {data} = await axios.post('/api/user/register', {name, email, password})
      console.log(data)

      if (data.success) {
        navigate('/')
        setToken(data.data.token)
        localStorage.setItem(tokenName, data.data.token)
        setShowLogin(false)
        setUser(data.data.user)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem(tokenName)
    setToken(null)
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common["Authorization"] = '';
    toast.success('Logged out successfully')
  };

  //useEffect to retrieve the token from local storage
  useEffect(() => {
      const token = localStorage.getItem(tokenName);
      setToken(token);
      fetchCars()
  },[])

  //useEffect to fetch user data when token is available
  useEffect(() => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchUser();
      }
  },[token])

  const value = {
    navigate,
    currency,
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
    fetchUser,
    logout,
    fetchCars,
    axios,
    login,
    register,
    toast
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
