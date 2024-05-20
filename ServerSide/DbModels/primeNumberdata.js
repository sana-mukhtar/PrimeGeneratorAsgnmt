const mongoose = require("mongoose");

const primeRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  timeElapsed: { type: Number, required: true },
  algorithm: {
    type: String,
    enum: ["brute-force", "square-root","eratosthenes"],
    required: true,
  },
  numberOfPrimes: { type: Number, required: true },
});

module.exports = mongoose.model("PrimeRecord", primeRecordSchema);
