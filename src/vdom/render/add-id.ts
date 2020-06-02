var id = 0;

function addId(str, prefix) {

  var ids = [];

  const components = str.match(/\w*Component\b/g);
  
  if (components) {
    for (var i = 0; i < components.length; i++) {
      const ID = id++;
      ids.push(ID);
      str = str.replace(`${components[i]}, null`, `${components[i]},{id:'${prefix}${ID}'}`);
    }
    for (var i = 0; i < components.length; i++) {
      const ID = id++;
      ids.push(ID);
      str = str.replace(`${components[i]}, {`, `${components[i]},{id:'${prefix}${ID}',`);
    }
  }

  return {
    str,
    ids
  }
}

export default addId;
