function getPropType(name: string) {
  return {
    dynamic: name.startsWith(':'),
    event: name.includes('@'),
    loop: name.includes('i-for'),
    model: name.includes('i-model'),
    conditional: name.includes('i-if'),
    customEvent: name.startsWith('i-on:')
  }
}

export default getPropType;
