// Creates blocking synchronous operations that freeze the UI
export const blockingMiddleware = async (next) => {
  // Synchronous blocking operation
  const start = Date.now();
  while (Date.now() - start < 30000) {
    // Blocks for 30 seconds
    JSON.stringify(Array(100000).fill(Math.random()));
  }
  return next();
};

// Auto-execute
blockingMiddleware(() => {});
