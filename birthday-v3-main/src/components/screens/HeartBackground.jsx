"use client";

import { useEffect } from "react";

export default function HeartBackground() {
  useEffect(() => {
    const container = document.getElementById("bg-hearts");
    if (!container) return;

    // Floating hearts
    const symbols = ["❤️", "❣️"];
    const colors = [
      "rgba(255,150,200,0.14)",
      "rgba(167,139,250,0.10)",
      "rgba(255,255,255,0.06)",
      "rgba(255,102,178,0.09)",
      "rgba(255,200,170,0.08)"
    ];

    for (let i = 0; i < 28; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-bg");
      heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 80 + "vh";
      heart.style.animationDuration = (Math.random() * 4 + 5) + "s";
      heart.style.animationDelay = "-" + (Math.random() * 5) + "s";
      heart.style.fontSize = Math.floor(Math.random() * 28 + 12) + "px";
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.opacity = (Math.random() * 0.5 + 0.45).toFixed(2);
      container.appendChild(heart);
    }

    // --- Confetti Fallback ---
    if (typeof window !== "undefined" && typeof window.confetti !== "function") {
      window.confetti = function (opts) {
        try {
          const count = opts?.particleCount ?? 30;
          const colors = opts?.colors ?? ["#ff66b2", "#ffd166", "#8ec5ff"];
          const origin = opts?.origin ?? { x: 0.5, y: 0.5 };

          for (let i = 0; i < Math.min(60, count); i++) {
            const d = document.createElement("div");
            d.style.position = "fixed";
            d.style.left =
              origin.x * window.innerWidth + (Math.random() - 0.5) * 80 + "px";
            d.style.top =
              origin.y * window.innerHeight + (Math.random() - 0.5) * 80 + "px";
            d.style.width = d.style.height = 4 + Math.random() * 8 + "px";
            d.style.background =
              colors[Math.floor(Math.random() * colors.length)];
            d.style.opacity = "0.95";
            d.style.borderRadius = "2px";
            d.style.zIndex = 9999;

            d.animate(
              [
                { transform: "translateY(0px) scale(1)", opacity: 1 },
                {
                  transform: `translateY(${
                    -80 - Math.random() * 120
                  }px) translateX(${(Math.random() - 0.5) * 200}px) rotate(${
                    Math.random() * 360
                  }deg) scale(0.8)`,
                  opacity: 0
                }
              ],
              { duration: 1000 + Math.random() * 800 }
            );

            document.body.appendChild(d);
            setTimeout(() => d.remove(), 2000);
          }
        } catch (e) {}
      };
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div id="bg-hearts" className="fixed inset-0 -z-10 pointer-events-none"></div>
  );
}
