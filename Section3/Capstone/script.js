//Variables
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('result');

// Check input for structure
const telePhoneCheck = input => {
  if (input === '') {
    alert('Please provide a phone number');
    return;
  }
  const countryCode = '^(1\\s?)?';
  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  const symbols = '[\\s\\-]?';
  const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  const numberTemplate = new RegExp(
    `${countryCode}${areaCode}${symbols}${phoneNumber}`
  );

// Create the result area
  const outputArea = document.createElement('p');
  outputArea.className = 'output-content';
  numberTemplate.test(input) ? (outputArea.style.color = `var(--tertiary-color)`) : (outputArea.style.color = `red`);
  outputArea.appendChild(document.createTextNode(`${numberTemplate.test(input) ? 'Valid' : 'Invalid'} US number: ${input}`)
  );
  result.appendChild(outputArea);
};

// Submit with enter button
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    telePhoneCheck(userInput.value);
    userInput.value = '';
  }
});

// Submit with check button
checkBtn.addEventListener('click', () => {
  telePhoneCheck(userInput.value);
  userInput.value = '';
});

// Clear result area
clearBtn.addEventListener('click', () => {
  result.textContent = '';
});