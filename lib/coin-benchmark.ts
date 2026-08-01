export type CoinRunInput = {
  startCoins: number;
  finishCoins: number;
  elapsedSeconds: number;
  controlled: boolean;
};

export function calculateCoinRun(run: CoinRunInput) {
  if (run.elapsedSeconds <= 0) {
    throw new Error("elapsedSeconds must be greater than zero");
  }
  if (run.finishCoins < run.startCoins) {
    throw new Error("finishCoins must be greater than or equal to startCoins");
  }

  const netCoins = run.finishCoins - run.startCoins;
  return {
    netCoins,
    coinsPerMinute: Math.round((netCoins * 60) / run.elapsedSeconds),
  };
}

export function summarizeCoinRuns(runs: readonly CoinRunInput[]) {
  const rates = runs.map((run) => calculateCoinRun(run).coinsPerMinute);
  const controlledSampleCount = runs.filter((run) => run.controlled).length;

  return {
    sampleSize: runs.length,
    controlledSampleCount,
    minCoinsPerMinute: Math.min(...rates),
    maxCoinsPerMinute: Math.max(...rates),
    baselineReady: controlledSampleCount >= 3,
  };
}

export function formatCoinAmount(value: number) {
  if (value < 1_000) return new Intl.NumberFormat("en").format(value);
  const thousands = value / 1_000;
  return `${Number.isInteger(thousands) ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
}

export function formatCoinRate(value: number) {
  return `${formatCoinAmount(value)}/min`;
}
