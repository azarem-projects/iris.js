function prepend(input: string, what: string) {
  return what + input;
}

function append(input: string, what: string) {
  return input + what;
}

function wrap(input: string) {
  return `'${input}'`
}

export { prepend, append, wrap }
