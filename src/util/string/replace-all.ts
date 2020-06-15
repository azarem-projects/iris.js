function replaceAll(input: string, ...what: string[][]) {
  var result = input;

  for (var i = 0; i < what.length; i++) {
    result = result.split(what[i][0]).join(what[i][1]);
  }

  return result;
}

export default replaceAll;
