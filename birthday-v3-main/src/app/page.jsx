"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonScreen from "@/components/screens/BalloonScreen.jsx"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/FlipCardMessageScreen"
import GiftScreen from "@/components/screens/GiftScreen.jsx"
import Screen9 from "@/components/screens/Screen9"
import HeartBackground from "@/components/screens/HeartBackground";
export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsUserAction, setNeedsUserAction] = useState(false)
  const audioRef = useRef(null)

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <BalloonScreen key="balloon" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
    <GiftScreen key="gift" onNext={() => setCurrentScreen(7)}   />,
    <Screen9 key="screen9" onReplay={() => setCurrentScreen(0)} />,
  ]

  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/28/audio_4c7b0e03d8.mp3?filename=calm-piano-ambient-112191.mp3")
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return audio
  }

  const tryPlay = async () => {
    const audio = ensureAudio()
    try {
      await audio.play()
      setIsPlaying(true)
      setNeedsUserAction(false)
    } catch (err) {
      setNeedsUserAction(true)
      setIsPlaying(false)
    }
  }

  const handleMusicToggle = async () => {
    const audio = ensureAudio()
    if (audio.paused) {
      await tryPlay()
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    console.log('HomePage: currentScreen ->', currentScreen, 'screens length', screens.length, 'rendering key:', screens[currentScreen]?.key, 'type:', screens[currentScreen]?.type?.name)
  }, [currentScreen])

  useEffect(() => {
    function onUnhandledRejection(e) {
      try {
        console.error('Unhandled promise rejection:', e.reason);
        // If the reason is an Event, dump some useful fields
        if (e.reason && typeof e.reason === 'object') {
          console.error('Rejection (keys):', Object.keys(e.reason));
          try {
            console.error('Rejection JSON:', JSON.stringify(e.reason));
          } catch (err) {
            console.error('Could not stringify rejection reason', err);
          }
        }
      } catch (err) {
        console.error('Error logging unhandled rejection', err);
      }
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', onUnhandledRejection);
  }, []);

  useEffect(() => {
    // Try to start music immediately; if blocked, we'll show a button prompt.
    tryPlay()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleMusicToggle}
        className="fixed top-4 left-4 z-50 rounded-full px-4 py-2 text-sm font-semibold text-white bg-white/10 border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/20 transition"
      >
        {isPlaying ? "Pause music" : needsUserAction ? "Tap to play music" : "Play music"}
      </button>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @abhi
      </motion.div>
    </main>
  )
}
