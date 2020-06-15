function getPropType(name: string) {
  return {
    dynamic: name.includes(':'),
    event: name.includes('@'),
    loop: name.includes('b-for'),
  }
}

export default getPropType;
