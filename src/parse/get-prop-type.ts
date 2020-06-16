function getPropType(name: string) {
  return {
    dynamic: name.includes(':'),
    event: name.includes('@'),
    loop: name.includes('i-for'),
    model: name.includes('i-model')
  }
}

export default getPropType;
