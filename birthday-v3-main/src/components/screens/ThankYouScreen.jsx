"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ThankYouScreen({ onReplay }) {
  return (
    <div className="w-full flex justify-center px-3 sm:px-4 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full rounded-2xl p-5 sm:p-8 text-center 
          bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 
          border border-pink-300/80 drop-shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <Heart className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-pink-300 fill-pink-300" />
        </motion.div>

        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-200 to-purple-200 mb-2 leading-tight"
        >
          Thank you! <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] text-lg sm:text-2xl inline-block ml-1">💖</span>
        </p>
        <p className="text-sm sm:text-base text-pink-300/80 mb-6">
          Your message is received with love <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] inline-block ml-1">✨</span>
        </p>

        <p className="text-xs sm:text-sm text-pink-300/60 text-right italic mt-4">
          - Bye with love, Nin Abhi
        </p>

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
              focus-visible:ring-pink-300/70 flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-rotate-cw"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
            </svg>
            Replay
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
