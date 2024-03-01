// Variables for grabbing elements from index.html by their IDs
const wrapper = document.getElementById('wrapper');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

// Conversions for certain breakpoint numbers to Roman numerals.
const convertToRoman = num => {
  const references = [
    ['X̅', 10000],
    ['V̅', 5000],
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  const result = [];

  // Run through references to check number entered into input field to find while it's greater than or equal to arr[1] add arr[0] to the result array and then subtract the total from the number input and run again until it's no longer greater than or equal to arr[1].
  references.forEach(function (arr) {
    while (num >= arr[1]) {
      result.push(arr[0]);
      num -= arr[1];
    }
  });
  // Return result joined at spaces
  return result.join('');
};

// Error messages for out of scope entries.
const isValid = (str, int) => {
  let errText = '';

  if (!str || str.match(/[e.]/g)) {
    errText = 'Please enter a valid number.';
  } else if (int < 1) {
    errText = 'Please enter a number greater than or equal to 1.';
  } else if (int > 49999) {
    errText = 'Please enter a number less than or equal to 49999.';
  } else {
    // No errors detected
    return true;
  }

  // Style for error messages
  output.innerText = errText;
  output.classList.add('error');

  return false;
};

// Clear output for next entry
const clearOutput = () => {
  output.innerText = '';
  output.classList.remove('error');
};

// Listen for Enter key, if they don't click for conversion
wrapper.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    updateUI();
  }
});

// Listen for button click
convertBtn.addEventListener('click', () => {
  updateUI();
});

// Update page to remove hidden from output to show conversion
const updateUI = () => {
  const numStr = document.getElementById('number').value;
  const int = parseInt(numStr, 10);

  // Removes the hidden class on the output
  output.classList.remove('hidden');

  // Running clearOutput function
  clearOutput();

  // if entry is valid run the conversion function.
  if (isValid(numStr, int)) {
    output.innerText = convertToRoman(int);
  }
};

















