export function getRandomIntExcludingNum(max, excludedNum) {
  const nums = [];

  for (let i = 0; i < max; i++) {
    if (i !== excludedNum) {
      nums.push(i);
    }
  }

  return nums[Math.floor(Math.random() * nums.length)];
}
