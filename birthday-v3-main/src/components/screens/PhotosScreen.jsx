"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail, Heart } from "lucide-react"
import GradientButton from "../GradientButton"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)

  const photos = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
  ]

  return (
    <div className="px-4 md:px-6 py-10">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          Some Sweet Moments
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Swipe the cards)</p>
      </div>

      <div className="relative flex justify-center">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-full w-full rounded-3xl p-3"
                  style={{ filter: "drop-shadow(0px 18px 36px rgba(244,114,182,0.14))" }}
                >
                  <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-pink-950/30 via-transparent to-purple-950/30 border-2 border-pink-500/30">
                    {/* corner hearts */}
                    <Heart size={20} className="absolute top-3 left-3 text-pink-400 opacity-90 z-10" />
                    <Heart size={20} className="absolute top-3 right-3 text-pink-400 opacity-90 z-10" />

                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-xl object-cover"
                      style={{ filter: "drop-shadow(0px 8px 16px rgba(244,114,182,0.2))" }}
                    />

                    <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-tr from-transparent via-black/10 to-pink-100/10" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
