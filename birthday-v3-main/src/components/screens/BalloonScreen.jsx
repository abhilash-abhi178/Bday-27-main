"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GradientButton from "../GradientButton";
import { ArrowRight } from "lucide-react";

export default function ScreenFireflyHeart({ onNext }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const firefliesRef = useRef([]);
  
  // FIX: Store the start time in a ref so it doesn't reset when React re-renders
  const formationStartTimeRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [forming, setForming] = useState(false);
  const [formed, setFormed] = useState(false);

  const FIREFLY_COUNT = 100;
  const FORM_DURATION = 2000;
  const VERTICAL_OFFSET = -20;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // --- 1. Init Fireflies ---
    if (firefliesRef.current.length === 0) {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      for (let i = 0; i < FIREFLY_COUNT; i++) {
        firefliesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          r: Math.random() * 1.5 + 1,
          alpha: 0.5 + Math.random() * 0.5,
          heartAngle: (i / FIREFLY_COUNT) * Math.PI * 2,
          hoverOffset: Math.random() * 100,
        });
      }
    }
    const fireflies = firefliesRef.current;

    // --- 2. Math ---
    function getHeartPosition(t, scale, cx, cy) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      return { x: cx + x * scale, y: cy - y * scale };
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    // --- 3. Animation ---
    let animationFrameId;

    function animate(timestamp) {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = (h / 2) + VERTICAL_OFFSET;

      const baseScale = Math.min(w, h) / 35;
      const beatIntensity = 0.08;
      const beat = Math.sin(timestamp * 0.003);
      const currentScale = baseScale * (1 + beatIntensity * beat);

      ctx.clearRect(0, 0, w, h);

      // FIX: Handle time tracking using the persistent Ref
      if (forming && !formationStartTimeRef.current) {
        formationStartTimeRef.current = timestamp;
      }

      let progress = 0;
      if (forming && formationStartTimeRef.current) {
        progress = Math.min((timestamp - formationStartTimeRef.current) / FORM_DURATION, 1);
      }

      fireflies.forEach((f) => {
        // STATE 1: Random Floating
        if (!forming) {
          f.x += f.vx;
          f.y += f.vy;
          if (f.x < 0 || f.x > w) f.vx *= -1;
          if (f.y < 0 || f.y > h) f.vy *= -1;
        } 
        // STATE 2: Forming or Formed
        else {
          const target = getHeartPosition(f.heartAngle, currentScale, cx, cy);

          // If animation is in progress (progress < 1) move towards target
          if (progress < 1) {
            if (!f.startX) {
              f.startX = f.x;
              f.startY = f.y;
            }
            const ease = easeOutCubic(progress);
            f.x = f.startX + (target.x - f.startX) * ease;
            f.y = f.startY + (target.y - f.startY) * ease;
          } 
          // If progress is 1, we are fully formed -> Jitter in place
          else {
            const jitterX = Math.sin(timestamp * 0.002 + f.hoverOffset) * 2;
            const jitterY = Math.cos(timestamp * 0.002 + f.hoverOffset) * 2;
            f.x = target.x + jitterX;
            f.y = target.y + jitterY;
          }
        }

        // Draw
        ctx.beginPath();
        const glowRadius = f.r * 4;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius);
        grad.addColorStop(0, `rgba(255, 220, 140, ${f.alpha})`);
        grad.addColorStop(1, "rgba(255, 220, 140, 0)");
        ctx.fillStyle = grad;
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 240, 1)";
        ctx.arc(f.x, f.y, f.r * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Trigger the "Formed" state (UI Text) only once when animation is done
      if (forming && progress >= 1 && !formed) {
        setFormed(true);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [started, forming, formed]); // Dependencies can stay, the Ref fixes the logic error

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    setTimeout(() => {
      setForming(true);
    }, 200);
  };

  // --- Typewriter Variants ---
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.12, // Speed: Higher = Slower
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0 },
    },
  };

  return (
    <>
      <div className="w-full flex justify-center mt-4">
        <div
          ref={containerRef}
          className="relative w-[95%] max-w-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          style={{
            aspectRatio: "3/4",
            background: "linear-gradient(to bottom, #050505, #1a1025)",
          }}
          onClick={handleStart}
        >
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {!started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-[45%] -translate-x-1/2 text-amber-100/60 text-lg pointer-events-none"
            >
              Tap anywhere ✨
            </motion.div>
          )}

          {formed && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center w-full"
              style={{ marginTop: `${VERTICAL_OFFSET}px` }}
            >
              <motion.h2
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl md:text-4xl font-bold text-center leading-tight"
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-200 to-yellow-500 drop-shadow-[0_0_25px_rgba(255,200,0,0.5)]">
                  {"Happy Birthday".split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </span>

                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-200 to-yellow-500 drop-shadow-[0_0_25px_rgba(255,200,0,0.5)]">
                    {"Princess ".split("").map((char, index) => (
                      <motion.span key={index} variants={letterVariants}>
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  
                  <motion.span variants={letterVariants} className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)]">
                    💓
                  </motion.span>
                  <motion.span variants={letterVariants} className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)]">
                    ✨
                  </motion.span>
                </span>
              </motion.h2>
            </motion.div>
          )}
        </div>
      </div>

      {formed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="flex justify-center mt-8"
        >
          <GradientButton onClick={onNext}>
            Next <ArrowRight size={18} className="ml-2" />
          </GradientButton>
        </motion.div>
      )}
    </>
  );
}