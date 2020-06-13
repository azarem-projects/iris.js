import extractHyperscriptName from './util/extract-hyperscript-name';

function addId(str: string, prefix: string, _prefix: string) {
  var id = parseInt(prefix) + 1;
  var key = parseInt(_prefix) + 1;

  const hyperscriptFunctionName = extractHyperscriptName(str);

  var split = str.split(`${hyperscriptFunctionName}(`);

  const components: string[] = [];

  for (var i = 0; i < split.length; i++) {
    const _split = split[i].split(',')[0];

    if (!_split.includes(' ') && !_split.includes("'")) {
      components.push(_split);
    }
  }

  if (components) {
    for (var i = 0; i < components.length; i++) {
      str = str.replace(`${components[i]}, null`, `${components[i]},{_id:'${id++}',key:'${key++}'}`);
      str = str.replace(`${components[i]}, {`, `${components[i]},{_id:'${id++}',key:'${key++}',`);
    }
  }

  return str;
}

export default addId;
