export function calculateBullionCost({
  selectedMetal,
  weightInput,
  selectedPurity,
  goldRate24k,
  silverRate,
  makingChargesInput,
  wastageInput
}) {
  const basePrice = selectedMetal === 'gold' ? goldRate24k : silverRate;
  let purityMultiplier = 1;

  if (selectedMetal === 'gold') {
    if (selectedPurity === '24K') purityMultiplier = 1;
    else if (selectedPurity === '22K') purityMultiplier = 0.9167;
    else if (selectedPurity === '18K') purityMultiplier = 0.75;
  } else {
    if (selectedPurity === '999') purityMultiplier = 1;
    else if (selectedPurity === '925') purityMultiplier = 0.925;
  }

  const metalVal = basePrice * weightInput * purityMultiplier;
  const wastageVal = metalVal * (wastageInput / 100);
  const makingChargesVal = metalVal * (makingChargesInput / 100);
  const subTotal = metalVal + wastageVal + makingChargesVal;
  const gstVal = subTotal * 0.03; // 3% standard GST
  return Math.round(subTotal + gstVal);
}

export function calculateEmi(price, emiMonths) {
  if (!price) return 0;
  // 20% downpayment standard with simple interest compounding
  const emi = (price - Math.round(price * 0.20)) * (0.095 / 12) * Math.pow(1.007916, emiMonths) / (Math.pow(1.007916, emiMonths) - 1);
  return Math.round(emi);
}
