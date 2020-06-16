// 0
// if (!getPrototype<Component>(Constructor).$render) {
//   const renderResult = this.component.render.apply(this.component, <[]>(
//     (<any>[Iris.createElement])
//   ));

//   if (isString(renderResult)) {
//     getPrototype<Component>(Constructor).$render = stringToHyperscript(
//       renderResult as string,
//       this.component
//     )();
//   } else {
//     getPrototype<Component>(Constructor).$render = this.component.render as (
//       h?: THyperscript
//     ) => VNode;
//   }
// }

// 1
// if (!getPrototype<Component>(Constructor).$render.toString().includes('___mod')) {
//   getPrototype<Component>(Constructor).$render = modifyRender(
//     this.component.$render,
//     name,
//     key
//   );
// }

// 2
// arrForEach(this.children, (item: VNode, index: number) => {
//   if (item instanceof VNode) {
//     count += item.count;
//   } else {
//     this.children[index] = '' + item;
//   }
//   count++;
// });