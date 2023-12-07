/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  const str1 = [];

  for (let i = cleanedStr.length - 1, j = 0; i >= 0, j < cleanedStr.length; i--, j++) {
    str1[j] = cleanedStr[i];
  }
  let strrev = str1.join("");

  if (strrev == cleanedStr) {
    return true;
  } else {
    return false;
  }
}

module.exports = isPalindrome;
