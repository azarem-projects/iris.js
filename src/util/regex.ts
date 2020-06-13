function getFirstGroup(expression: RegExp, str: string) {  
  const array = [...str.matchAll(expression)];

  return array.map((m) => m[1]);
}

export { getFirstGroup };
