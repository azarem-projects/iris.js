

function arraysMatch(arr1: any[], arr2: any[]) {
	if (arr1.length !== arr2.length) return false;

	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
};

class FunctionCache {
  items: ICached[];

  constructor() {
    this.items = [];
  }

  put(key: string | number, args: any[], result: any): void {
    const cached = this.items.find(item => item.key === key);

    if (cached) {

      const variation = cached.variations.find(item => arraysMatch(item.args, args));

      if (variation) {

      } else {
        cached.variations.push({ args, result });
      }

    } else {
      this.items.push({
        key,
        variations: [
          {
            args,
            result
          }
        ]
      })
    }
  }

  find(key: string | number, args: any[]): IVariation | undefined {
    const cached = this.items.find(item => item.key === key);

    if (cached) {
      const variation = cached.variations.find(item => arraysMatch(item.args, args));
      
      return variation;
    }
  }
}

export default FunctionCache;
