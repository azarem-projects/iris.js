const RESTORING_KEY = 'irisisthebest';

function hasUpperCase(input: string) {
  return /[A-Z]/.test(input);
}

function markUpperCase(input: string, key: string) {
  const split = input.split('');

  for (let i = 0; i < split.length; i++) {
    if (/[a-zA-Z]/.test(split[i]) && split[i] === split[i].toUpperCase()) {
      split[i] = key + split[i];
    }
  }

  return split.join('');
}

function restoreUpperCase(input: string, key: string) {
  const split = input.split(key);

  const capitalized = input.startsWith(key);

  for (let i = 0; i < split.length; i++) {    
    var firstChar = split[i].charAt(0);

    if (i === 0) {
      if (capitalized) {
        firstChar = firstChar.toUpperCase();
      }
    } else {
      firstChar = firstChar.toUpperCase();
    }

    split[i] = firstChar + split[i].substring(1, split[i].length);
  }

  return split.join('');
}

export { hasUpperCase, markUpperCase, restoreUpperCase, RESTORING_KEY }
