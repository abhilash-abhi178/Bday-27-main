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
          Lots of love for you ❤️
        </p>

        {/* Message */}
        <div className="text-pretty text-xl md:text-2xl font-semibold 
          text-transparent bg-clip-text bg-gradient-to-r 
          from-pink-200 via-purple-200 to-purple-200 
          drop-shadow-xl mt-5"
        >
          Once again, Happy Birthday Bangara!!<br></br> 
          Parvagilla or average agi aitha website <br></br>
          Hope irthiyaa inge yavaglu.

        </div>

        {/* Replay Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onReplay}
            className="px-10 py-4 rounded-full text-white font-semibold text-lg 
              bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 
              shadow-[0_0_28px_rgba(244,114,182,0.35)] 
              transition-transform duration-200 ease-out 
              hover:scale-[1.03] active:scale-95 
              focus:outline-none focus-visible:ring-2 
              focus-visible:ring-pink-300/70 flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-rotate-cw mt-0.5"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
            </svg>
            Replay
          </button>
        </div>
      </motion.div>
    </div>
  );
}


