// Variables
const inputText = document.getElementById('text-input');
const checkPalindrome = document.getElementById('check-btn');
const resultBox = document.getElementById('result');

const checkForPalindrome = input => {
// Store input
  const userInput = input;

  // Check to see if input is empty
  if (input === '') {
    alert('Please input a value');
    return;
  }

  // Remove old results
  resultBox.replaceChildren();

  // Replace string from input with all lowercase for check
  const lowerCaseString = input.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
  // Check string against the reverse to see if it's a palindrome, then create message to display if it is or isn't a palindrome.
  let resultMessage = `<span>${userInput}</span> ${
    lowerCaseString === [...lowerCaseString].reverse().join('') ? 'is a palindrome.' : 'is not a palindrome.'
  }`;

  // Create paragraph entry with results 
  const createPTag = document.createElement('p');
  createPTag.className = 'user-input'; 
  createPTag.innerHTML = resultMessage;
  resultBox.appendChild(createPTag);

  // Remove hidden on result box to show results
  resultBox.classList.remove('hidden');
};

  // Create listener for Button click to start check.
  checkPalindrome.addEventListener('click', () => {
    checkForPalindrome(inputText.value);
    inputText.value = '';
  });

  // Create listener for press of enter to start check.
  inputText.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
      checkForPalindrome(inputText.value);
      inputText.value = '';
    }
  });

// Test Cases:
// runThroughPalindrone("A");
// runThroughPalindrone("eye");
// runThroughPalindrone("_eye");
// runThroughPalindrone("race car");
// runThroughPalindrone("not a palindrome");
// runThroughPalindrone("A man, a plan, a canal. Panama");
// runThroughPalindrone("never odd or even");
// runThroughPalindrone("nope");
// runThroughPalindrone("almostomla ");
// runThroughPalindrone("My age is 0, 0 si ega ym.");
// runThroughPalindrone("1 eye for of 1 eye.");
// runThroughPalindrone("0_0 (: /-\ :) 0-0");
// runThroughPalindrone("five|\_/|four");