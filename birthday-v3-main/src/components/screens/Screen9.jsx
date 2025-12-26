"use client";

import { motion } from "framer-motion";

export default function Screen9({ onReplay }) {
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl rounded-2xl p-6 text-center 
          bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 
          border border-pink-300/80 drop-shadow-2xl"
      >
        {/* GIF */}
        <img
          src="/gifs/surprise.gif"
          alt="surprise"
          className="mx-auto w-44 md:w-52 object-cover"
        />

        {/* Subtitle */}
        <p className="text-xl text-pink-300 font-semibold mt-2 drop-shadow-xl">
          Lots of love for you <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)]">❤️</span>
        </p>

        {/* Message */}
        <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold 
          text-transparent bg-clip-text bg-gradient-to-r 
          from-pink-200 via-purple-200 to-purple-200 
          drop-shadow-xl mt-5 leading-relaxed">
          <div className="mb-2">Once again, Happy Birthday Bangara!<span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] inline-block ml-1">💝</span></div>
          <div className="mb-2">Parvagilla or average agi aitha website</div>
          <div>Hope irthiya forever inge jeevna poorthi <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] inline-block ml-1">😁</span></div>
        </div>

        {/* Next Button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="px-10 py-4 rounded-full text-white font-semibold text-lg 
              bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 
              shadow-[0_0_28px_rgba(244,114,182,0.35)] 
              transition-transform duration-200 ease-out 
              hover:shadow-[0_0_35px_rgba(244,114,182,0.5)]
              focus:outline-none focus-visible:ring-2 
              focus-visible:ring-pink-300/70"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}


