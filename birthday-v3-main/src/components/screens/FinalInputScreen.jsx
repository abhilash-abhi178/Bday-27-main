"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Heart } from "lucide-react";

export default function FinalInputScreen({ onSubmit }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
    if (message.trim() || userIP) {
      setSubmitted(true);
      
      // Prepare data to save
      const userData = {
        message: message.trim() || "(No message provided)",
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
        const existingData = JSON.parse(localStorage.getItem("birthdayMessages") || "[]");
        existingData.push({ ...userData, ip: userIP, timestamp: new Date().toISOString() });
        localStorage.setItem("birthdayMessages", JSON.stringify(existingData));
        console.log("Message saved to localStorage as backup");
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }

      // Call the callback
      onSubmit?.(message);
      
      // Show confirmation briefly then navigate
      setTimeout(() => {
        setSubmitted(false);
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full rounded-2xl p-8 text-center 
          bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 
          border border-pink-300/80 drop-shadow-2xl"
      >
        {/* Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <Heart className="w-12 h-12 text-pink-300 fill-pink-300" />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 mb-2"
        >
            Leave a Message! 💌
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-pink-300 font-medium mb-8">
          Hogaku munche enadhru helbittu ogu ❤️‍🩹
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here... (optional)"
              className="w-full p-4 rounded-xl bg-purple-900/50 border border-pink-300/50 
                text-white placeholder-pink-300/70 focus:border-pink-300 focus:outline-none 
                focus:ring-2 focus:ring-pink-400/50 resize-none h-32 
                transition-all duration-200"
            />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-8 py-3 rounded-full text-white font-semibold text-lg 
                bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 
                shadow-[0_0_28px_rgba(244,114,182,0.35)] 
                transition-transform duration-200 ease-out 
                hover:shadow-[0_0_35px_rgba(244,114,182,0.5)]
                focus:outline-none focus-visible:ring-2 
                focus-visible:ring-pink-300/70 flex gap-2 items-center justify-center"
            >
              <Send size={20} />
              Send Message
            </motion.button>

            {/* Optional Note */}
            <p className="text-sm text-pink-300/70 mt-4">
              Your message and IP will be saved 💕
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1 }}
              className="flex justify-center mb-4"
            >
              <Heart className="w-16 h-16 text-pink-300 fill-pink-300" />
            </motion.div>
            <p className="text-2xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-pink-200 to-purple-200 mb-2"
            >
              Thank you! 💖
            </p>
            <p className="text-pink-300/80">Your message is received with love ✨</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
