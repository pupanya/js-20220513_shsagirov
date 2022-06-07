/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arr = path.split('.');
  return (value) => {
    let result = value;
    for (const part of arr) {
      if (!result) {
        break;
      }
      result = result[part];
    }
    return result;
  };
}
