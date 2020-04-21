export function getRandomInt(start, end, exclude = null) {
  // Returns a random integer between start (inclusive) and end (exclusive)
  // Optionally exclude an integer
  const nums = [];

  for (let i = start; i < end; i++) {
    if (exclude !== null && i === exclude) continue;
    nums.push(i);
  }

  return nums[Math.floor(Math.random() * nums.length)];
}
