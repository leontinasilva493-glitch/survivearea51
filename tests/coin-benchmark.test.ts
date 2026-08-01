import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateCoinRun,
  formatCoinAmount,
  formatCoinRate,
  formatDuration,
  summarizeCoinRuns,
} from "../lib/coin-benchmark";

const observedRuns = [
  { startCoins: 500, finishCoins: 38_300, elapsedSeconds: 164, controlled: false },
  { startCoins: 33_600, finishCoins: 106_400, elapsedSeconds: 200, controlled: false },
] as const;

test("calculates the two visible-balance observations from raw values", () => {
  assert.deepEqual(calculateCoinRun(observedRuns[0]), {
    netCoins: 37_800,
    coinsPerMinute: 13_829,
  });
  assert.deepEqual(calculateCoinRun(observedRuns[1]), {
    netCoins: 72_800,
    coinsPerMinute: 21_840,
  });
});

test("formats benchmark values without hiding the underlying calculation", () => {
  assert.equal(formatCoinAmount(500), "500");
  assert.equal(formatCoinAmount(38_300), "38.3K");
  assert.equal(formatCoinAmount(72_800), "72.8K");
  assert.equal(formatDuration(164), "2m 44s");
  assert.equal(formatCoinRate(13_829), "13.8K/min");
});

test("keeps two uncontrolled observations below the indexing baseline gate", () => {
  assert.deepEqual(summarizeCoinRuns(observedRuns), {
    sampleSize: 2,
    controlledSampleCount: 0,
    minCoinsPerMinute: 13_829,
    maxCoinsPerMinute: 21_840,
    baselineReady: false,
  });
});

test("requires at least three controlled repeats before a benchmark is baseline-ready", () => {
  const controlledRuns = [
    { startCoins: 0, finishCoins: 10_000, elapsedSeconds: 60, controlled: true },
    { startCoins: 0, finishCoins: 9_500, elapsedSeconds: 60, controlled: true },
    { startCoins: 0, finishCoins: 10_500, elapsedSeconds: 60, controlled: true },
  ];

  assert.equal(summarizeCoinRuns(controlledRuns).baselineReady, true);
});

test("rejects a zero-length run instead of publishing an infinite rate", () => {
  assert.throws(
    () => calculateCoinRun({ startCoins: 500, finishCoins: 1_000, elapsedSeconds: 0, controlled: false }),
    /elapsedSeconds must be greater than zero/,
  );
});
