(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d83b9"],{"79cd":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("MetricsPage")},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-header",[n("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[n("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[e._v("NBIF Main Page")]),n("ul",{staticClass:"navbar-nav px-3"},[n("li",{staticClass:"nav-item text-nowrap"})])])]),n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-aside",{attrs:{width:"15%"}},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.currentTab},on:{open:e.handleOpen,close:e.handleClose}},e._l(e.kinds,function(t){return n("el-menu-item",{attrs:{index:t},on:{click:function(n){e.currentTab=t}}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.kind_disp(t)))])])}),1)],1),n("el-main",[n(e.currentTab,{tag:"component"})],1)],1)],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.currentPrj,callback:function(t){e.currentPrj=t},expression:"currentPrj"}},e._l(e.projects,function(e){return n("el-tab-pane",{attrs:{label:e.projectname,name:e.projectname}})}),1)},l=[],i={name:"Byprj",props:{},data:function(){return{projects:[],currentPrj:"mi200"}},methods:{handleClick:function(e,t){console.log(e,t)},getinfo:function(){this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(console.log(e.body.projects),console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects))},function(){})}},mounted:function(){this.getinfo()}},u=i,p=n("2877"),d=Object(p["a"])(u,s,l,!1,null,"c3a30fdc",null),f=d.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container")},b=[],h={name:"HomePage",props:{},data:function(){return{}},methods:{}},j=h,g=Object(p["a"])(j,m,b,!1,null,"01c8f371",null),v=g.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container")},_=[],y={name:"HomePage",props:{},data:function(){return{}},methods:{}},x=y,w=Object(p["a"])(x,k,_,!1,null,"d0b5297c",null),B=w.exports,C={name:"MetricsPage",props:{},data:function(){return{projectinfo:{projectname:"mi200"},projects:[],variants:[],users:[],currentTab:"Byprj",kinds:["Byprj","Bygrp","Byusr"]}},components:{Byprj:f,Bygrp:B,Byusr:v},methods:{kind_disp:function(e){return e},handleOpen:function(e,t){},handleClose:function(e,t){}}},P=C,O=Object(p["a"])(P,c,o,!1,null,"3098f81c",null),$=O.exports,E={name:"metrics",components:{MetricsPage:$}},M=E,T=Object(p["a"])(M,r,a,!1,null,null,null);t["default"]=T.exports}}]);
//# sourceMappingURL=chunk-2d0d83b9.bcb7c348.js.map