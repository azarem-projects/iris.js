import addId from '@/vdom/render/add-id';

/**
 * If user has defined a key by himself, we need
 * to prevent the function from doing that.
 * 
 * Cache works pretty well, but not for this function.
 * It's just not about caching => needs to be redone.
 */
function modifyRender(functionReference: any, _id: any, key: any, { __id, _key }: any) {
  var functionText = functionReference.toString().replace('function', 'return function');
  
  if (!functionText.includes('return function')) {
    functionText = `return function ${functionText}`;
  }
  
  functionText = addId(functionText, _id, key, { __id, _key });

  functionText = functionText.split('return').join('var ___mod;return');

  return Function(functionText)();
}

export default modifyRender;
