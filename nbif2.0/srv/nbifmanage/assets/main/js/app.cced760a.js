(function(e){function t(t){for(var r,a,c=t[0],i=t[1],l=t[2],s=0,p=[];s<c.length;s++)a=c[s],o[a]&&p.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(p.length)p.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},u=[];function a(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"71d1bac3"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=r);var u,i=document.createElement("script");i.charset="utf-8",i.timeout=120,c.nc&&i.setAttribute("nonce",c.nc),i.src=a(e),u=function(t){i.onerror=i.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+u+")");a.type=r,a.request=u,n[1](a)}o[e]=void 0}};var l=setTimeout(function(){u({type:"timeout",target:i})},12e4);i.onerror=i.onload=u,document.head.appendChild(i)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/main/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var f=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"031c":function(e,t,n){},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home")],1)},u=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("HomePage")},c=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-carousel",{attrs:{interval:4e3,type:"card",height:"400px"}},e._l(e.items,function(t){return n("el-carousel-item",{key:t},[n("h3",{staticClass:"medium"},[e._v(e._s(t))])])}),1)},l=[],s={name:"HomePage",props:{},data:function(){return{items:["sanity","regression","actions"]}}},f=s,p=(n("9cc2"),n("2877")),d=Object(p["a"])(f,i,l,!1,null,"b1b1ae06",null),m=d.exports,v={name:"home",components:{HomePage:m}},h=v,b=Object(p["a"])(h,a,c,!1,null,null,null),g=b.exports,y={name:"app",components:{Home:g}},w=y,_=(n("034f"),Object(p["a"])(w,o,u,!1,null,null,null)),j=_.exports,O=n("2f62");r["default"].use(O["a"]);var P=new O["a"].Store({state:{},mutations:{},actions:{}}),x=n("8c4f");r["default"].use(x["a"]);var S=new x["a"]({routes:[{path:"/",name:"home",component:g},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),k=n("5c96"),E=n.n(k);n("c69f");r["default"].use(E.a),r["default"].config.productionTip=!1,new r["default"]({store:P,router:S,render:function(e){return e(j)}}).$mount("#app")},"64a9":function(e,t,n){},"9cc2":function(e,t,n){"use strict";var r=n("031c"),o=n.n(r);o.a},c69f:function(e,t,n){}});
//# sourceMappingURL=app.cced760a.js.map