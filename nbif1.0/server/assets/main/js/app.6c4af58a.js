(function(e){function t(t){for(var n,l,i=t[0],r=t[1],c=t[2],u=0,m=[];u<i.length;u++)l=i[u],s[l]&&m.push(s[l][0]),s[l]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);d&&d(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,i=1;i<a.length;i++){var r=a[i];0!==s[r]&&(n=!1)}n&&(o.splice(t--,1),e=l(l.s=a[0]))}return e}var n={},s={app:0},o=[];function l(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=n,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(a,n,function(t){return e[t]}.bind(null,n));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/main/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],r=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var d=r;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("64a9"),s=a.n(n);s.a},"0af0":function(e,t,a){},"0dda":function(e,t,a){},1:function(e,t){},"2a95":function(e,t,a){},"2e5d":function(e,t,a){"use strict";var n=a("67f3"),s=a.n(n);s.a},4678:function(e,t,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=o(e);return a(t)}function o(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}s.keys=function(){return Object.keys(n)},s.resolve=o,e.exports=s,s.id="4678"},"46b1":function(e,t,a){"use strict";var n=a("0af0"),s=a.n(n);s.a},"4ddc":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},o=[],l=(a("034f"),a("2877")),i={},r=Object(l["a"])(i,s,o,!1,null,null,null);r.options.__file="App.vue";var c=r.exports,d=a("5c96"),u=a.n(d);a("c69f");n["default"].use(u.a);var m=a("8c4f"),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("HomePage")],1)},f=[],b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-header",[a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("NBIF Main Page")]),a("input",{staticClass:"form-control form-control-dark w-100",attrs:{type:"text",placeholder:"Search(TODO)","aria-label":"Search"}}),a("ul",{staticClass:"navbar-nav px-3"},[a("li",{staticClass:"nav-item text-nowrap"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-toggle":"modal","data-target":"#version"}},[e._v(e._s(this.versionRecord[0].versionID))])])])])]),a("el-main",[a("el-carousel",{attrs:{interval:4e3,type:"card",height:"400px"}},e._l(e.items,function(t){return a("el-carousel-item",{key:t},[a("a",{on:{click:function(a){e.gotourl(t)}}},[a("h3",[e._v(e._s(t))])])])}),1),a("div",{staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true",id:"version"}},[a("div",{staticClass:"modal-dialog modal-lg"},[a("div",{staticClass:"modal-content"},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.versionRecord,border:""}},[a("el-table-column",{attrs:{prop:"versionID",label:"versionID",width:"180"}}),a("el-table-column",{attrs:{prop:"versionLog",label:"versionLog"}})],1)]],2)])])],1)],1)},g=[],h={name:"HomePage",props:{},data:function(){return{items:["Regression","Review","Action","Config"],versionRecord:[{versionID:"1.4.5",versionLog:"config page initial"},{versionID:"1.4.4",versionLog:'1. project name supports "FLOYD", "MI200", "NV21", "MERO"\n2. variant name supports "nbif_al_gpu", "nbif_al_gpu", "nbif_ssp_generic_a", "nbif_ssp_generic_b", "nbif_ssp_ntb", "nbif_oak_gpu" and "nbif_vg20_gpu"'},{versionID:"1.4.3",versionLog:"add home link"},{versionID:"1.4.2",versionLog:"add tables to describe regression parameters"},{versionID:"1.4.1",versionLog:"Regression charts are split into 4 groups: Normal, Long, PG, Baco. "},{versionID:"1.3",versionLog:"Regression Pic online"},{versionID:"1.2",versionLog:"Func Coverage Page alive"},{versionID:"1.1",versionLog:"add CL info into PA report page"},{versionID:"1.0",versionLog:"PA report published(not fully automatical, seeking a repo to restore rpt files)"}]}},methods:{gotourl:function(e){this.$router.push({name:e})}}},_=h,v=(a("46b1"),Object(l["a"])(_,b,g,!1,null,"5e3e11be",null));v.options.__file="HomePage.vue";var j=v.exports,w={name:"home",components:{HomePage:j}},P=w,C=Object(l["a"])(P,p,f,!1,null,null,null);C.options.__file="Home.vue";var k=C.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ReviewPage")],1)},x=[],R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("div",[a("el-row",{staticClass:"tac"},[a("el-col",{attrs:{span:4}},[a("h5",[e._v("NV21")]),a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"PA"},on:{open:e.handleOpen,close:e.handleClose}},[a("el-menu-item",{attrs:{index:"Coverage"},on:{click:function(t){e.currentTab="ReviewPage_Coverage_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("Coverage")])]),a("el-menu-item",{attrs:{index:"PA"},on:{click:function(t){e.currentTab="ReviewPage_PA_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("PA")])])],1)],1),a("el-col",{attrs:{span:20}},[a(e.currentTabComponent,{tag:"component"})],1)],1)],1)])},D=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/main"}},[e._v("MainPage")]),a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("ReviewPage")])])}],N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-col",[a("el-row",[a("span",{staticClass:"demonstration"},[e._v("Choose Date")]),a("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"Choose Date","picker-options":e.pickerOptions1},model:{value:e.chosendate,callback:function(t){e.chosendate=t},expression:"chosendate"}}),a("a",{attrs:{target:"abc",href:"http://srdcws225:9001/reviews/COV_RPT/NV21/FUNC_COV/nbif_nv10_gpu_"+e.dateurl+"/func_cov_report/dashboard.html"}},[a("el-button",{on:{click:e.log}},[e._v("Confirm")])],1)],1),a("iframe",{attrs:{name:"abc",width:"100%",height:"1000px"}})],1)],1)},Y=[],L=a("c1df"),A={name:"ReviewPage_Coverage_main",props:{projectname:""},data:function(){return{pickerOptions1:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"Today",onClick:function(e){e.$emit("pick",new Date)}},{text:"Yesterday",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"A week ago",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},chosendate:""}},computed:{dateurl:function(){return console.log(L(this.chosendate).format("YYYY-MM-DD")),L(this.chosendate).format("YYYY-MM-DD")}},methods:{log:function(){console.log(this.chosendate)}}},M=A,O=(a("832a"),Object(l["a"])(M,N,Y,!1,null,"081823a4",null));O.options.__file="ReviewPage_Coverage_main.vue";var T=O.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.PA_active_tab,callback:function(t){e.PA_active_tab=t},expression:"PA_active_tab"}},[a("el-tab-pane",{attrs:{label:"25",name:"25"}},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.PA_info.PA25,border:""}},[a("el-table-column",{attrs:{prop:"CaseName",label:"CaseName"}}),a("el-table-column",{attrs:{prop:"ChangeList",label:"ChangeList"}})],1)],a("iframe",{attrs:{src:"http://srdcws225:9001/reviews/pa/NV21/CL3540486/25/10_17_2018/",width:"100%",height:"1000"}})],2),a("el-tab-pane",{attrs:{label:"100",name:"100"}},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.PA_info.PA100,border:""}},[a("el-table-column",{attrs:{prop:"CaseName",label:"CaseName"}}),a("el-table-column",{attrs:{prop:"ChangeList",label:"ChangeList"}})],1)],a("iframe",{attrs:{src:"http://srdcws225:9001/reviews/pa/NV21/CL3540486/100/10_17_2018/",width:"100%",height:"1000"}})],2),a("el-tab-pane",{attrs:{label:"idle_mgcg_en",name:"idle_mgcg_en"}},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.PA_info.idle_mgcg_en,border:""}},[a("el-table-column",{attrs:{prop:"CaseName",label:"CaseName"}}),a("el-table-column",{attrs:{prop:"ChangeList",label:"ChangeList"}})],1)],a("iframe",{attrs:{src:"http://srdcws225:9001/reviews/pa/NV21/CL3540486/idle_mgcg_all_enabled/10_17_2018/",width:"100%",height:"1000"}})],2),a("el-tab-pane",{attrs:{label:"idle_mgcg_dis",name:"idle_mgcg_dis"}},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.PA_info.idle_mgcg_dis,border:""}},[a("el-table-column",{attrs:{prop:"CaseName",label:"CaseName"}}),a("el-table-column",{attrs:{prop:"ChangeList",label:"ChangeList"}})],1)],a("iframe",{attrs:{src:"http://srdcws808:9001/reviews/pa/NV21/CL3540486/idle_mgcg_all_disabled/10_17_2018/",width:"100%",height:"1000"}})],2)],1)},$=[],E={name:"ReviewPage_PA_main",props:{},data:function(){return{PA_active_tab:"idle_mgcg_en",PA_info:{PA25:[{CaseName:"perf_test_for_pa_25",ChangeList:"3540486"}],PA100:[{CaseName:"perf_test_for_pa_100",ChangeList:"3540486"}],idle_mgcg_en:[{CaseName:"perf_test_for_pa_idle_mgcg_all_enabled",ChangeList:"3540486"}],idle_mgcg_dis:[{CaseName:"perf_test_for_pa_idle_mgcg_all_disabled",ChangeList:"3540486"}]}}},methods:{handleClick:function(e,t){console.log(e,t)}}},z=E,I=(a("daf3"),Object(l["a"])(z,S,$,!1,null,"002e9004",null));I.options.__file="ReviewPage_PA_main.vue";var B=I.exports,V={name:"ReviewPage",props:{},components:{ReviewPage_PA_main:B,ReviewPage_Coverage_main:T},data:function(){return{review_title:["PA","Coverage"],currentTab:"ReviewPage_PA_main",tabs:["ReviewPage_PA_main","ReviewPage_Coverage_main"]}},computed:{currentTabComponent:function(){return console.log(this.currentTab),this.currentTab}},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)}}},G=V,F=(a("f147"),Object(l["a"])(G,R,D,!1,null,"2f0ff54d",null));F.options.__file="ReviewPage.vue";var U=F.exports,H={name:"home",components:{ReviewPage:U}},q=H,J=Object(l["a"])(q,y,x,!1,null,null,null);J.options.__file="Review.vue";var W=J.exports,K=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("RegressionPage")],1)},Q=[],X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/main"}},[e._v("MainPage")]),a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("RegressionPage")])]),a("el-col",{attrs:{span:24}},[a("el-container",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.projectinfo}},[a("el-form-item",{attrs:{label:"ProjectName"}},[a("el-select",{attrs:{placeholder:"ProjectName"},model:{value:e.projectinfo.projectname,callback:function(t){e.$set(e.projectinfo,"projectname",t)},expression:"projectinfo.projectname"}},[a("el-option",{attrs:{label:"NV21",value:"NV21"}}),a("el-option",{attrs:{label:"MERO",value:"MERO"}}),a("el-option",{attrs:{label:"MI200",value:"MI200"}}),a("el-option",{attrs:{label:"FLOYD",value:"FLOYD"}})],1)],1),a("el-form-item",{attrs:{label:"ProjectName"}},[a("el-select",{attrs:{placeholder:"VariantName"},model:{value:e.projectinfo.variant,callback:function(t){e.$set(e.projectinfo,"variant",t)},expression:"projectinfo.variant"}},[a("el-option",{attrs:{label:"nbif_nv10_gpu",value:"nbif_nv10_gpu"}}),a("el-option",{attrs:{label:"nbif_al_gpu",value:"nbif_al_gpu"}}),a("el-option",{attrs:{label:"nbif_ssp_generic_a",value:"nbif_ssp_generic_a"}}),a("el-option",{attrs:{label:"nbif_ssp_generic_b",value:"nbif_ssp_generic_b"}}),a("el-option",{attrs:{label:"nbif_ssp_ntb",value:"nbif_ssp_ntb"}}),a("el-option",{attrs:{label:"nbif_vg20_gpu",value:"nbif_vg20_gpu"}}),a("el-option",{attrs:{label:"nbif_oak_gpu",value:"nbif_oak_gpu"}})],1)],1),a("el-form-item",{attrs:{label:"TimeWindow"}},[a("el-select",{attrs:{placeholder:"TimeWindow"},model:{value:e.projectinfo.timewindow,callback:function(t){e.$set(e.projectinfo,"timewindow",t)},expression:"projectinfo.timewindow"}},[a("el-option",{attrs:{label:"week",value:"week"}}),a("el-option",{attrs:{label:"month",value:"month"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("Check")])],1)],1)],1),a("hr"),a("h3",[e._v("Normal Regression")]),a("el-tabs",{on:{"tab-click":e.handleClickNormal},model:{value:e.activeNameNormal,callback:function(t){e.activeNameNormal=t},expression:"activeNameNormal"}},[a("el-tab-pane",{attrs:{label:"Trend Chart",name:"passingratenormal"}},[a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"chartRegressionNormal"}})]),a("el-tab-pane",{attrs:{label:"Details Info",name:"detailsinfonormal"}},[a("el-container",{staticStyle:{width:"100%",height:"400px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.detailsinfonormal,height:"400",border:""}},[a("el-table-column",{attrs:{prop:"date",label:"Date"}}),a("el-table-column",{attrs:{prop:"changelist",label:"ChangeList"}}),a("el-table-column",{attrs:{prop:"totalnum",label:"TotalNum"}}),a("el-table-column",{attrs:{prop:"totalnumdelta",label:"TotalNumDelta"}}),a("el-table-column",{attrs:{prop:"passednum",label:"PassedNum"}}),a("el-table-column",{attrs:{prop:"failednum",label:"FailedNum"}}),a("el-table-column",{attrs:{prop:"unknownnum",label:"UnknownNum"}})],1)],1)],1)],1),a("hr"),a("h3",[e._v("Long Regression")]),a("el-tabs",{on:{"tab-click":e.handleClickLong},model:{value:e.activeNameLong,callback:function(t){e.activeNameLong=t},expression:"activeNameLong"}},[a("el-tab-pane",{attrs:{label:"Trend Chart",name:"passingratelong"}},[a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"chartRegressionLong"}})]),a("el-tab-pane",{attrs:{label:"Details Info",name:"detailsinfolong"}},[a("el-container",{staticStyle:{width:"100%",height:"400px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.detailsinfolong,height:"400",border:""}},[a("el-table-column",{attrs:{prop:"date",label:"Date"}}),a("el-table-column",{attrs:{prop:"changelist",label:"ChangeList"}}),a("el-table-column",{attrs:{prop:"totalnum",label:"TotalNum"}}),a("el-table-column",{attrs:{prop:"totalnumdelta",label:"TotalNumDelta"}}),a("el-table-column",{attrs:{prop:"passednum",label:"PassedNum"}}),a("el-table-column",{attrs:{prop:"failednum",label:"FailedNum"}}),a("el-table-column",{attrs:{prop:"unknownnum",label:"UnknownNum"}})],1)],1)],1)],1),a("hr"),a("h3",[e._v("Baco Regression")]),a("el-tabs",{on:{"tab-click":e.handleClickBaco},model:{value:e.activeNameBaco,callback:function(t){e.activeNameBaco=t},expression:"activeNameBaco"}},[a("el-tab-pane",{attrs:{label:"Trend Chart",name:"passingratebaco"}},[a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"chartRegressionBaco"}})]),a("el-tab-pane",{attrs:{label:"Details Info",name:"detailsinfobaco"}},[a("el-container",{staticStyle:{width:"100%",height:"400px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.detailsinfobaco,height:"400",border:""}},[a("el-table-column",{attrs:{prop:"date",label:"Date"}}),a("el-table-column",{attrs:{prop:"changelist",label:"ChangeList"}}),a("el-table-column",{attrs:{prop:"totalnum",label:"TotalNum"}}),a("el-table-column",{attrs:{prop:"totalnumdelta",label:"TotalNumDelta"}}),a("el-table-column",{attrs:{prop:"passednum",label:"PassedNum"}}),a("el-table-column",{attrs:{prop:"failednum",label:"FailedNum"}}),a("el-table-column",{attrs:{prop:"unknownnum",label:"UnknownNum"}})],1)],1)],1)],1),a("hr"),a("h3",[e._v("PG Regression")]),a("el-tabs",{on:{"tab-click":e.handleClickPG},model:{value:e.activeNamePG,callback:function(t){e.activeNamePG=t},expression:"activeNamePG"}},[a("el-tab-pane",{attrs:{label:"Trend Chart",name:"passingratepg"}},[a("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"chartRegressionPG"}})]),a("el-tab-pane",{attrs:{label:"Details Info",name:"detailsinfopg"}},[a("el-container",{staticStyle:{width:"100%",height:"400px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.detailsinfopg,height:"400",border:""}},[a("el-table-column",{attrs:{prop:"date",label:"Date"}}),a("el-table-column",{attrs:{prop:"changelist",label:"ChangeList"}}),a("el-table-column",{attrs:{prop:"totalnum",label:"TotalNum"}}),a("el-table-column",{attrs:{prop:"totalnumdelta",label:"TotalNumDelta"}}),a("el-table-column",{attrs:{prop:"passednum",label:"PassedNum"}}),a("el-table-column",{attrs:{prop:"failednum",label:"FailedNum"}}),a("el-table-column",{attrs:{prop:"unknownnum",label:"UnknownNum"}})],1)],1)],1)],1),a("hr")],1)],1)},Z=[],ee=a("c1df"),te={name:"RegressionPage",props:{},data:function(){return{projectinfo:{projectname:"NV21",timewindow:"week",variant:"nbif_nv10_gpu"},xAxislist:[],PassingRate_his_normal:[],PassingRate_his_baco:[],PassingRate_his_pg:[],PassingRate_his_long:[],FuncCov_his:[],CodeCov_his:[],activeNameNormal:"passingratenormal",activeNameLong:"passingratelong",activeNamePG:"passingratepg",activeNameBaco:"passingratebaco",detailsinfonormal:[],detailsinfolong:[],detailsinfobaco:[],detailsinfopg:[]}},methods:{handleClickNormal:function(e,t){console.log(e,t)},handleClickBaco:function(e,t){console.log(e,t)},handleClickLong:function(e,t){console.log(e,t)},handleClickPG:function(e,t){console.log(e,t)},onSubmit:function(){console.log(this.projectinfo.timewindow);var e=1,t="";if("week"==this.projectinfo.timewindow){this.xAxislist=[];while(t!=ee().format("YYYY-MM-DD"))t=ee().subtract(1,"weeks").add(e,"days").format("YYYY-MM-DD"),this.xAxislist.push(t),e++;console.log(this.xAxislist),this.getPassingRate(ee().subtract(1,"weeks").add(1,"days").format("YYYY-MM-DD"),ee().format("YYYY-MM-DD"),this.projectinfo.projectname,this.projectinfo.variant)}else if("month"==this.projectinfo.timewindow){this.xAxislist=[];while(t!=ee().format("YYYY-MM-DD"))t=ee().subtract(1,"months").add(e,"days").format("YYYY-MM-DD"),this.xAxislist.push(t),e++;console.log(this.xAxislist),this.getPassingRate(ee().subtract(1,"months").add(1,"days").format("YYYY-MM-DD"),ee().format("YYYY-MM-DD"),this.projectinfo.projectname,this.projectinfo.variant)}else if("threemonths"==this.projectinfo.timewindow){this.xAxislist=[];while(t!=ee().format("YYYY-MM-DD"))t=ee().subtract(3,"months").add(e,"days").format("YYYY-MM-DD"),this.xAxislist.push(t),e++;console.log(this.xAxislist),this.getPassingRate(ee().subtract(3,"months").add(1,"days").format("YYYY-MM-DD"),ee().format("YYYY-MM-DD"),this.projectinfo.projectname,this.projectinfo.variant)}else if("halfyear"==this.projectinfo.timewindow){this.xAxislist=[];while(t!=ee().format("YYYY-MM-DD"))t=ee().subtract(6,"months").add(e,"days").format("YYYY-MM-DD"),this.xAxislist.push(t),e++;console.log(this.xAxislist),this.getPassingRate(ee().subtract(6,"months").add(1,"days").format("YYYY-MM-DD"),ee().format("YYYY-MM-DD"),this.projectinfo.projectname,this.projectinfo.variant)}this.drawLine("chartRegressionNormal"),this.drawLine("chartRegressionLong"),this.drawLine("chartRegressionPG"),this.drawLine("chartRegressionBaco")},getPassingRate:function(e,t,a,n){console.log("getPassingRate"),console.log("datestart"),console.log(e),console.log("dateend"),console.log(t),console.log(a),this.$http.post("/regression/check",{kind:"rangepassingrate",datestart:e,dateend:t,projectname:a,variant:n}).then(function(e){"ok"==e.body.ok?(console.log("passingratenormal"),console.log(e.body.PassingRate_his_normal),console.log("passingratelong"),console.log(e.body.PassingRate_his_long),console.log("passingratepg"),console.log(e.body.PassingRate_his_pg),console.log("passingratebaco"),console.log(e.body.PassingRate_his_baco),this.PassingRate_his_normal=e.body.PassingRate_his_normal,this.PassingRate_his_long=e.body.PassingRate_his_long,this.PassingRate_his_pg=e.body.PassingRate_his_pg,this.PassingRate_his_baco=e.body.PassingRate_his_baco,this.detailsinfonormal=e.body.detailsinfonormal,this.detailsinfolong=e.body.detailsinfolong,this.detailsinfopg=e.body.detailsinfopg,this.detailsinfobaco=e.body.detailsinfobaco,this.drawLine("chartRegressionNormal"),this.drawLine("chartRegressionLong"),this.drawLine("chartRegressionPG"),this.drawLine("chartRegressionBaco")):e.body.ok},function(){})},drawLine:function(e){var t,a=this.$echarts.init(document.getElementById(e));t={title:{text:""},tooltip:{trigger:"axis"},legend:{data:["PassingRate"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{show:!0}}},xAxis:{type:"category",boundaryGap:!1,data:this.xAxislist},yAxis:{type:"value"},series:[]},"chartRegressionNormal"==e?t.series=[{name:"PassingRate",type:"line",data:this.PassingRate_his_normal}]:"chartRegressionLong"==e?t.series=[{name:"PassingRate",type:"line",data:this.PassingRate_his_long}]:"chartRegressionBaco"==e?t.series=[{name:"PassingRate",type:"line",data:this.PassingRate_his_baco}]:"chartRegressionPG"==e&&(t.series=[{name:"PassingRate",type:"line",data:this.PassingRate_his_pg}]),a.setOption(t)}},mounted:function(){this.onSubmit()}},ae=te,ne=(a("837c"),Object(l["a"])(ae,X,Z,!1,null,"1dc6d048",null));ne.options.__file="RegressionPage.vue";var se=ne.exports,oe={name:"regression",components:{RegressionPage:se}},le=oe,ie=Object(l["a"])(le,K,Q,!1,null,null,null);ie.options.__file="Regression.vue";var re=ie.exports,ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ActionPage")],1)},de=[],ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/main"}},[e._v("MainPage")]),a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("ActionPage")])])])},me=[],pe={name:"ActionPage",props:{},data:function(){return{}},methods:{}},fe=pe,be=(a("8fc4"),Object(l["a"])(fe,ue,me,!1,null,"1e16ad67",null));be.options.__file="ActionPage.vue";var ge=be.exports,he={name:"action",components:{ActionPage:ge}},_e=he,ve=Object(l["a"])(_e,ce,de,!1,null,null,null);ve.options.__file="Action.vue";var je=ve.exports,we=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ConfigPage")],1)},Pe=[],Ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("div",[a("el-row",{staticClass:"tac"},[a("el-col",{attrs:{span:4}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"testplans"},on:{open:e.handleOpen,close:e.handleClose}},[a("el-menu-item",{attrs:{index:"testplans"},on:{click:function(t){e.currentTab="ConfigPage_testplans_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("Testplans")])]),a("el-menu-item",{attrs:{index:"users"},on:{click:function(t){e.currentTab="ConfigPage_users_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("Users")])]),a("el-menu-item",{attrs:{index:"projects"},on:{click:function(t){e.currentTab="ConfigPage_projects_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("Projects")])]),a("el-menu-item",{attrs:{index:"variants"},on:{click:function(t){e.currentTab="ConfigPage_variants_main"}}},[a("i",{staticClass:"el-icon-menu"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("Variants")])])],1)],1),a("el-col",{attrs:{span:20}},[a(e.currentTabComponent,{tag:"component"})],1)],1)],1)])},ke=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/main"}},[e._v("MainPage")]),a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("ConfigPage")])])}],ye=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)},xe=[],Re={name:"ConfigPage_projects_main",props:{},data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}},De=Re,Ne=(a("a040"),Object(l["a"])(De,ye,xe,!1,null,"e5c2fcee",null));Ne.options.__file="ConfigPage_projects_main.vue";var Ye=Ne.exports,Le=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-col",{attrs:{span:24}},[a("el-row",[a("el-button",{attrs:{type:"primary",round:""},on:{click:function(t){e.add()}}},[e._v("Add")]),a("el-button",{attrs:{type:"primary",round:""},on:{click:function(t){e.upload()}}},[e._v("Upload")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.users,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"realname",label:"realname"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"realname",clearable:""},model:{value:t.row.realname,callback:function(a){e.$set(t.row,"realname",a)},expression:"scope.row.realname"}})]}}])}),a("el-table-column",{attrs:{prop:"email",label:"email"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"email",clearable:""},model:{value:t.row.email,callback:function(a){e.$set(t.row,"email",a)},expression:"scope.row.email"}})]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"operation",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){a.preventDefault(),e.deleteRow(t.$index,e.users)}}},[e._v("\n          Delete\n        ")])]}}])})],1)],1)],1)},Ae=[],Me={name:"ConfigPage_users_main",props:{},data:function(){return{users:[]}},methods:{deleteRow:function(e,t){t.splice(e,1)},upload:function(){this.$http.post("/config/upload",{kind:"usersupload",users:users}).then(function(e){"ok"==e.body.ok&&console.log("ok"),this.get(),alert("uploaded")},function(){})},add:function(){this.users.push({realname:"",email:""})},get:function(){this.$http.post("/config/get",{kind:"allusersget"}).then(function(e){if("ok"==e.body.ok){this.users=[];for(var t=0;t<e.body.users.length;t++)this.users.push({realname:e.body.users[t].realname,email:e.body.users[t].email})}},function(){})}},mounted:function(){}},Oe=Me,Te=(a("6f2d"),Object(l["a"])(Oe,Le,Ae,!1,null,"6436ec70",null));Te.options.__file="ConfigPage_users_main.vue";var Se=Te.exports,$e=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)},Ee=[],ze={name:"ConfigPage_testplans_main",props:{},data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}},Ie=ze,Be=(a("b1c2"),Object(l["a"])(Ie,$e,Ee,!1,null,"bb912e9a",null));Be.options.__file="ConfigPage_testplans_main.vue";var Ve=Be.exports,Ge=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)},Fe=[],Ue={name:"ConfigPage_variants_main",props:{},data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}}},He=Ue,qe=(a("2e5d"),Object(l["a"])(He,Ge,Fe,!1,null,"0b675a09",null));qe.options.__file="ConfigPage_variants_main.vue";var Je=qe.exports,We={name:"ConfigPage",props:{},components:{ConfigPage_projects_main:Ye,ConfigPage_users_main:Se,ConfigPage_testplans_main:Ve,ConfigPage_variants_main:Je},data:function(){return{review_title:["projects","users","testplans","variants"],currentTab:"ConfigPage_testplans_main",tabs:["ConfigPage_projects_main","ConfigPage_users_main","ConfigPage_testplans_main","ConfigPage_variants_main"]}},computed:{currentTabComponent:function(){return console.log(this.currentTab),this.currentTab}},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)}}},Ke=We,Qe=(a("d86b"),Object(l["a"])(Ke,Ce,ke,!1,null,"bbec5d32",null));Qe.options.__file="ConfigPage.vue";var Xe=Qe.exports,Ze={name:"config",components:{ConfigPage:Xe}},et=Ze,tt=Object(l["a"])(et,we,Pe,!1,null,null,null);tt.options.__file="Config.vue";var at=tt.exports;n["default"].use(m["a"]);var nt=new m["a"]({routes:[{path:"/",name:"home",component:k},{path:"/main",name:"main",component:k},{path:"/Review",name:"Review",component:W},{path:"/Regression",name:"Regression",component:re},{path:"/Action",name:"Action",component:je},{path:"/Config",name:"Config",component:at}]}),st=a("2f62");n["default"].use(st["a"]);var ot=new st["a"].Store({state:{},mutations:{},actions:{}}),lt=(a("0fae"),a("e609"),a("ab8b"),a("0deb"),a("b2d6")),it=a.n(lt),rt=a("4897"),ct=a.n(rt),dt=a("313e"),ut=a.n(dt),mt=a("28dd");ct.a.use(it.a),n["default"].config.productionTip=!1,n["default"].use(u.a),n["default"].prototype.$echarts=ut.a,n["default"].use(mt["a"]),new n["default"]({router:nt,store:ot,render:function(e){return e(c)}}).$mount("#app")},"615c":function(e,t,a){},"64a9":function(e,t,a){},"67f3":function(e,t,a){},"6f2d":function(e,t,a){"use strict";var n=a("ec36"),s=a.n(n);s.a},"832a":function(e,t,a){"use strict";var n=a("4ddc"),s=a.n(n);s.a},"837c":function(e,t,a){"use strict";var n=a("cc43"),s=a.n(n);s.a},"8fc4":function(e,t,a){"use strict";var n=a("b676"),s=a.n(n);s.a},a040:function(e,t,a){"use strict";var n=a("d4b2"),s=a.n(n);s.a},a65e:function(e,t,a){},b1c2:function(e,t,a){"use strict";var n=a("0dda"),s=a.n(n);s.a},b676:function(e,t,a){},c69f:function(e,t,a){},cc43:function(e,t,a){},d4b2:function(e,t,a){},d86b:function(e,t,a){"use strict";var n=a("a65e"),s=a.n(n);s.a},daf3:function(e,t,a){"use strict";var n=a("2a95"),s=a.n(n);s.a},ec36:function(e,t,a){},f147:function(e,t,a){"use strict";var n=a("615c"),s=a.n(n);s.a}});
//# sourceMappingURL=app.6c4af58a.js.map