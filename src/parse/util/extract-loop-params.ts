import replaceAll from "@/util/string/replace-all";

function extractLoopParams(input: string) {
  const split = input.split(' in ');

  const firstPart = split[0];

  const bunch = split[1].trim();
  const iterator = replaceAll(firstPart.split(',')[1] || '', ['(', ''], [')', '']).trim();
  const variable = replaceAll(firstPart.split(',')[0] || '', ['(', ''], [')', '']).trim();

  return { variable, iterator, bunch };
}

export default extractLoopParams;
