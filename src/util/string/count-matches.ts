function countMatches(str: string, sub: string) {
  return str.split(sub).length - 1;
}

export default countMatches;
