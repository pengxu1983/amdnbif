(function(e){function t(t){for(var a,r,i=t[0],l=t[1],u=t[2],s=0,d=[];s<i.length;s++)r=i[s],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var i=n[r];0!==o[i]&&(a=!1)}a&&(c.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},o={app:0},c=[];function i(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"637f5457","chunk-05b54edd":"a81082c6","chunk-7b1b6683":"7eb6077c","chunk-146e24f2":"1e6cabbb","chunk-1fccb7ee":"6189a36d","chunk-418667c6":"220591ee"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-05b54edd":1,"chunk-146e24f2":1,"chunk-1fccb7ee":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-05b54edd":"ed1bcd8a","chunk-7b1b6683":"31d6cfe0","chunk-146e24f2":"cb7376c4","chunk-1fccb7ee":"2647999b","chunk-418667c6":"31d6cfe0"}[e]+".css",o=l.p+a,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var u=c[i],s=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(s===a||s===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],s=u.getAttribute("data-href");if(s===a||s===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete r[e],f.parentNode.removeChild(f),n(c)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=c);var u,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=i(e);var d=new Error;u=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:s})}),12e4);s.onerror=s.onload=u,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"0dfc":function(e,t,n){},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("HomePage")],1)},i=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[n("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[e._v("NBIF Main Page")]),n("ul",{staticClass:"navbar-nav px-3"},[n("li",{staticClass:"nav-item text-nowrap"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-toggle":"modal","data-target":"#version"}},[e._v(e._s(this.versionRecord[0].versionID))])])])])]),n("el-main",[n("el-carousel",{attrs:{interval:4e3,type:"card",height:"400px"}},e._l(e.items,(function(t){return n("el-carousel-item",{key:t},[n("a",{on:{click:function(n){return e.gotourl(t)}}},[n("h3",[e._v(e._s(t))])])])})),1),n("div",{staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true",id:"version"}},[n("div",{staticClass:"modal-dialog modal-lg"},[n("div",{staticClass:"modal-content"},[[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.versionRecord,border:""}},[n("el-table-column",{attrs:{prop:"versionID",label:"versionID",width:"180"}}),n("el-table-column",{attrs:{prop:"versionLog",label:"versionLog"}})],1)]],2)])]),n("div",[n("el-header",[n("h3",[e._v(e._s(e.currentvacation))])]),n("el-main",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.vacations,border:""}},[n("el-table-column",{attrs:{prop:"realname",label:"Name"}}),n("el-table-column",{attrs:{prop:"begin",label:"Vacation Start"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-date-picker",{attrs:{type:"date",placeholder:"date"},model:{value:t.row.begin,callback:function(n){e.$set(t.row,"begin",n)},expression:"scope.row.begin"}})]}}])}),n("el-table-column",{attrs:{prop:"end",label:"Vacation End"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-date-picker",{attrs:{type:"date",placeholder:"date"},model:{value:t.row.end,callback:function(n){e.$set(t.row,"end",n)},expression:"scope.row.end"}})]}}])}),n("el-table-column",{attrs:{prop:"cellphone",label:"Cell Phone"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{placeholder:"cell phone"},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})]}}])})],1)],1),n("el-footer",[n("el-button",{attrs:{type:"primary"}},[e._v("Add")])],1)],1)],1)],1)},u=[],s={name:"HomePage",props:{},data:function(){return{currentvacation:"National Day",vacations:[],items:["regression","config","sanity","metrics"],versionRecord:[{versionID:"3.0.2",versionLog:"Metrics page Added"},{versionID:"3.0.1",versionLog:"router to Regression page added"},{versionID:"3.0.0",versionLog:"Version 3.0.0 initial"}]}},methods:{gotourl:function(e){this.$router.push({name:e})},getvacations:function(){this.$http.post("/config/users/vacation",{vacationname:this.currentvacation}).then((function(e){"ok"==e.body.ok&&(this.vacations=JSON.parse(e.body.vacations))}))}}},d=s,f=(n("d6ff"),n("2877")),p=Object(f["a"])(d,l,u,!1,null,"3317e96e",null),b=p.exports,h={name:"home",components:{HomePage:b}},m=h,v=Object(f["a"])(m,c,i,!1,null,null,null),g=v.exports,y={name:"app",components:{Home:g}},k=y,w=(n("034f"),Object(f["a"])(k,r,o,!1,null,null,null)),_=w.exports,x=n("8c4f");a["default"].use(x["a"]);var P=new x["a"]({routes:[{path:"/",name:"home",component:g},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/regression",name:"regression",component:function(){return Promise.all([n.e("chunk-7b1b6683"),n.e("chunk-146e24f2")]).then(n.bind(null,"d894"))}},{path:"/config",name:"config",component:function(){return Promise.all([n.e("chunk-7b1b6683"),n.e("chunk-418667c6")]).then(n.bind(null,"1071"))}},{path:"/sanity",name:"sanity",component:function(){return n.e("chunk-05b54edd").then(n.bind(null,"3486"))}},{path:"/metrics",name:"metrics",component:function(){return Promise.all([n.e("chunk-7b1b6683"),n.e("chunk-1fccb7ee")]).then(n.bind(null,"79cd"))}}]}),C=n("2f62");a["default"].use(C["a"]);var S=new C["a"].Store({state:{},mutations:{},actions:{}}),O=n("5c96"),j=n.n(O);n("c69f");a["default"].use(j.a);n("0fae"),n("e609"),n("ab8b"),n("0deb"),n("313e");var E=n("28dd");a["default"].use(j.a),a["default"].config.productionTip=!1,a["default"].use(E["a"]),new a["default"]({router:P,store:S,render:function(e){return e(_)}}).$mount("#app")},"64a9":function(e,t,n){},c69f:function(e,t,n){},d6ff:function(e,t,n){"use strict";var a=n("0dfc"),r=n.n(a);r.a}});
//# sourceMappingURL=app.8f9c52d1.js.map