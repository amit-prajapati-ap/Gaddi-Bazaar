import React, { useState } from "react";
import {toast} from 'react-toastify'
import { motion } from "motion/react";

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const handleSubscribe = () => {
    if (email.trim() === "") {
      toast.error("Please enter your email")      
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email")
    } else {
      toast("Subscribed successfully")
    }
  }
  return (
    <motion.div initial={{y: 30, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, ease: "easeOut"}} viewport={{once: true, amount: 0.3}} className="xl:px-24 md:px-12 px-6 my-10 mb-24 max-w-window mx-auto">
      <div className="flex md:flex-row flex-col border border-gray-500/30 rounded-lg items-start md:items-center justify-between gap-5 text-sm max-w-5xl bg-white p-8 mx-auto">
        <div className="max-w-md w-full">
          <motion.h1 initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.2}} className="text-3xl font-semibold text-gray-700">
            Never Miss a Deal
          </motion.h1>
          <motion.p initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.3}} className="text-gray-500 mt-2">
            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
            velit quis. Duis tempor incididunt dolore.
          </motion.p>
          <motion.form initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.4}} className="flex items-center gap-4 mt-10">
            <input
              className="py-2 px-3 w-full outline-none focus:border-indigo-500/60 transition max-w-64 border border-gray-500/30 rounded-md"
              type="text"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleSubscribe} className="bg-primary hover:bg-primary-dull transition-all px-6 py-2 cursor-pointer rounded text-white font-medium">
              Subscribe
            </button>
          </motion.form>
        </div>
        <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.5}} className="space-y-4 md:max-w-48">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">Weekly articles</h3>
          </div>
          <p className="text-gray-500">
            Non laboris consequat cupidatat laborum magna. Eiusmod non irure
            cupidatat duis commodo amet.
          </p>
        </motion.div>
        <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.6}} className="space-y-4 md:max-w-48">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">No spam</h3>
          </div>
          <p className="text-gray-500">
            Officia excepteur ullamco ut sint duis proident non adipisicing.
            Voluptate incididunt anim.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Newsletter;
