!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=19)}([function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var r=n(14),o=n(15),i=n(10),c=n(16);t.exports=function(t,e){return r(t)||o(t,e)||i(t,e)||c()}},function(t,e,n){var r=n(17);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(18),o=n(8);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?o(t):e}},function(t,e,n){var r=n(11),o=n(12),i=n(10),c=n(13);t.exports=function(t){return r(t)||o(t)||i(t)||c()}},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){var r=n(9);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e,n){var r=n(9);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){"use strict";n.r(e);var r=function(t,e){window[e]=t},o=n(1),i=n.n(o),c=n(0),a=n.n(c),s=n(7),u=n.n(s),l=n(4),f=n.n(l),p=n(2),h=n.n(p);function v(t){return Object.prototype.toString.call(t).replace(/\[object\s|\]/g,"")}function d(t){return"Object"===v(t)}function y(t){return"String"===v(t)}function m(t){return d(t)&&"{}"!=JSON.stringify(t)}function b(t,e){m(t)&&Object.keys(t).forEach(e)}function g(t,e){t.length&&t.forEach(e)}var k={};function x(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e in k||(k[e]=[]),k[e].push({node:t,handler:n,capture:r}),t.addEventListener(e,n,r)}var j=function(t){var e=t.indexOf("render("),n=t.indexOf(")",e),r=t.substring(e,n).replace("render(","");if(r)return r.replace("return function(","");var o=t.indexOf("return ",e),i=t.indexOf("(",o);return t.substring(o,i).replace("return ","")};var w=function(t,e){return t.split(e).length-1};var S=function(t,e,n){for(var r=j(t),o=t.split("".concat(r,"(")),i=[],c=0;c<o.length;c++){var a=o[c].split(",")[0];w(a," ")>1||a.includes("'")||a.includes('"')||a.includes("`")||i.push(a)}if(i)for(c=0;c<i.length;c++){for(var s=0;s<w(t,"".concat(i[c],", null"));s++)t=t.replace("".concat(i[c],", null"),"".concat(i[c],",{parent:{key:'").concat(n,"',name:'").concat(e,"'}}"));for(s=0;s<w(t,"".concat(i[c],",null"));s++)t=t.replace("".concat(i[c],",null"),"".concat(i[c],",{parent:{key:'").concat(n,"',name:'").concat(e,"'}}"));for(s=0;s<w(t,"".concat(i[c],", {"));s++)t=t.replace("".concat(i[c],", {"),"".concat(i[c],",{parent:{key:'").concat(n,"',name:'").concat(e,"'},"));for(s=0;s<w(t,"".concat(i[c],",{"));s++)t=t.replace("".concat(i[c],",{"),"".concat(i[c],",{parent:{key:'").concat(n,"',name:'").concat(e,"'},"))}return t};var O=function(t,e,n){var r=t.toString().replace("function","return function");return r.includes("return function")||(r="return function ".concat(r)),r=(r=S(r,e,n)).split("return").join("var ___mod;return"),Function(r)()};function E(t){return t.__proto__}function I(t,e){for(var n={},r=[],o=0,i=t.length;o<i;o++){var c=t[o],a=A(c,e);a?n[a]=o:r.push(c)}return{keyIndex:n,free:r}}function A(t,e){if(t&&e)return"string"==typeof e?t[e]:e(t)}var R=function(t,e,n){for(var r,o,i=I(t,n),c=I(e,n),a=c.free,s=i.keyIndex,u=c.keyIndex,l=[],f=[],p=0,h=0;p<t.length;){if(o=A(r=t[p],n))if(u.hasOwnProperty(o)){var v=u[o];f.push(e[v])}else f.push(null);else{var d=a[h++];f.push(d||null)}p++}var y=f.slice(0);for(p=0;p<y.length;)null===y[p]?(k(p),j(p)):p++;for(var m=p=0;p<e.length;){o=A(r=e[p],n);var b=y[m],g=A(b,n);if(b)if(o===g)m++;else if(s.hasOwnProperty(o))A(y[m+1],n)===o?(k(p),j(m),m++):x(p,r);else x(p,r);else x(p,r);p++}function k(t){var e={index:t,type:0};l.push(e)}function x(t,e){var n={index:t,item:e,type:1};l.push(n)}function j(t){y.splice(t,1)}return{moves:l,children:f}};function N(t,e,n,r){var o=[];if(null!==e){if(y(t)&&y(e))t!==e&&o.push({type:"text",content:e});else if(t.tagName===e.tagName&&t.key===e.key){if(m(t.props)||m(e.props)){var i=function(t,e){var n=!1,r=t.props||{},o=e.props||{},i={};return b(r,(function(t){o[t]===r[t]&&r.hasOwnProperty(t)||(!n&&(n=!0),i[t]=o[t])})),n?i:null}(t,e);t.component||i&&o.push({type:"props",props:i})}!m(e.props)&&(e.props||{}).hasOwnProperty("ignore")||(t.children.length||e.children.length)&&function(t,e,n,r,o){for(var i=0;i<t.length;i++)y(t[i])&&(e[i]||(e[i]=" "));var c=R(t,e,"key");e=c.children,c.moves.length&&o.push({type:"reorder",moves:c.moves});var a=null,s=n;g(t,(function(t,n){var o=e[n];s=a&&a.count?s+a.count+1:s+1,t!==o&&N(t,o,s,r),a=t}))}(t.children,e.children,n,r,o)}else o.push({type:"replace",node:e});o.length&&(r[n]=o)}}var C=function(t,e){var n={};return N(t,e,0,n),n};var P=function(t,e){!function t(e,n,r){var o=r[n.index];e.childNodes&&g(e.childNodes,(function(e){n.index++,t(e,n,r)})),o&&function(t,e){g(e,(function(e){switch(e.type){case"replace":var n=y(e.node)?document.createTextNode(e.node):e.node.render();t.parentNode.replaceChild(n,t);break;case"reorder":!function(t,e){var n=function(t){if(!t)return[];var e=[];return g(t,(function(t){e.push(t)})),e}(t.childNodes),r={};g(n,(function(t){if(1===t.nodeType){var e=t.getAttribute("key");e&&(r[e]=t)}})),g(e,(function(e){var o=e.index;if(0===e.type){if(!t.childNodes[o])return;n[o]===t.childNodes[o]&&t.removeChild(t.childNodes[o]),n.splice(o,1)}else if(1===e.type){var i;r[e.item.key]?(i=t.removeChild(r[e.item.key]),n.splice(Array.prototype.indexOf.call(t.childNodes,r[e.item.key]),1)):i=d(e.item)?e.item.render():document.createTextNode(e.item),n.splice(o,0,i),t.insertBefore(i,t.childNodes[o]||null)}}))}(t,e.moves);break;case"props":!function(t,e){b(e,(function(n){void 0===e[n]?t.removeAttribute(n):function(t,e,n){switch(e){case"style":t.style.cssText=n;break;case"value":var r=t.tagName||"";"input"===(r=r.toLowerCase())||"textarea"===r?t.value=n:t.setAttribute(e,n);break;case"checked":!0===n?(t.setAttribute(e,"true"),t.checked=!0):(t.removeAttribute(e),t.checked=!1);break;default:t.setAttribute(e,n)}}(t,n,e[n])}))}(t,e.props);break;case"text":t.textContent?t.textContent=e.content:t.nodeValue=e.content;break;default:throw new Error("Unknown patch type "+e.type)}}))}(e,o)}(t,{index:0},e)};var _=function(t,e,n){var r=E(t);if(r){var o=r[e];o&&(o.apply(t,(null==n?void 0:n.arguments)||[]),t["$".concat(e,"Fired")]=!0)}},$=function(){function t(){i()(this,t),a()(this,"id",void 0),a()(this,"props",void 0),a()(this,"state",void 0),a()(this,"lastRender",void 0),a()(this,"$root",void 0),a()(this,"vNode",void 0),a()(this,"parent",void 0),a()(this,"$onInitFired",!1),a()(this,"childEvents",[])}return h()(t,[{key:"onInit",value:function(){}},{key:"init",value:function(){this.childEvents=[]}},{key:"setState",value:function(t){this.state=Object.assign(this.state,t),this.$onInitFired&&this.forceUpdate()}},{key:"forceUpdate",value:function(){var t=this.$render(ht.createElement),e=C(this.lastRender,t);this.lastRender=t,P(this.$root,e),_(this,"onUpdate")}},{key:"setProps",value:function(t){this.props=t}},{key:"extendScope",value:function(t){for(var e=0,n=Object.entries(t);e<n.length;e++){var r=f()(n[e],2),o=r[0],i=r[1];this[o]=i}}},{key:"dispatch",value:function(t,e){var n;if(this.parent){var r=null===(n=this.parent.childEvents.find((function(e){return e.childEvent===t})))||void 0===n?void 0:n.parentEvent;if(r)if(r.startsWith("set-")){var o=r.replace("set-","");this.parent.setState(a()({},o,e))}else{var i=E(this.parent)[r];if(!i)return;i.call(this.parent,e)}}}}]),t}();var U=function(t){return{_id:t&&t._id?t._id.toString():"0",key:t&&t.key?t.key.toString():"0",parent:t&&t.parent?t.parent:{_id:"0",key:"0"}}};function L(t){return t.prototype}var T=function(t,e){if(t&&e)for(var n=[].concat(u()(Object.getOwnPropertyNames(e)),u()(Object.keys(e))),r=0;r<n.length;r++){var o=n[r];t[o]||(t[o]=e[o])}};var M=function(t){for(var e=t,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];for(var i=0;i<r.length;i++)e=e.split(r[i][0]).join(r[i][1]);return e};function D(t,e){return e+t}function F(t,e){return t+e}function q(t){return"'".concat(t,"'")}var H=function(t){return"[object HTMLUnknownElement]"!=document.createElement(t).toString()};var W=function(t){return{dynamic:t.startsWith(":"),event:t.includes("@"),loop:t.includes("i-for"),model:t.includes("i-model"),conditional:t.includes("i-if"),customEvent:t.startsWith("i-on:")}};var G=function(t){var e=t.split(" in "),n=e[0],r=e[1].trim(),o=M(n.split(",")[1]||"",["(",""],[")",""]).trim();return{variable:M(n.split(",")[0]||"",["(",""],[")",""]).trim(),iterator:o,bunch:r}};function B(t){return/[A-Z]/.test(t)}function J(t,e){for(var n=t.split(""),r=0;r<n.length;r++)/[a-zA-Z]/.test(n[r])&&n[r]===n[r].toUpperCase()&&(n[r]=e+n[r]);return n.join("")}function V(t,e){for(var n=t.split(e),r=t.startsWith(e),o=0;o<n.length;o++){var i=n[o].charAt(0);0===o?r&&(i=i.toUpperCase()):i=i.toUpperCase(),n[o]=i+n[o].substring(1,n[o].length)}return n.join("")}var Z=function(t,e,n){for(var r="{",o=e,i=0;i<t.attributes.length;i++){var c=V(t.attributes[i].name,"irisisthebest"),a=M(t.attributes[i].value,["state","this.state"],["props","this.props"]),s=W(c),u=s.dynamic,l=s.event,f=s.loop,p=s.model,h=s.conditional,v=s.customEvent;if(u)r=F(r,'"'.concat(c.replace(":",""),'":')),r=F(r,u?"".concat(a):'"'.concat(a,'"'));else if(l){var d=c.split(".")[0],y=c.split(".")[1];r=F(r,'"on'.concat(d.replace("@",""),'":')),r=F(r,"() => { ".concat(y?{prevent:"event.preventDefault();",stop:"event.stopPropagation();"}[y]:""," this.").concat(a.includes("(")?a:F(a,"()")," }"))}else if(f){var m=G(a),b=m.variable,g=m.iterator,k=m.bunch;o="".concat(k,".map((").concat(b," ").concat(g?",".concat(g):"",") => ").concat(e,")")}else if(h)o="".concat(a," ? ").concat(e," : ' '");else if(p){var x=t.type,j={text:"oninput",checkbox:"onclick"}[x],w={text:"value",checkbox:"checked"}[x];j&&w?(r=F(r,F(q(w),":")),r=F(r,D(a,"this.state.")),r=F(r,","),r=F(r,F(q(j),":")),r=F(r,"() => { this.setState({ ".concat(a,": event.target.").concat(w," }) }"))):(r=F(r,F(q("model"),":")),r=F(r,D(a,"this.state.")),r=F(r,","),n.childEvents.push({childEvent:"set-model",parentEvent:"set-".concat(a)}))}else if(v){var S=c.split(":")[1],O=a;n.childEvents.push({childEvent:S,parentEvent:O})}else r=F(r,F(q(c),":")),r=F(r,q(a));r=F(r,",")}return r=F(r,"}"),{propString:r=M(r,["{,","{"],[",}","}"],["class","className"],["classname","className"]),handledResult:o}};var z=function(t){for(var e=t.split("/>"),n="",r=0;r<e.length-1;r++){var o=e[r].split("<");n+="".concat(e[r],"></").concat(o[o.length-1].split(" ")[0],">")}return n+e[e.length-1]},X="Iris.createElement(".concat("TAG_NAME",",").concat("PROPS",",").concat("CHILDREN",")");var K=function(t,e){var n=document.createElement("div"),r=(t.match(/\b\s(.*?)\b=/gm)||[]).map((function(t){return t.replace("=","")})),o=[];t=z(t);for(var i=0;i<r.length;i++){var c=w(r[i]," "),a=r[i].split(" ")[c];B(a)&&o.push({original:a,marked:J(a,"irisisthebest")})}for(var s=0;s<o.length;s++)t=M(t,[" ".concat(o[s].original,"=")," ".concat(o[s].marked,"=")]);n.innerHTML=t;var u="return function render() { return "+function t(n,r){var o=X,i=null==n?void 0:n.tagName;if(!i){var c=n.nodeValue.trim();return q(c=M(c,["{{","'+"],["}}","+'"],["state","this.state"],["props","this.props"]))}for(var a=n.childNodes,s={},u=0,l=Object.entries(e.components||{});u<l.length;u++){var p=f()(l[u],2),h=p[0],v=p[1];s[h.toLowerCase()]={key:h,value:v}}H(i.toLowerCase())?o=o.replace("TAG_NAME","'".concat(i.toLowerCase(),"'")):i.toLowerCase()in s&&(o=o.replace("TAG_NAME","".concat(s[i.toLowerCase()].key)));var d=Z(n,o,e),y=d.propString,m=d.handledResult;o=(o=m).replace("PROPS",y);var b=[];return a.forEach((function(e){var n=t(e,r);b.push(n)})),b.forEach((function(t){t.split("'").join("").trim()&&(o=o.replace(",".concat("CHILDREN"),",".concat(t,",").concat("CHILDREN")))})),o=o.replace(",".concat("CHILDREN"),"")}(n=n.firstElementChild)+"}";return Function(u)},Q=function(){function t(e,n,r){var o=this;if(i()(this,t),a()(this,"tagName",void 0),a()(this,"props",void 0),a()(this,"children",void 0),a()(this,"key",void 0),a()(this,"component",void 0),a()(this,"scope",void 0),a()(this,"count",void 0),"Function"===v(e)){var c=e,s=L(c).constructor.name;T(c.prototype,$.prototype);var u=U(n),l=u.key,f=u.parent;if(l){var p=ht.components.find((function(t){return t.key===l&&t.name===s}));p?this.component=p.instance:(this.component=new c,ht.components.push({instance:this.component,name:s,key:l,parent:f}))}else this.component=new c;if(this.component.init(),this.component.setProps(n),this.component.extendScope(ht.toInject),!L(c).$render){var h=this.component.render.apply(this.component,[ht.createElement]);y(h)?L(c).$render=K(h,this.component)():L(c).$render=this.component.render}L(c).$render.toString().includes("___mod")||(L(c).$render=O(this.component.$render,s,l)),this.component.lastRender=this.component.$render.apply(this.component,[ht.createElement]),this.component.vNode=this,e=this.component.lastRender.tagName,r=this.component.lastRender.children}this.tagName=e,this.props=d(n)?n:{},this.children=r||!m(this.props)&&(y(n)&&[n]||"Array"===v(n)&&n)||[],this.key=this.props?this.props.key:void 0;var b=0;g(this.children,(function(e,n){e instanceof t?b+=e.count:o.children[n]=""+e,b++})),this.count=b}return h()(t,[{key:"render",value:function(){var e=document.createElement(this.tagName);if(this.isComponent()){var n=this.component;if(!n.parent){if(this.props){var r=this.props.parent;if(r){var o=ht.components.find((function(t){return t.key===r.key&&t.name===r.name}));o&&(n.parent=o.instance)}}!n.parent&&ht.vApp.component&&(n.parent=ht.vApp.component)}n.lastRender&&T(this.props,n.lastRender.props)}for(var i=0,c=Object.entries(this.props);i<c.length;i++){var a=f()(c[i],2),s=a[0],u=a[1];if(!s.startsWith("on")){var l=s in e;if(!1===u||!0===u){u?e.setAttribute(s,""):e.removeAttribute(s);break}l&&e.setAttribute("className"!==s?s:"class",u)}}for(var p=0,h=Object.entries(this.props);p<h.length;p++){var v=f()(h[p],2),d=v[0],y=v[1];d.startsWith("on")&&x(e,d.replace("on","").toLocaleLowerCase(),y)}return g(this.children,(function(n){var r=n instanceof t?n.render():document.createTextNode(n);n instanceof t&&n.isComponent()&&ht.hook(n.component,"beforeRender",{arguments:[r]}),e.appendChild(r)})),this.isComponent()&&(this.component.$onInitFired||(ht.hook(this.component,"onInit"),this.component.$onInitFired=!0),this.component.$root=e),e}},{key:"isComponent",value:function(){return Boolean(this.component)}}]),t}();var Y=function(){function t(){i()(this,t)}return h()(t,[{key:"injectIntoComponent",value:function(){return{}}},{key:"injectIntoIris",value:function(){return{}}}]),t}(),tt=function(){function t(){i()(this,t),a()(this,"items",void 0),this.items=[]}return h()(t,[{key:"push",value:function(t){this.items.push(t)}},{key:"find",value:function(t){return this.items.find(t)}},{key:"remove",value:function(t){var e=this.items.findIndex(t);this.items.splice(e,1)}},{key:"getUnique",value:function(t){var e;return null===(e=this.items.find((function(e){return e.instance.id===t})))||void 0===e?void 0:e.instance}}]),t}();var et=function(t){Object.assign(ht.toInject,t.injectIntoComponent());for(var e=0,n=Object.entries(t.injectIntoIris());e<n.length;e++){var r=f()(n[e],2),o=r[0],i=r[1];Object.defineProperty(ht,o,{value:i})}};function nt(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}var rt=function(){function t(){i()(this,t),a()(this,"items",void 0),this.items=[]}return h()(t,[{key:"put",value:function(t,e,n){var r=this.items.find((function(e){return e.key===t}));r?r.variations.find((function(t){return nt(t.args,e)}))||r.variations.push({args:e,result:n}):this.items.push({key:t,variations:[{args:e,result:n}]})}},{key:"find",value:function(t,e){var n=this.items.find((function(e){return e.key===t}));if(n)return n.variations.find((function(t){return nt(t.args,e)}))}}]),t}(),ot=n(5),it=n.n(ot),ct=n(6),at=n.n(ct),st=n(3),ut=n.n(st);function lt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=ut()(t);if(e){var o=ut()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return at()(this,n)}}var ft=function(t){it()(n,t);var e=lt(n);function n(){return i()(this,n),e.apply(this,arguments)}return h()(n,[{key:"$render",value:function(t){return t("div",null)}}]),n}($),pt=function t(){i()(this,t)};a()(pt,"cache",void 0),a()(pt,"components",void 0),a()(pt,"Component",void 0),a()(pt,"Plugin",void 0),a()(pt,"install",void 0),a()(pt,"toInject",{}),a()(pt,"createElement",void 0),a()(pt,"vApp",void 0),a()(pt,"mount",void 0),a()(pt,"Empty",void 0),a()(pt,"hook",void 0),pt.cache=new rt,pt.components=new tt,pt.Component=$,pt.hook=_,pt.Empty=ft,pt.Plugin=Y,pt.install=et,pt.createElement=function(t,e){for(var n,r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];var c=(o||[]).length>0,a=c?(n=[]).concat.apply(n,u()(o)):[];return new Q(t,e,a)},pt.mount=function(t,e){var n=y(e)?document.querySelector(e):e;ht.vApp=t;var r,o,i=t.render();return n?n.replaceWith(i):(r="Target element not found. Provided target:",o=e,console.error("[Iris]: ".concat(r),o)),t.component&&(t.component.$prepared=!0,t.component.$onInitFired=!0,_(t.component,"onInit")),t};var ht=pt,vt=n(8),dt=n.n(vt);function yt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=ut()(t);if(e){var o=ut()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return at()(this,n)}}var mt=function(t){it()(n,t);var e=yt(n);function n(t){var r;return i()(this,n),r=e.call(this),a()(dt()(r),"state",{}),Object.assign(r.state,t),r}return h()(n,[{key:"setState",value:function(t){this.state=Object.assign(this.state,t),ht.vApp.component&&ht.vApp.component.forceUpdate()}},{key:"injectIntoComponent",value:function(){return{$store:{state:this.state,setState:this.setState}}}}]),n}(ht.Plugin);function bt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=ut()(t);if(e){var o=ut()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return at()(this,n)}}var gt=function(t){it()(n,t);var e=bt(n);function n(){return i()(this,n),e.apply(this,arguments)}return h()(n,[{key:"request",value:function(t){return new Promise((function(e,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4==this.readyState&&200==this.status&&e({data:JSON.parse(this.responseText),status:this.status,url:this.responseURL})},r.open(t.method,t.url,!0),r.send()}))}},{key:"injectIntoComponent",value:function(){return{$ajax:{request:this.request}}}}]),n}(ht.Plugin);var kt=function(t){return window.location.href.replace("".concat(window.location.origin).concat(t||""),"")};var xt=function(){var t=this,e=Iris.components.find((function(e){return e.key===t.state.route}));e&&Iris.hook(e.instance,"onLeave");var n=kt(St.baseUrl);t.setState({route:n});var r=Iris.components.find((function(t){return t.key===n}));r&&Iris.hook(r.instance,"onEnter")},jt=function(){function t(){i()(this,t),a()(this,"id","router.view"),a()(this,"state",{route:kt(St.baseUrl)})}return h()(t,[{key:"onInit",value:function(){var t=this,e=history.pushState;history.pushState=function(){e.apply(history,arguments),xt.call(t)},window.onpopstate=function(){xt.call(t)}}},{key:"$render",value:function(t){var e=this;return t("div",null,t(this.$router.routes.find((function(t){return t.path===e.state.route})).component,{key:this.state.route}))}}]),t}(),wt=function(){function t(e){var n=e.routes,r=e.baseUrl;i()(this,t),a()(this,"routes",void 0),this.routes=n,t.baseUrl=r||"/"}return h()(t,[{key:"go",value:function(e){window.history.pushState("","",e);var n=Iris.components.getUnique("router.view");null==n||n.setState({route:e.replace(t.baseUrl,"")})}},{key:"injectIntoComponent",value:function(){return{$router:{go:this.go,routes:this.routes}}}},{key:"injectIntoIris",value:function(){return{Router:jt}}}]),t}();a()(wt,"baseUrl",void 0);var St=wt;r(ht,"Iris"),r(mt,"StateManager"),r(gt,"Ajax"),r(St,"Router")}]);
//# sourceMappingURL=iris.js.map