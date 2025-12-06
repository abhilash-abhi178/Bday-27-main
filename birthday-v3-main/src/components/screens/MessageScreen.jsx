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

        // Big burst
        confetti({
            particleCount: 140,
            spread: 70,
            origin: { y: 0.4 }
        });

        // Falling hearts
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

            {/* Flip Card */}
            <div className="mx-auto relative w-full max-w-3xl flex justify-center">
                <motion.div
                    className="relative w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] 
                    md:w-[350px] md:h-[500px] cursor-pointer"
                    style={{ perspective: 1200 }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                    onClick={!flipped ? handleFlip : undefined}
                >

                    {/* Inner flip wrapper */}
                    <motion.div
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="relative w-full h-full"
                        style={{ transformStyle: "preserve-3d" }}
                    >

                        {/* FRONT SIDE */}
                        <div
                            className="absolute inset-0 rounded-xl shadow-xl overflow-hidden"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <img
                                src="/images/cover.webp"
                                className="w-full h-full object-cover rounded-xl"
                                style={{ filter: "drop-shadow(0px 8px 16px rgba(244,114,182,0.25))" }}
                            />

                            <p className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 
                                bg-pink-500 text-pink-50 w-32 md:w-40 rounded-lg py-1 text-center shadow-lg">
                                Tap to Open 💗
                            </p>
                        </div>

                        {/* BACK SIDE */}
                        <div
                            className="absolute inset-0 rounded-xl shadow-xl p-5 md:p-6 flex items-center justify-center"
                            style={{
                                transform: "rotateY(180deg)",
                                backfaceVisibility: "hidden",
                                background: `linear-gradient(
                                    to bottom right,
                                    rgba(255,255,255,0.88),
                                    rgba(255,255,255,0.75)
                                ), url('/images/cover.webp')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "4px solid #ff66b3",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}
                        >
                            <p
                                className="text-[#301733] text-[16px] md:text-[18px] leading-relaxed font-medium 
                                overflow-y-auto max-h-[340px] pr-3"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the
                                world today and always. You have this special way of making everything around you
                                brighter — your smile, your kindness, and the way you make people feel truly cared for.
                                <br /><br />
                                I hope your day is filled with laughter, surprises, and moments that make your heart
                                happy. You’re truly one of a kind, and I just want you to know how special you are.
                                <br /><br />
                                Keep being the amazing person you are. Wishing you endless happiness, success, and
                                all the sweet things life has to offer. 💗
                            </p>
                        </div>

                    </motion.div>
                </motion.div>
            </div>

            {/* Next Button */}
            {flipped && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex justify-center"
                >
                    <GradientButton
                        onClick={onNext}
                        className="flex items-center gap-2"
                    >
                        Continue
                        <ArrowRight size={20} />
                    </GradientButton>
                </motion.div>
            )}
        </div>
    );
}
