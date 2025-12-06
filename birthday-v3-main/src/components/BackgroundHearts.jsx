"use client";

import React, { useMemo } from "react";

function Heart({ h }) {
  const style = {
    top: h.top,
    left: h.left,
    width: `${h.size}px`,
    height: `${h.size}px`,
    animation: `${h.duration} ease-in-out ${h.delay} infinite normal none running drift`,
    transformOrigin: "center",
    color: h.colorValue,
  };

  return (
    <div className="heart-drift" style={style} key={h.id}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={h.size}
        height={h.size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </div>
  );
}

export default function BackgroundHearts() {
  // produce a denser field of hearts positioned across the viewport
  const hearts = useMemo(() => {
    const colors = ["#ff7aa2", "#ff8acb", "#ff5fab", "#ffb6d9", "#ff6f9a"];
    const arr = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const top = `${(Math.random() * 98).toFixed(4)}%`;
      const left = `${(Math.random() * 98).toFixed(4)}%`;
      const size = (12 + Math.random() * 26).toFixed(4);
      const duration = `${20 + Math.random() * 18}s`;
      const delay = `${(Math.random() * 4).toFixed(4)}s`;
      const colorValue = colors[Math.floor(Math.random() * colors.length)];
      arr.push({ id: i, top, left, size, duration, delay, colorValue });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {hearts.map((h) => (
        <Heart h={h} key={h.id} />
      ))}
    </div>
  );
}
