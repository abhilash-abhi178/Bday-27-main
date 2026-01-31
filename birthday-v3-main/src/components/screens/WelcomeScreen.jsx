"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import BackgroundHearts from "../BackgroundHearts"

export default function WelcomeScreen({ onNext }) {
  useEffect(() => {
    // Stop audio completely on this screen
    const audio = document.querySelector('audio')
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <div className="py-10 md:py-14 text-center relative">
      <BackgroundHearts />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl md:text-7xl"
          >
           
          </motion.div>

          <div>
            <h1 className="text-pretty text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
              }}>
              Please Contact Admin!
            </h1>
            <motion.p 
              className="mt-6 text-lg md:text-2xl text-pink-200 font-semibold"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              This site is temporarily closed
            </motion.p>
            <p className="mt-4 text-base md:text-lg text-pink-300">Thank you for visiting!</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
