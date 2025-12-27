"use client"

import { useState, useEffect } from "react"
import GradientButton from "../GradientButton"
import BackgroundHearts from "../BackgroundHearts"
import { Gift } from "lucide-react"

export default function IntroScreen({ onNext }) {
  const [userIP, setUserIP] = useState(null);

  // Fetch user's IP address on component mount
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP:", error);
        setUserIP("IP unavailable");
      }
    };
    fetchIP();
  }, []);
    return (
        <div className="py-10 md:py-14 text-center relative">
            <BackgroundHearts />
            <div className="relative z-10">
            <div className="flex flex-col items-center gap-6">
                <img
                    src="/gifs/intro.gif"
                    alt="Cute birthday animation topper"
                    className="w-[140px] md:w-[180px]  object-cover"
                    style={{ filter: "drop-shadow(0px 8px 16px rgba(244,114,182,0.2))" }}
                />

                <div>
                    <h1 className="text-pretty text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                        }}>
                        A Cutiepie was born today, 17 years ago!
                    </h1>
                    <p className="mt-4 text-xl text-pink-200">Yes, it’s YOU! A little surprise awaits...</p>
                </div>

                <div className="mt-8">
                    <GradientButton
                        onClick={() => {
                            // Trigger audio playback through user interaction
                            const audio = document.querySelector('audio');
                            if (audio) {
                                audio.play().catch(err => console.log('Audio play failed:', err));
                            }
                            onNext?.();
                        }}
                    >
                        <Gift size={20} />
                        Start the surprise
                    </GradientButton>
                </div>
            </div>
            </div>
        </div>
    )
}
