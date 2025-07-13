import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../store/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, isOwner, user, logout, axios, setIsOwner, navigate } =
    useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.put("/api/owner/role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (!user) {
        setShowLogin(true);
      }
    }
  };

  const handleRedirect = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 bg-white">
      <div
        className={`${
          location.pathname === "/" && "bg-white"
        } max-w-window relative mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16 xl:px-24 text-gray-600 border-b border-borderColor transition-all py-1`}
      >
        <Link to={"/"}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={assets.logo}
            alt="logo"
            className="sm:h-14 h-16"
          />
        </Link>

        <div
          className={`${
            open ? "max-sm:bg-light" : "max-sm:bg-transparent"
          } max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor ring-0 flex flex-col sm:flex-row items-center gap-4 md:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
            open ? "max-sm:-translate-x-6" : "max-sm:-translate-x-[660px]"
          }`}
        >
          {menuLinks.map((link) => (
            <div
              onClick={() => handleRedirect(link.path)}
              key={link.name}
              className="group relative hover:text-[#8245ec] transition duration-200 cursor-pointer"
            >
              {link.name}
              <div className="h-[2px] bg-[#8245ec] absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}

          <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
            <button
              onClick={() => {
                isOwner ? navigate("/owner") : changeRole();
              }}
              className="cursor-pointer mx-auto group relative hover:text-[#8245ec] transition duration-200"
            >
              {isOwner ? "Dashboard" : "List cars"}{" "}
              <div className="h-[2px] bg-[#8245ec] absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <motion.button
              whileHover={{ scale: 0.95 }}
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className={`cursor-pointer px-8 py-2 ${
                user
                  ? "bg-red-500 hover:bg-red-600/90"
                  : "bg-primary hover:bg-primary-dull"
              } transition-all duration-200 text-white rounded-lg`}
            >
              {user ? "Logout" : "Login"}
            </motion.button>
          </div>
        </div>

        <button
          className="sm:hidden cursor-pointer"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
