import { formatEther, parseEther } from "viem";

/**
 * Format a bigint amount to a readable string
 */
export const formatAmount = (amount: bigint): string => {
  return formatEther(amount);
};

/**
 * Parse a string amount to bigint
 */
export const parseAmount = (amount: string): bigint => {
  return parseEther(amount);
};

/**
 * Convert a timestamp to a readable date string
 */
export const formatTimestamp = (timestamp: bigint): string => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
};

/**
 * Convert a date to a timestamp (seconds since epoch)
 */
export const dateToTimestamp = (date: Date): bigint => {
  return BigInt(Math.floor(date.getTime() / 1000));
};

/**
 * Get current timestamp in seconds
 */
export const getCurrentTimestamp = (): bigint => {
  return BigInt(Math.floor(Date.now() / 1000));
};

/**
 * Check if a timestamp is in the past
 */
export const isTimestampInPast = (timestamp: bigint): boolean => {
  return getCurrentTimestamp() > timestamp;
};

/**
 * Check if a timestamp is in the future
 */
export const isTimestampInFuture = (timestamp: bigint): boolean => {
  return getCurrentTimestamp() < timestamp;
};

/**
 * Check if current time is within a range
 */
export const isWithinTimeRange = (
  startTime: bigint,
  endTime: bigint
): boolean => {
  const now = getCurrentTimestamp();
  return now >= startTime && now <= endTime;
};

/**
 * Format an address to a shorter display format
 */
export const formatAddress = (address: `0x${string}`): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Validate if a string is a valid Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Convert a bigint to a percentage string
 */
export const formatPercentage = (value: bigint, total: bigint): string => {
  if (total === 0n) return "0%";
  const percentage = (Number(value) / Number(total)) * 100;
  return `${percentage.toFixed(2)}%`;
};

/**
 * Calculate the time remaining until a timestamp
 */
export const getTimeRemaining = (
  targetTimestamp: bigint
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const now = getCurrentTimestamp();
  const remaining = Number(targetTimestamp - now);

  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return { days, hours, minutes, seconds };
};

/**
 * Format time remaining as a human-readable string
 */
export const formatTimeRemaining = (targetTimestamp: bigint): string => {
  const { days, hours, minutes, seconds } = getTimeRemaining(targetTimestamp);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Check if an event is currently in sale period
 */
export const isEventInSalePeriod = (
  startSaleDate: bigint,
  endSaleDate: bigint
): boolean => {
  return isWithinTimeRange(startSaleDate, endSaleDate);
};

/**
 * Check if a session is currently active
 */
export const isSessionActive = (
  startSessionTime: bigint,
  endSessionTime: bigint
): boolean => {
  return isWithinTimeRange(startSessionTime, endSessionTime);
};

/**
 * Check if a session has ended
 */
export const isSessionEnded = (endSessionTime: bigint): boolean => {
  return isTimestampInPast(endSessionTime);
};

/**
 * Check if a session has started
 */
export const isSessionStarted = (startSessionTime: bigint): boolean => {
  return isTimestampInPast(startSessionTime);
};
