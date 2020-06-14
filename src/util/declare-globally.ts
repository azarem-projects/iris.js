function declareGlobally(item: any, name: string) {
  window[name] = item;
}

export default declareGlobally;
