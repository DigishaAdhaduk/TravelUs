// Currency configuration for TravelUs
// Default to Indian Rupee (₹) as primary currency

export const CURRENCY_CONFIG = {
  code: "INR",
  symbol: "₹",
  name: "Indian Rupee",
  locale: "en-IN",
};

// Format amount in Indian Rupees
export const formatAmount = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return `${CURRENCY_CONFIG.symbol}0.00`;
  }

  return new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
    style: "currency",
    currency: CURRENCY_CONFIG.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format amount without currency symbol (for input fields)
export const formatAmountNumber = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "0.00";
  }
  return amount.toFixed(2);
};

// Parse amount from string input
export const parseAmount = (amountString) => {
  const parsed = parseFloat(amountString);
  return isNaN(parsed) ? 0 : parsed;
};

// Validate amount input
export const isValidAmount = (amount) => {
  const parsed = parseAmount(amount);
  return parsed > 0 && parsed <= 10000000; // Max 1 crore
};
