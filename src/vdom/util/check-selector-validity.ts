function queryCheck(input: string) {
  return document.createDocumentFragment().querySelector(input);
}

function checkSelectorValidity(selector: string) {
  try {
    queryCheck(selector);
  } catch {
    return false;
  }
  return true;
}

export default checkSelectorValidity;