"use client"

import { useEffect, useRef } from "react"

const AUDIO_SRC = "/images/BGM_site.mp3"

export default function AudioController() {
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
      return true
    } catch (err) {
      return false
    }
  }

  useEffect(() => {
    let cleaned = false

    const maybeClearInteraction = async () => {
      const ok = await playAudio()
      if (ok && !cleaned) {
        document.removeEventListener("pointerdown", maybeClearInteraction)
        document.removeEventListener("keydown", maybeClearInteraction)
        document.removeEventListener("touchstart", maybeClearInteraction)
      }
    }

    // Attempt autoplay immediately
    playAudio()

    // Also listen for any user interaction as fallback
    document.addEventListener("pointerdown", maybeClearInteraction)
    document.addEventListener("keydown", maybeClearInteraction)
    document.addEventListener("touchstart", maybeClearInteraction)

    const handleVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        if (!audio.paused) {
          resumeOnFocusRef.current = true
          audio.pause()
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
      document.removeEventListener("touchstart", maybeClearInteraction)
      document.removeEventListener("visibilitychange", handleVisibility)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return null
}
