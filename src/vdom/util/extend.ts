function extend(targetCtor: any, Ctor: typeof Component) {
  const keys = Object.getOwnPropertyNames(Ctor.prototype);

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!targetCtor.prototype[key]) {
      targetCtor.prototype[key] = (Ctor.prototype as any)[keys[i]];
    }
  }
}

export default extend;
