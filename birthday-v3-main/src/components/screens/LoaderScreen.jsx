"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoaderScreen({ onDone }) {
    const [password, setPassword] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [count, setCount] = useState(3)
    const [error, setError] = useState(false)

    const CORRECT_PASSWORD = "ILOVEYOU"

    useEffect(() => {
        if (showSuccess) {
            const t = setInterval(() => {
                setCount((c) => {
                    if (c <= 1) {
                        clearInterval(t)
                        setTimeout(() => onDone?.(), 420)
                        return 0
                    }
                    return c - 1
                })
            }, 1000)
            return () => clearInterval(t)
        }
    }, [showSuccess, onDone])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password.toUpperCase() === CORRECT_PASSWORD) {
            setError(false)
            setCount(3)
            setShowSuccess(true)
        } else {
            setError(true)
            setTimeout(() => setError(false), 2000)
        }
    }

    if (showSuccess) {
        return (
            <div className="w-full grid place-items-center px-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center"
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 py-1.5 mb-6 leading-tight"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        I Love You Too Bangara! <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)] text-2xl sm:text-3xl md:text-4xl inline-block ml-1">🌹💝✨</span>
                    </motion.h1>
                    <motion.div
                        key={count}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.25)]"
                    >
                        {count}
                    </motion.div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="w-full grid place-items-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mb-6 sm:mb-8 text-center py-1.5 leading-tight"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Enter Password
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type password here..."
                            className="w-full px-6 py-4 text-lg text-white bg-white/10 backdrop-blur-sm border-2 border-pink-400/30 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all placeholder-white/50"
                            autoFocus
                        />
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2 text-center"
                            >
                                Incorrect password. Nim mava naa! 
                            </motion.p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 rounded-2xl shadow-lg hover:shadow-pink-500/50 transition-all"
                    >
                        Submit
                    </motion.button>
                </form>

                <motion.p
                    className="text-white/70 text-sm mt-6 text-center"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Hint: Express your feelings in 8 letters... <span className="text-white drop-shadow-[0_0_8px_rgba(255,100,150,0.8)]">💝</span>
                </motion.p>
            </motion.div>
        </div>
    )
}
