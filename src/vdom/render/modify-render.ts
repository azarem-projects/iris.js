import addId from '@/vdom/render/add-id';

function modifyRender(functionReference: any, _id: any, key: any) {
  var functionText = functionReference.toString().replace('function', 'return function');

  if (!functionText.includes('return function')) {
    functionText = `return function ${functionText}`;
  }
  
  functionText = addId(functionText, _id, key);

  return Function(functionText)();
}

export default modifyRender;
