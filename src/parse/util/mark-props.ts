import countMatches from "@/util/string/count-matches";
import { hasUpperCase, markUpperCase, RESTORING_KEY } from "./property-cases";

function markProps(input: string) {  
  const props = (input.match(/\b\s(.*?)\b=/gm) || []).map((el) => el.replace('=', ''));
  const marked = [];

  for (let i = 0; i < props.length; i++) {
    const count = countMatches(props[i], ' ');

    const prop = props[i].split(' ')[count];

    if (hasUpperCase(prop)) {
      marked.push({
        original: prop,
        marked: markUpperCase(prop, RESTORING_KEY),
      });
    }
  }

  return marked;
}

export default markProps;
