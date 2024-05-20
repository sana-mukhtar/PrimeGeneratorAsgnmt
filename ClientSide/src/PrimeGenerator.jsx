import { useState } from "react";
import axios from "axios";
import "./index.css";

function bruteForce(start, end) {
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

function PrimesSqrtMethod(start, end) {
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

const generatePrimesEratosthenes = (start, end) => {
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
};

const PrimeGenerator = () => {
  const [start, setStart] = useState(2);
  const [end, setEnd] = useState(10);
  const [method, setMethod] = useState("");
  const [primes, setPrimes] = useState([]);

  const handleGenerate = () => {
    const startTime = Date.now();
    const startVal = parseInt(start, 10);
    const endVal = parseInt(end, 10);
    if (isNaN(startVal) || isNaN(endVal) || startVal > endVal) {
      alert("Please enter valid start and end values.");
      return;
    }

    let primeNumbers;

    //switch case to call selected function
    switch (method) {
      case "brute-force":
        primeNumbers = bruteForce(startVal, endVal);
        break;

      case "square-root":
        primeNumbers = PrimesSqrtMethod(startVal, endVal);
        break;
      case "eratosthenes":
        primeNumbers = generatePrimesEratosthenes(startVal, endVal);
        break;

      default:
        alert("select an approach to generate prime number");
        break;
    }

    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    const primesReturned = primeNumbers.length;

    setPrimes(primeNumbers);
    // console.log(startTime, endTime, timeElapsed,  method);
    axios.post("http://localhost:8000/", {
      startTime,
      endTime,
      timeElapsed,
      method,
      primesReturned,
    });
  };

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-lime-300 via-lime-200 h-[100vh] w-full">
      <h1 className=" p-8 text-center font-bold text-5xl text-lime-700 font-custom drop-shadow-lg">
        Prime Number Generator
      </h1>
      <div className="flex items-center justify-evenly">
        <div>
          <label>Start: </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border-2 my-3  p-1 rounded-md"
          />
        </div>
        <div>
          <label>End: </label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border-2 my-3  p-1 rounded-md"
          />
        </div>
        <div>
          <label>Method: </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border-2 my-3  p-1 rounded-md"
          >
            <option value="">Select A Method </option>
            <option value="brute-force">Brute Force </option>
            <option value="square-root">Square Root Method</option>
            <option value="eratosthenes">Eratosthenes Method</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          className="bg-green-600 border-black text-white p-2 my-3  rounded-md shadow-md"
        >
          Generate Primes
        </button>
      </div>
      {
        <div className="border-2 h-[50vh] w-[60vw] p-4 rounded-md border-green-100 bg-white m-auto">
          <h2 className="text-center ">Prime Numbers:</h2>
          <p>{primes.join(", ")}</p>
        </div>
      }
    </div>
  );
};

export default PrimeGenerator;
