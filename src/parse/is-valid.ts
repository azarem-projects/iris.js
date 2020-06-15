function isValid(input: string) {
  return document.createElement(input).toString() != '[object HTMLUnknownElement]';
}

export default isValid;
