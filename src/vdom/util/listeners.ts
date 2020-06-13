var eventHandlers: any = {};

function addListener(node: any, event: any, handler: any, capture = false) {
  if (!(event in eventHandlers)) {
    eventHandlers[event] = [];
  }

  eventHandlers[event].push({ node: node, handler: handler, capture: capture });
  node.addEventListener(event, handler, capture);
}

function removeAllListeners(targetNode: any, event: any) {
  eventHandlers[event].filter(({ node }: any) => node === targetNode).forEach(({ node, handler, capture }: any) => node.removeEventListener(event, handler, capture));
  eventHandlers[event] = eventHandlers[event].filter(({ node }: any) => node !== targetNode);
}

export { addListener, removeAllListeners }
