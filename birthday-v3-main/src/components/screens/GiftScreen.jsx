"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import BackgroundHearts from "../BackgroundHearts";

export default function GiftScreen({ onNext }) {

  const fireConfetti = () => {
    // Big explosion
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Falling cute hearts
    const end = Date.now() + 2000;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 45,
        startVelocity: 20,
        shapes: ["heart"],
        colors: ["#ff6fa8", "#ff99c8", "#ff4d88"],
        origin: { x: Math.random(), y: -0.02 }
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Move to next screen (slight delay feels better)
    setTimeout(() => onNext?.(), 300);
  };

  return (
    <div className="px-4 md:px-6 py-10 text-center relative">
      <BackgroundHearts />
      <div className="relative z-10">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text 
        bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-4 leading-tight"
      >
        One Last Thing...
      </motion.h2>

      {/* Gift Section */}
      <div className="flex flex-col items-center gap-3">

        {/* Gift Button */}
        <motion.button
          onClick={fireConfetti}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="group relative transition-transform duration-300"
        >
          <img
            src="/gifs/gift.gif"
            alt="Gift box"
            className="h-44 w-44 md:h-52 md:w-52 object-cover drop-shadow-xl"
          />
        </motion.button>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-pink-200/90 drop-shadow"
        >
          Tap the gift
        </motion.div>

      </div>
      </div>
    </div>
  );
}
