import React, { useEffect, useState } from "react";
import { useAppContext } from "../store/AppContext";
import { RxCross2 } from 'react-icons/rx';

const Login = () => {
  const {setShowLogin, login, register, toast} = useAppContext()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("Log in");
  const [logging, setLogging] = useState(false)

  const handleSubmit = (e) => {
    setLogging(true)
    e.preventDefault();
    if (type === "Log in") {
      login({email, password});
    } else {
      if (password === confirmPassword) {
        register({email, password, name});        
      } else {
        toast.error("Passwords do not match");
      }
    }
    setTimeout(() => {
      setLogging(false)
    }, 2000);
  };

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
    setName("");
    setEmail("");
  }, [type]);

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-100 flex items-center justify-center text-sm text-gray-600 bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <div className="relative">
          <h2 className="text-2xl font-semibold mb-2 text-center text-gray-700">
          {type === "Log in" ? <div><span className="text-primary">Welcome</span> back</div> : <div><span className="text-primary">Create</span>  an account</div>}
        </h2>
        <RxCross2 className="absolute right-0 top-0.5 text-black/70 cursor-pointer" size={24} onClick={() => setShowLogin(false)}/>
        </div>
        <form onSubmit={handleSubmit}>
          {type === "Sign up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 my-2"
              type="text"
              placeholder="Enter your name"
              required
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 my-2"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 my-2"
            type="password"
            placeholder="Enter your password"
            required
            min={6}
          />
          {type === "Sign up" && (
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 my-2"
              type="password"
              placeholder="Enter your confirm password"
              required
              min={6}
            />
          )}
          {type === "Log in" && (
            <div className="text-right mb-2">
              <p className="text-blue-600 underline cursor-pointer">
                Forgot Password
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={logging}
            className={`w-full bg-primary py-2.5 rounded-full text-white ${logging ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} my-2 hover:bg-primary-dull transition-all duration-200`}
          >
            {type}
          </button>
        </form>
        <div className="text-center mt-4 flex items-center justify-center gap-1">
          {type === "Log in" ? "Don’t have an account" : "Already registered"}?{" "}
          <p
            onClick={() => {
              if (type === "Log in") setType("Sign up");
              else setType("Log in");
            }}
            className="text-blue-500 underline cursor-pointer"
          >
            {type === "Log in" ? "Signup" : "Login"}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white cursor-pointer hover:bg-black/90 transition-all duration-200"
          >
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
              alt="appleLogo"
            />
            {type} with GitHub
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2 justify-center bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 cursor-pointer hover:bg-gray-50 transition-all duration-200"
          >
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="googleFavicon"
            />
            {type} with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
