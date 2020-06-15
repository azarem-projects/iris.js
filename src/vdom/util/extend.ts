function extend(target: any, image: any) {
  if (!target || !image) return;

  const bunch = [
    ...Object.getOwnPropertyNames(image),
    ...Object.keys(image)
  ]

  for (var i = 0; i < bunch.length; i++) {
    const key = bunch[i];

    if (!target[key]) {
      target[key] = image[key];
    }
  }
}

export default extend;
