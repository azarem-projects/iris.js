function removeSelfClosingTags(html: string) {
  const endSplit = html.split('/>');
  var result = '';

  for (let i = 0; i < endSplit.length - 1; i++) {
    const startSplit = endSplit[i].split('<');

    result += `${endSplit[i]}></${startSplit[startSplit.length - 1].split(' ')[0]}>`;
  }

  return result + endSplit[endSplit.length - 1];
}

export default removeSelfClosingTags;