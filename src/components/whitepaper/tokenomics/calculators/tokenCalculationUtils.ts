
// Utility functions for token calculations

// Token price for public launch (default value)
export const publicLaunchPrice = 0.00019065;

// Vesting details - 20 days vesting period with equal distribution
export const vestingDays = 20;

/**
 * Calculate the total value of tokens
 */
export const calculateTokenValue = (tokenAmount: string, tokenPrice: number = publicLaunchPrice): number | null => {
  if (!tokenAmount || isNaN(Number(tokenAmount))) {
    return null;
  }
  
  const tokens = parseFloat(tokenAmount);
  return tokens * tokenPrice;
};

/**
 * Calculate daily token payout based on vesting schedule
 */
export const calculateDailyPayout = (tokenAmount: string): number | null => {
  if (!tokenAmount || isNaN(Number(tokenAmount))) {
    return null;
  }
  
  const tokens = parseFloat(tokenAmount);
  // Daily payout is total tokens divided by vesting days
  return tokens / vestingDays;
};

/**
 * Format a number with commas for display
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

/**
 * Format the token amount for display
 */
export const formatTokenAmount = (tokenAmount: string): string => {
  if (!tokenAmount || isNaN(Number(tokenAmount))) {
    return "Ape Armor";
  }
  return parseFloat(tokenAmount).toLocaleString();
};

/**
 * Format currency for display
 */
export const formatCurrency = (value: number): string => {
  return value.toFixed(8).replace(/\.?0+$/, '');
};
