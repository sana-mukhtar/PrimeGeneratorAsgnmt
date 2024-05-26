export function PrimesSqrtMethod(start, end) {
  const primes = [];
  for (let i = start; i <= end; i++) {
    let count = 0;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        count = count + 1;
        break;
      }
    }
    if (count === 0) {
      primes.push(i);
    }
  }
  return primes;
}
