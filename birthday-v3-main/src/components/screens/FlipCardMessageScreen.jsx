"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import GradientButton from "../GradientButton";
import { ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function MessageScreen({ onNext }) {
  const [flipped, setFlipped] = useState(false);
  const confettiDone = useRef(false);

  const triggerConfetti = () => {
    if (confettiDone.current) return;
    confettiDone.current = true;

    // Big colorful burst
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.4 }
    });

    // Falling hearts for a short while
    const end = Date.now() + 3000;
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 45,
        shapes: ["heart"],
        colors: ["#ff6fa8", "#ff99c8", "#ff4d88"],
        origin: { x: Math.random(), y: -0.05 }
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleFlip = () => {
    setFlipped(true);
    triggerConfetti();
  };

  return (
    <div className="px-4 md:px-6 py-10 text-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
      >
        A Special Message
      </motion.h2>

      {/* Floating hearts background (NOT inside card) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-pink-300 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 25}px`,
            }}
          >
            
          </div>
        ))}
      </div>

      {/* Centered flip card inside fancy-frame */}
      <div className="mx-auto relative w-full max-w-3xl flex justify-center">
        <div className="fancy-frame relative">
          {/* ribbon - uses local upload path */}
         
          

          {/* sparkles (3) */}
          <div className="sparkles" aria-hidden>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* flip card wrapper (uses fancy frame border + heart pattern from CSS) */}
          <motion.div
            className="relative w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] cursor-pointer fancy-card"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            onClick={!flipped ? handleFlip : undefined}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 overflow-hidden rounded-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src="/images/cover.webp"
                  className="w-full h-full object-cover rounded-lg"
                  alt="cover"
                />
                <p className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 bg-pink-500 text-pink-50 w-36 md:w-44 rounded-lg py-1 text-center shadow-lg">
                  Tap to Open 💗
                </p>
              </div>

              {/* BACK SIDE */}
              {/* BACK SIDE (perfect clean card) */}
              <div
                className="absolute inset-0 perfect-card rounded-xl"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <p className="perfect-message">
                  Happy Birthday, Cutiepie! You deserve all the happiness, love, and
                  smiles in the world today and always. You have this special way of
                  making everything around you brighter — your smile, your kindness,
                  and the way you make people feel truly cared for.
                  <br />
                  <br />
                  I hope your day is filled with laughter, surprises, and moments that
                  make your heart happy. You’re truly one of a kind, and I just want you to
                  know how special you are.
                  <br />
                  <br />
                  Keep being the amazing person you are. Wishing you endless happiness,
                  success, and all the sweet things life has to offer. 💗
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Continue button (shows after flip) */}
      {flipped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex justify-center">
          <GradientButton onClick={onNext} className="flex items-center gap-2">
            Continue
            <ArrowRight size={20} />
          </GradientButton>
        </motion.div>
      )}
    </div>
  );
}
