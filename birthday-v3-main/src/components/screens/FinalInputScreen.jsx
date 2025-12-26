"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundHearts from "../BackgroundHearts";
import { Send, Heart } from "lucide-react";

export default function FinalInputScreen({ onSubmit }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // Thank-you screen is separate now; no local submitted state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make message compulsory - don't submit if empty
    if (!message.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    
    // Navigate to ThankYou screen via parent after saving
    
    // Prepare data to save
    const userData = {
      message: message.trim(),
    };

    // Save to server via API
    try {
      const response = await fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Visitor data saved successfully:", result.data);
      } else {
        console.error("Failed to save visitor data:", result.error);
      }
    } catch (error) {
      console.error("Failed to send visitor data to server:", error);
    }

    // Also save to localStorage as backup
    try {
      // Create IST timestamp (UTC + 5:30)
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      const istTime = new Date(now.getTime() + istOffset);
      const istTimestamp = istTime.toISOString().replace('Z', '+05:30');
      
      const existingData = JSON.parse(localStorage.getItem("birthdayMessages") || "[]");
      existingData.push({ ...userData, ip: userIP, timestamp: istTimestamp });
      localStorage.setItem("birthdayMessages", JSON.stringify(existingData));
      console.log("Message saved to localStorage as backup");
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
    // After saving, go to Thank You screen
    onSubmit?.(message.trim());
  };

  return (
    <div className="w-full flex justify-center px-3 sm:px-4 py-6 sm:py-10 relative">
      <BackgroundHearts />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full rounded-2xl p-5 sm:p-8 text-center 
          bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 
          border border-pink-300/80 drop-shadow-2xl"
      >
        {/* Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <Heart className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-pink-300 fill-pink-300" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 mb-2 leading-tight"
        >
            Leave a Message! <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] text-lg sm:text-2xl inline-block ml-1">💌</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-pink-300 font-medium mb-6 sm:mb-8">
          Hogaku munche enadhru helbittu ogu <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] inline-block ml-1">❤️‍🩹</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            {/* Textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 sm:p-4 rounded-xl bg-purple-900/50 border border-pink-300/50 
                text-sm sm:text-base text-white placeholder-pink-300/70 focus:border-pink-300 focus:outline-none 
                focus:ring-2 focus:ring-pink-400/50 resize-none h-24 sm:h-32 
                transition-all duration-200"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2 text-center"
              >
                Muchkond love letter bari! 💌
              </motion.p>
            )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg 
                bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 
                shadow-[0_0_28px_rgba(244,114,182,0.35)] 
                transition-transform duration-200 ease-out 
                hover:shadow-[0_0_35px_rgba(244,114,182,0.5)]
                focus:outline-none focus-visible:ring-2 
                focus-visible:ring-pink-300/70 flex gap-2 items-center justify-center"
            >
              <Send size={18} />
              Send Message
            </motion.button>

            {/* Required Note */}
            <p className="text-xs sm:text-sm text-pink-300/70 mt-4">
              Your message will be saved <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] inline-block ml-1">💕</span>
            </p>
          </form>
      </motion.div>
    </div>
  );
}
