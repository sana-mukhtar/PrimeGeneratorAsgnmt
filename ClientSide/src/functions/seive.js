export function generatePrimesEratosthenes(start, end) {
  const sieve = new Array(end + 1).fill(true);
  sieve[0] = sieve[1] = false; // 0 and 1 are not primes
  for (let p = 2; p * p <= end; p++) {
    if (sieve[p]) {
      for (let i = p * p; i <= end; i += p) {
        sieve[i] = false;
      }
    }
  }
  const primes = [];
  for (let num = start; num <= end; num++) {
    if (sieve[num]) primes.push(num);
  }
  return primes;
}
