/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }

  let result = '';
  const arr = string.split('');
  for (const word of arr) {
    if (result.endsWith(word.repeat(size))) {
      continue;
    }
    result += word;
  }
  return result;
}
