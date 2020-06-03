import addId from '@/vdom/render/add-id';

function modifyRender(functionReference: any, _id: any) {
  var functionText = functionReference.toString().replace('function', 'return function');
  functionText = addId(functionText, _id);

  return Function(functionText)();
}

export default modifyRender;
