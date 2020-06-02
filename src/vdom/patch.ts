import { isString, isObject, objForEach, arrForEach, setAttr, toArray } from '../util/helpers';
import { REPLACE, REORDER, PROPS, TEXT, NOKEY } from './diff/operations';

function patch(node, patches) {
  const walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  const currentPatches = patches[walker.index];

  node.childNodes &&
    arrForEach(node.childNodes, (item) => {
      walker.index++;
      dfsWalk(item, walker, patches);
    });

  currentPatches && applyPatches(node, currentPatches);
}

function applyPatches(node, currentPatches) {
  arrForEach(currentPatches, (item) => {
    switch (item.type) {
      case REPLACE:
        const nNode = isString(item.node) ? document.createTextNode(item.node) : item.node.render();
        node.parentNode.replaceChild(nNode, node);
        break;
      case REORDER:
        reorderChildren(node, item.moves);
        break;
      case PROPS:
        setProps(node, item.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = item.content;
        } else {
          node.nodeValue = item.content;
        }
        break;
      default:
        throw new Error('Unknown patch type ' + item.type);
    }
  });
}

function setProps(node, props) {
  objForEach(props, (key) => {
    if (props[key] === void NOKEY) {
      node.removeAttribute(key);
    } else {
      setAttr(node, key, props[key]);
    }
  });
}

function reorderChildren(node, moves) {
  const staticNodeList = toArray(node.childNodes);
  const maps = {};

  arrForEach(staticNodeList, (node) => {
    if (node.nodeType === 1) {
      const key = node.getAttribute('key');
      key && (maps[key] = node);
    }
  });

  arrForEach(moves, (move) => {
    const index = move.index;
    if (move.type === 0) {
      if (!node.childNodes[index]) return;
      staticNodeList[index] === node.childNodes[index] && node.removeChild(node.childNodes[index]);
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      var insertNode;
      if (maps[move.item.key]) {
        insertNode = node.removeChild(maps[move.item.key]);
        staticNodeList.splice(Array.prototype.indexOf.call(node.childNodes, maps[move.item.key]), 1);
      } else {
        insertNode = isObject(move.item) ? move.item.render() : document.createTextNode(move.item);
      }
      staticNodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
}

export default patch;
