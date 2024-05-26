export function bruteForce(start, end) {
  let primes = [];
  for (let i = start; i <= end; i++) {
    let count = 0;
    for (let j = 2; j <= i / 2; j++) {
      if (i % j === 0) {
        count = count + 1;
        break;
      }
    }
    if (count === 0 && i > 1) {
      primes.push(i);
    }
  }
  return primes;
}

