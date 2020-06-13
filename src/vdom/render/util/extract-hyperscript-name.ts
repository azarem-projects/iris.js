function extractHyperscriptName(str: string) {
  const i_0 = str.indexOf('render(');
  const i_1 = str.indexOf(')', i_0);

  const resultFromArgs = str.substring(i_0, i_1).replace('render(', '');

  if (resultFromArgs) {
    return resultFromArgs;
  }
  
  const j_0 = str.indexOf('return ', i_0);
  const j_1 = str.indexOf('(', j_0);
  
  const resultFromUsage = str.substring(j_0, j_1).replace('return ', '');

  return resultFromUsage;
}

export default extractHyperscriptName;
