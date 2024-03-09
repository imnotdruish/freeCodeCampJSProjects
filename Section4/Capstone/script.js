// variables for price and change in register
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// variables for screen elements
const userInput = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const totalDue = document.getElementById('price-screen');
const changeInRegister = document.getElementById('register-display');


// Format Results for display on website
const formatResults = (status, change) => {
  changeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    money => (changeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

// Main Function for Processing of the results
const checkCash = () => {
  // Check if Customer is even about to afford the items
  if (Number(userInput.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    userInput.value = '';
    return;
  }
  // Check if Customer has paid with exact cash
  if (Number(userInput.value) === price) {
    changeDue.innerHTML = 
    `<p>No change due - customer paid with exact cash</p>`;
    userInput.value = '';
    return;
  }
  // Additional Variables for use to calculate change
  let amountDue = Number(userInput.value) - price;
  let flipCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  // Combine remaining amount in register to use for check against change needed for customer
  let totalCid = parseFloat(
    cid.map(total => total[1])
    .reduce((prev, curr) => prev + curr)
    .toFixed(2)
  );
  // Check if total avaialble in register will cover change back to customer
  if (totalCid < amountDue) {
    return (changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }
  // Check if total available in register equals change needed.
  if (totalCid === amountDue) {
    result.status = 'CLOSED';
  }
  // using reverse of cid to loop amountDue through each denomination to break out change into what bills/coins are needed to provide to customer
  for (let i = 0; i <= flipCid.length; i++) {
    if (amountDue > denominations[i] && amountDue > 0) {
      let count = 0;
      let total = flipCid[i][1];
      while (total > 0 && amountDue >= denominations[i]) {
        total -= denominations[i];
        amountDue = parseFloat((amountDue -= denominations[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.change.push([flipCid[i][0], count * denominations[i]]);
      }
    }
  }
  // Check if change 
  if (amountDue > 0) {
    return (changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }
  // Run formatResults and updateUI
  formatResults(result.status, result.change);
  updateUI(result.change);
};

// checkResults function to check if anything was entered.
const checkResults = () => {
  if (!userInput.value) {
    return;
  }
  checkCash();
}
// updateUI function to output results to web browser
const updateUI = change => {
  const currName = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // finding denominations from cid and grouping them with their names in change
  if (change) {
    change.forEach(changeArr => {
      const compareArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      compareArr[1] = parseFloat((compareArr[1] - changeArr[1]).toFixed(2));
    });
  }
  // clear input value, display total from price provided, display current amounts remaining for change in register
  userInput.value = '';
  totalDue.textContent = `Total: $${price}`;
  changeInRegister.innerHTML = `<p><strong>Change In Drawer:</strong></p>
    ${cid
      .map(money => `<p>${currName[money[0]]}: $${money[1]}</p>`)
      .join('')}
      `;
};

// Event Listener for Purchase Button
purchaseBtn.addEventListener('click', checkResults);

// Event Listener for Input for key press of enter
userInput.addEventListener('keydown', e => {
  if (e.key === 'enter') {
    checkResults();
  }
});

// Run updateUI
updateUI();

