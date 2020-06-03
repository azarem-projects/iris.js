import { getFirstGroup } from "@/util/regex";


function addId(str: string, prefix: string) {
  var id = 0;
  
  const components = getFirstGroup(/(?=Iris.createElement.\s*?(\w+))/g, str);
  
  if (components) {
    for (var i = 0; i < components.length; i++) {
      const ID = id++;

      str = str.replace(`${components[i]}, null`, `${components[i]},{_id:'${prefix}${ID}'}`);
    }
    for (var i = 0; i < components.length; i++) {
      const ID = id++;

      str = str.replace(`${components[i]}, {`, `${components[i]},{_id:'${prefix}${ID}',`);
    }
  }

  return str;
}

export default addId;
