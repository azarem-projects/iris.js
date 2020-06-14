import extractHyperscriptName from './util/extract-hyperscript-name';
import countMatches from '@/util/string/count-matches';

/**
 * Needs to be completely redone. 
 */
function addId(str: string, prefix: string, _prefix: string, { __id, _key }: any) {
  var id = parseInt(prefix) + 1;

  /**
   * var key = parseInt(_prefix) + 1;
   */

  const hyperscriptFunctionName = extractHyperscriptName(str);
  const split = str.split(`${hyperscriptFunctionName}(`);
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

      for (var j = 0; j < countMatches(str, `${components[i]}, null`); j++) {
        str = str.replace(`${components[i]}, null`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}'}`);
      }

      for (var j = 0; j < countMatches(str, `${components[i]},null`); j++) {
        str = str.replace(`${components[i]},null`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}'}`);
      }

      for (var j = 0; j < countMatches(str, `${components[i]}, {`); j++) {
        str = str.replace(`${components[i]}, {`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',`);
      }

      for (var j = 0; j < countMatches(str, `${components[i]},{`); j++) {
        str = str.replace(`${components[i]},{`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',`);
      }

    }

    // for (var i = 0; i < components.length; i++) {
    //   if (str.includes(`${components[i]}, null`)) {
    //     str = str.replace(`${components[i]}, null`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',key:'${key++}'}`);
    //   } else if (str.includes(`${components[i]},null`)) {
    //     str = str.replace(`${components[i]},null`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',key:'${key++}'}`);
    //   } else if (str.includes(`${components[i]},{`)) {
    //     str = str.replace(`${components[i]},{`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',key:'${key++}',`);        
    //   } else if (str.includes(`${components[i]}, {`)) {
    //     str = str.replace(`${components[i]}, {`, `${components[i]},{parent:{_id:'${__id}',key:'${_key}'},_id:'${id++}',key:'${key++}',`);
    //   }
    // }
  }

  return str;
}

export default addId;
