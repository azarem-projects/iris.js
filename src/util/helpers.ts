function type(obj: any) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
}

function isInstantiable(func: any) {
  return type(func) === 'Function';
}

function isArray(list: any) {
  return type(list) === 'Array';
}

function isObject(obj: any) {
  return type(obj) === 'Object';
}

function isString(str: any) {
  return type(str) === 'String';
}

function isNotEmptyObj(obj: any) {
  return isObject(obj) && JSON.stringify(obj) != '{}';
}

function objForEach(obj: any, fn: any) {
  isNotEmptyObj(obj) && Object.keys(obj).forEach(fn);
}

function arrForEach(ary: any, fn: any) {
  ary.length && ary.forEach(fn);
}

function setAttr(node: any, key: any, value: any) {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      var tagName = node.tagName || '';
      tagName = tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value);
      }
      break;
    case 'checked':
      if (value === true) {
        node.setAttribute(key, 'true');
        node.checked = true;
      } else {
        node.removeAttribute(key);
        node.checked = false;
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

function toArray(data: any) {
  if (!data) {
    return [];
  }
  const ary: any = [];
  arrForEach(data, (item: any) => {
    ary.push(item);
  });

  return ary;
}

export { isInstantiable, isArray, isObject, isString, isNotEmptyObj, objForEach, arrForEach, setAttr, toArray };
