
// Function to perform fiat conversion
export const  convertToFiat = (amount: number, fiatData: number): number => {
  // Assuming the input represents 1 unit of the token
  const fiatValue = amount * fiatData;
  return fiatValue;
}


// Example usage
// Assuming you want to convert 2 BNB
const amountInToken = 2; 
const dollarValue = convertToFiat(amountInToken, 200);
console.log(`Equivalent dollar value: $${dollarValue}`);
