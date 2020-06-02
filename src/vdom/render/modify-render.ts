import addId from './add-id';

function modifyRender(functionReference: any, id: any) {

  var functionText = functionReference.toString().replace('function', 'return function');
  functionText = addId(functionText, id).str;
  return Function(functionText)();
}

export default modifyRender;
