import extractHyperscriptName from './util/extract-hyperscript-name';
import countMatches from '@/util/string/count-matches';

/**
 * Needs to be completely redone. 
 */
function addId(input: string, name: string, key: string) {
  const hyperscriptFunctionName = extractHyperscriptName(input);
  const split = input.split(`${hyperscriptFunctionName}(`);
  const components: string[] = [];

  for (var i = 0; i < split.length; i++) {
    const _split = split[i].split(',')[0];    
    
    if (!(countMatches(_split, ' ') > 1) && !_split.includes("'") && !_split.includes("\"") && !_split.includes("`")) {
      components.push(_split);
    }
  }

  if (components) {
    /** 
     * Attempt to exclude keys.
     */
    for (var i = 0; i < components.length; i++) {

      for (var j = 0; j < countMatches(input, `${components[i]}, null`); j++) {
        input = input.replace(`${components[i]}, null`, `${components[i]},{parent:{key:'${key}',name:'${name}'}}`);
      }

      for (var j = 0; j < countMatches(input, `${components[i]},null`); j++) {
        input = input.replace(`${components[i]},null`, `${components[i]},{parent:{key:'${key}',name:'${name}'}}`);
      }

      for (var j = 0; j < countMatches(input, `${components[i]}, {`); j++) {
        input = input.replace(`${components[i]}, {`, `${components[i]},{parent:{key:'${key}',name:'${name}'},`);
      }

      for (var j = 0; j < countMatches(input, `${components[i]},{`); j++) {
        input = input.replace(`${components[i]},{`, `${components[i]},{parent:{key:'${key}',name:'${name}'},`);
      }
    }
  }

  return input;
}

export default addId;
