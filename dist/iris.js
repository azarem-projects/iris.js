!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=19)}([function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var r=n(14),o=n(15),i=n(10),c=n(16);t.exports=function(t,e){return r(t)||o(t,e)||i(t,e)||c()}},function(t,e,n){var r=n(17);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(18),o=n(8);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?o(t):e}},function(t,e,n){var r=n(11),o=n(12),i=n(10),c=n(13);t.exports=function(t){return r(t)||o(t)||i(t)||c()}},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){var r=n(9);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e,n){var r=n(9);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){"use strict";n.r(e);var r=function(t,e){window[e]=t},o=n(1),i=n.n(o),c=n(0),a=n.n(c),u=n(7),s=n.n(u),p=n(4),f=n.n(p),l=n(2),h=n.n(l);function d(t){return Object.prototype.toString.call(t).replace(/\[object\s|\]/g,"")}function v(t){return"Object"===d(t)}function y(t){return"String"===d(t)}function m(t){return v(t)&&"{}"!=JSON.stringify(t)}function b(t,e){m(t)&&Object.keys(t).forEach(e)}function g(t,e){t.length&&t.forEach(e)}var k={};function x(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e in k||(k[e]=[]),k[e].push({node:t,handler:n,capture:r}),t.addEventListener(e,n,r)}var j=function(t){var e=t.indexOf("render("),n=t.indexOf(")",e),r=t.substring(e,n).replace("render(","");if(r)return r.replace("return function(","");var o=t.indexOf("return ",e),i=t.indexOf("(",o);return t.substring(o,i).replace("return ","")};var w=function(t,e){return t.split(e).length-1};var _=function(t,e,n,r){for(var o=r.__id,i=r._key,c=parseInt(e)+1,a=j(t),u=t.split("".concat(a,"(")),s=[],p=0;p<u.length;p++){var f=u[p].split(",")[0];w(f," ")>1||f.includes("'")||f.includes('"')||f.includes("`")||s.push(f)}if(s)for(p=0;p<s.length;p++){for(var l=0;l<w(t,"".concat(s[p],", null"));l++)t=t.replace("".concat(s[p],", null"),"".concat(s[p],",{parent:{_id:'").concat(o,"',key:'").concat(i,"'},_id:'").concat(c++,"'}"));for(l=0;l<w(t,"".concat(s[p],",null"));l++)t=t.replace("".concat(s[p],",null"),"".concat(s[p],",{parent:{_id:'").concat(o,"',key:'").concat(i,"'},_id:'").concat(c++,"'}"));for(l=0;l<w(t,"".concat(s[p],", {"));l++)t=t.replace("".concat(s[p],", {"),"".concat(s[p],",{parent:{_id:'").concat(o,"',key:'").concat(i,"'},_id:'").concat(c++,"',"));for(l=0;l<w(t,"".concat(s[p],",{"));l++)t=t.replace("".concat(s[p],",{"),"".concat(s[p],",{parent:{_id:'").concat(o,"',key:'").concat(i,"'},_id:'").concat(c++,"',"))}return t};var O=function(t,e,n,r){var o=r.__id,i=r._key,c=t.toString().replace("function","return function");return c.includes("return function")||(c="return function ".concat(c)),c=(c=_(c,e,n,{__id:o,_key:i})).split("return").join("var ___mod;return"),Function(c)()};function S(t){return t.__proto__}function I(t,e){for(var n={},r=[],o=0,i=t.length;o<i;o++){var c=t[o],a=N(c,e);a?n[a]=o:r.push(c)}return{keyIndex:n,free:r}}function N(t,e){if(t&&e)return"string"==typeof e?t[e]:e(t)}var R=function(t,e,n){for(var r,o,i=I(t,n),c=I(e,n),a=c.free,u=i.keyIndex,s=c.keyIndex,p=[],f=[],l=0,h=0;l<t.length;){if(o=N(r=t[l],n))if(s.hasOwnProperty(o)){var d=s[o];f.push(e[d])}else f.push(null);else{var v=a[h++];f.push(v||null)}l++}var y=f.slice(0);for(l=0;l<y.length;)null===y[l]?(k(l),j(l)):l++;for(var m=l=0;l<e.length;){o=N(r=e[l],n);var b=y[m],g=N(b,n);if(b)if(o===g)m++;else if(u.hasOwnProperty(o))N(y[m+1],n)===o?(k(l),j(m),m++):x(l,r);else x(l,r);else x(l,r);l++}function k(t){var e={index:t,type:0};p.push(e)}function x(t,e){var n={index:t,item:e,type:1};p.push(n)}function j(t){y.splice(t,1)}return{moves:p,children:f}};function P(t,e,n,r){var o=[];if(null!==e){if(y(t)&&y(e))t!==e&&o.push({type:"text",content:e});else if(t.tagName===e.tagName&&t.key===e.key){if(m(t.props)||m(e.props)){var i=function(t,e){var n=!1,r=t.props||{},o=e.props||{},i={};return b(r,(function(t){o[t]===r[t]&&r.hasOwnProperty(t)||(!n&&(n=!0),i[t]=o[t])})),n?i:null}(t,e);t.component||i&&o.push({type:"props",props:i})}!m(e.props)&&(e.props||{}).hasOwnProperty("ignore")||(t.children.length||e.children.length)&&function(t,e,n,r,o){var i=R(t,e,"key");e=i.children,i.moves.length&&o.push({type:"reorder",moves:i.moves});var c=null,a=n;g(t,(function(t,n){var o=e[n];a=c&&c.count?a+c.count+1:a+1,t!==o&&P(t,o,a,r),c=t}))}(t.children,e.children,n,r,o)}else o.push({type:"replace",node:e});o.length&&(r[n]=o)}}var C=function(t,e){var n={};return P(t,e,0,n),n};var A=function(t,e){!function t(e,n,r){var o=r[n.index];e.childNodes&&g(e.childNodes,(function(e){n.index++,t(e,n,r)})),o&&function(t,e){g(e,(function(e){switch(e.type){case"replace":var n=y(e.node)?document.createTextNode(e.node):e.node.render();t.parentNode.replaceChild(n,t);break;case"reorder":!function(t,e){var n=function(t){if(!t)return[];var e=[];return g(t,(function(t){e.push(t)})),e}(t.childNodes),r={};g(n,(function(t){if(1===t.nodeType){var e=t.getAttribute("key");e&&(r[e]=t)}})),g(e,(function(e){var o=e.index;if(0===e.type){if(!t.childNodes[o])return;n[o]===t.childNodes[o]&&t.removeChild(t.childNodes[o]),n.splice(o,1)}else if(1===e.type){var i;r[e.item.key]?(i=t.removeChild(r[e.item.key]),n.splice(Array.prototype.indexOf.call(t.childNodes,r[e.item.key]),1)):i=v(e.item)?e.item.render():document.createTextNode(e.item),n.splice(o,0,i),t.insertBefore(i,t.childNodes[o]||null)}}))}(t,e.moves);break;case"props":!function(t,e){b(e,(function(n){void 0===e[n]?t.removeAttribute(n):function(t,e,n){switch(e){case"style":t.style.cssText=n;break;case"value":var r=t.tagName||"";"input"===(r=r.toLowerCase())||"textarea"===r?t.value=n:t.setAttribute(e,n);break;default:t.setAttribute(e,n)}}(t,n,e[n])}))}(t,e.props);break;case"text":t.textContent?t.textContent=e.content:t.nodeValue=e.content;break;default:throw new Error("Unknown patch type "+e.type)}}))}(e,o)}(t,{index:0},e)},E=function(){function t(e){i()(this,t),a()(this,"id",void 0),a()(this,"props",void 0),a()(this,"state",void 0),a()(this,"lastRender",void 0),a()(this,"$root",void 0),a()(this,"vNode",void 0),a()(this,"parent",void 0),a()(this,"$onInitFired",!1),this.props=e}return h()(t,[{key:"onInit",value:function(){}},{key:"setState",value:function(t){this.state=Object.assign(this.state,t),this.$onInitFired&&this.forceUpdate()}},{key:"forceUpdate",value:function(){console.time("Update");var t=this.render(tt.createElement),e=C(this.lastRender,t);this.lastRender=t,A(this.$root,e),console.timeEnd("Update")}},{key:"setProps",value:function(t){this.props=t}},{key:"extendScope",value:function(t){for(var e=0,n=Object.entries(t);e<n.length;e++){var r=f()(n[e],2),o=r[0],i=r[1];this[o]=i}}},{key:"dispatch",value:function(t,e){if(this.parent){var n=S(this.parent)[t];n&&n.call(this.parent,e)}}}]),t}();var L=function(t,e,n){var r=S(t);if(r){var o=r[e];o&&(o.apply(t,(null==n?void 0:n.arguments)||[]),t["$".concat(e,"Fired")]=!0)}};var T=function(t){return{_id:t&&t._id?t._id.toString():"0",key:t&&t.key?t.key.toString():"0",parent:t&&t.parent?t.parent:{_id:"0",key:"0"}}};function U(t){return t.prototype}var $=function(t,e){for(var n=Object.getOwnPropertyNames(e.prototype),r=0;r<n.length;r++){var o=n[r];t.prototype[o]||(t.prototype[o]=e.prototype[n[r]])}};var D=function(t,e){var n=document.createElement("div");n.innerHTML=t;var r="return function render() { return "+function t(n,r){var o=null==n?void 0:n.tagName;if(!o){var i=n.nodeValue.trim();return i=(i=(i=(i="('"+(i=(i=i.split("{{").join("' + (")).split("}}").join(") + '"))+"')").split("props").join("this.props")).split("state").join("this.state")).split("(").join("").split(")").join(""),"".concat(i)}for(var c=n.childNodes,a="Iris.createElement(TAGNAME,PROPS,CHILDREN)",u={},s=0,p=Object.entries(e.components||{});s<p.length;s++){var l=f()(p[s],2),h=l[0],d=l[1];u[h.toLowerCase()]={old:h,value:d}}a=a.replace("TAGNAME",o.toLowerCase()in u?"".concat(u[o.toLowerCase()].old):"'".concat(o.toLowerCase(),"'"));for(var v="{",y=0;y<n.attributes.length;y++){var m=n.attributes[y].name,b=m.includes(":"),g=n.attributes[y].value;b&&(g=(g=g.split("state").join("this.state")).split("props").join("this.props"),m=m.replace(":","")),v+='"'.concat(m,'":'),v+=b?"".concat(g):'"'.concat(g,'"'),v+=","}v+="}",a=a.replace("PROPS",v);var k=[];return c.forEach((function(e){var n=t(e,r);k.push(n)})),k.forEach((function(t){t.split("'").join("").trim()&&(a=a.replace(",CHILDREN",",".concat(t,",CHILDREN")))})),a=a.replace(",CHILDREN","")}(n)+"}";return Function(r)},M=function(){function t(e,n,r){var o=this;if(i()(this,t),a()(this,"tagName",void 0),a()(this,"props",void 0),a()(this,"children",void 0),a()(this,"parent",void 0),a()(this,"key",void 0),a()(this,"component",void 0),a()(this,"scope",void 0),a()(this,"count",void 0),"Function"===d(e)){var c=e;$(c,E);var u=T(n),s=u._id,p=u.key,f=u.parent;if(s){var l=tt.components.find((function(t){return t.key===p&&t.id===s&&t.parent.key===f.key}));l?this.component=l.instance:(this.component=new c,tt.components.push({instance:this.component,id:s,key:p,parent:f}))}else this.component=new c;this.component.setProps(n),this.component.extendScope(tt.toInject),U(c).render||(U(c).render=D(this.component.template(),this.component)()),U(c).render.toString().includes("___mod")||(U(c).render=O(this.component.render,s,p,{__id:s,_key:p})),this.component.lastRender=this.component.render.apply(this.component,[tt.createElement]),this.component.vNode=this,e=this.component.lastRender.tagName,r=this.component.lastRender.children}this.tagName=e,this.props=v(n)?n:{},this.children=r||!m(this.props)&&(y(n)&&[n]||"Array"===d(n)&&n)||[],this.key=this.props?this.props.key:void 0;var h=0;g(this.children,(function(e,n){e instanceof t?h+=e.count:o.children[n]=""+e,h++})),this.count=h}return h()(t,[{key:"render",value:function(){var e=document.createElement(this.tagName);if(this.isComponent()&&!this.component.parent){if(this.props){var n=this.props.parent;if(n){var r=tt.components.find((function(t){return t.id===n._id&&t.key===n.key}));r&&(this.component.parent=r.instance)}}!this.component.parent&&tt.vApp.component&&(this.component.parent=tt.vApp.component)}for(var o=0,i=Object.entries(this.props);o<i.length;o++){var c=f()(i[o],2),a=c[0],u=c[1];if(a.startsWith("on"))x(e,a.replace("on","").toLocaleLowerCase(),u);else a in e&&e.setAttribute("className"!==a?a:"class",u)}return g(this.children,(function(n){var r=n instanceof t?n.render():document.createTextNode(n);n instanceof t&&n.isComponent()&&tt.hook(n.component,"beforeRender",{arguments:[r]}),e.appendChild(r)})),this.isComponent()&&(this.component.$onInitFired||(tt.hook(this.component,"onInit"),this.component.$onInitFired=!0),this.component.$root=e),e}},{key:"isComponent",value:function(){return Boolean(this.component)}}]),t}();var F=function(){function t(){i()(this,t)}return h()(t,[{key:"injectIntoComponent",value:function(){return{}}},{key:"injectIntoIris",value:function(){return{}}}]),t}(),q=function(){function t(){i()(this,t),a()(this,"items",void 0),this.items=[]}return h()(t,[{key:"push",value:function(t){this.items.push(t)}},{key:"find",value:function(t){return this.items.find(t)}},{key:"remove",value:function(t){var e=this.items.findIndex(t);this.items.splice(e,1)}},{key:"getUnique",value:function(t){var e;return null===(e=this.items.find((function(e){return e.instance.id===t})))||void 0===e?void 0:e.instance}}]),t}();var H=function(t){Object.assign(tt.toInject,t.injectIntoComponent());for(var e=0,n=Object.entries(t.injectIntoIris());e<n.length;e++){var r=f()(n[e],2),o=r[0],i=r[1];Object.defineProperty(tt,o,{value:i})}};function B(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}var G=function(){function t(){i()(this,t),a()(this,"items",void 0),this.items=[]}return h()(t,[{key:"put",value:function(t,e,n){var r=this.items.find((function(e){return e.key===t}));r?r.variations.find((function(t){return B(t.args,e)}))||r.variations.push({args:e,result:n}):this.items.push({key:t,variations:[{args:e,result:n}]})}},{key:"find",value:function(t,e){var n=this.items.find((function(e){return e.key===t}));if(n)return n.variations.find((function(t){return B(t.args,e)}))}}]),t}(),J=n(5),V=n.n(J),W=n(6),X=n.n(W),z=n(3),K=n.n(z);function Q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=K()(t);if(e){var o=K()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return X()(this,n)}}var Y=function(t){V()(n,t);var e=Q(n);function n(){return i()(this,n),e.apply(this,arguments)}return h()(n,[{key:"render",value:function(t){return t("div",null)}}]),n}(E),Z=function t(){i()(this,t)};a()(Z,"cache",void 0),a()(Z,"components",void 0),a()(Z,"Component",void 0),a()(Z,"Plugin",void 0),a()(Z,"install",void 0),a()(Z,"toInject",{}),a()(Z,"createElement",void 0),a()(Z,"vApp",void 0),a()(Z,"mount",void 0),a()(Z,"Empty",void 0),a()(Z,"hook",void 0),Z.cache=new G,Z.components=new q,Z.Component=E,Z.hook=L,Z.Empty=Y,Z.Plugin=F,Z.install=H,Z.createElement=function(t,e){for(var n,r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];var c=(o||[]).length>0,a=c?(n=[]).concat.apply(n,s()(o)):[];return new M(t,e,a)},Z.mount=function(t,e){var n=y(e)?document.querySelector(e):e;tt.vApp=t;var r,o,i=t.render();return n?n.replaceWith(i):(r="Target element not found. Provided target:",o=e,console.error("[Iris]: ".concat(r),o)),t.component&&(t.component.$prepared=!0,t.component.$onInitFired=!0,L(t.component,"onInit")),t};var tt=Z,et=n(8),nt=n.n(et);function rt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=K()(t);if(e){var o=K()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return X()(this,n)}}var ot=function(t){V()(n,t);var e=rt(n);function n(t){var r;return i()(this,n),r=e.call(this),a()(nt()(r),"state",{}),Object.assign(r.state,t),r}return h()(n,[{key:"setState",value:function(t){this.state=Object.assign(this.state,t),tt.vApp.component&&tt.vApp.component.forceUpdate()}},{key:"injectIntoComponent",value:function(){return{$store:{state:this.state,setState:this.setState}}}}]),n}(tt.Plugin);function it(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=K()(t);if(e){var o=K()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return X()(this,n)}}var ct=function(t){V()(n,t);var e=it(n);function n(){return i()(this,n),e.apply(this,arguments)}return h()(n,[{key:"request",value:function(t){return new Promise((function(e,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4==this.readyState&&200==this.status&&e({data:JSON.parse(this.responseText),status:this.status,url:this.responseURL})},r.open(t.method,t.url,!0),r.send()}))}},{key:"injectIntoComponent",value:function(){return{$ajax:{request:this.request}}}}]),n}(tt.Plugin);var at=function(t){return window.location.href.replace("".concat(window.location.origin).concat(t||""),"")};var ut=function(){var t=this,e=Iris.components.find((function(e){return e.key===t.state.route}));e&&Iris.hook(e.instance,"onLeave");var n=at(ft.baseUrl);t.setState({route:n});var r=Iris.components.find((function(t){return t.key===n}));r&&Iris.hook(r.instance,"onEnter")},st=function(){function t(){i()(this,t),a()(this,"id","router.view"),a()(this,"state",{route:at(ft.baseUrl)})}return h()(t,[{key:"onInit",value:function(){var t=this,e=history.pushState;history.pushState=function(){e.apply(history,arguments),ut.call(t)},window.onpopstate=function(){ut.call(t)}}},{key:"render",value:function(t){var e=this;return t("div",null,t(this.$router.routes.find((function(t){return t.path===e.state.route})).component,{key:this.state.route}))}}]),t}(),pt=function(){function t(e){var n=e.routes,r=e.baseUrl;i()(this,t),a()(this,"routes",void 0),this.routes=n,t.baseUrl=r||"/"}return h()(t,[{key:"go",value:function(e){window.history.pushState("","",e);var n=Iris.components.getUnique("router.view");null==n||n.setState({route:e.replace(t.baseUrl,"")})}},{key:"injectIntoComponent",value:function(){return{$router:{go:this.go,routes:this.routes}}}},{key:"injectIntoIris",value:function(){return{Router:st}}}]),t}();a()(pt,"baseUrl",void 0);var ft=pt;r(tt,"Iris"),r(ot,"StateManager"),r(ct,"Ajax"),r(ft,"Router")}]);
//# sourceMappingURL=iris.js.map