"use client"

import { useEffect, useRef, useState } from "react"

const AUDIO_SRC = "https://cdn.pixabay.com/download/audio/2022/03/28/audio_4c7b0e03d8.mp3?filename=calm-piano-ambient-112191.mp3"

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const audioRef = useRef(null)
  const resumeOnFocusRef = useRef(false)

  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return audio
  }

  const playAudio = async () => {
    const audio = ensureAudio()
    try {
      await audio.play()
      setIsPlaying(true)
      setBlocked(false)
      return true
    } catch (err) {
      setBlocked(true)
      setIsPlaying(false)
      return false
    }
  }

  const handleToggle = async () => {
    const audio = ensureAudio()
    if (audio.paused) {
      await playAudio()
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    let cleaned = false

    const maybeClearInteraction = async () => {
      const ok = await playAudio()
      if (ok && !cleaned) {
        document.removeEventListener("pointerdown", maybeClearInteraction)
        document.removeEventListener("keydown", maybeClearInteraction)
      }
    }

    // Attempt autoplay; if blocked, the first user interaction will retry
    playAudio()
    document.addEventListener("pointerdown", maybeClearInteraction)
    document.addEventListener("keydown", maybeClearInteraction)

    const handleVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        if (!audio.paused) {
          resumeOnFocusRef.current = true
          audio.pause()
          setIsPlaying(false)
        }
      } else if (resumeOnFocusRef.current) {
        resumeOnFocusRef.current = false
        playAudio()
      }
    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      cleaned = true
      document.removeEventListener("pointerdown", maybeClearInteraction)
      document.removeEventListener("keydown", maybeClearInteraction)
      document.removeEventListener("visibilitychange", handleVisibility)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed top-4 left-4 z-50 rounded-full px-4 py-2 text-sm font-semibold text-white bg-white/10 border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/20 transition"
    >
      {isPlaying ? "Pause music" : blocked ? "Tap to play music" : "Play music"}
    </button>
  )
}
