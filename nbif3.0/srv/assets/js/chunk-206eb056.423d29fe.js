(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-206eb056"],{"5d58":function(t,e,n){t.exports=n("d8d6")},"67bb":function(t,e,n){t.exports=n("f921")},d894:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("RegressionPage")},a=[],l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-header",[n("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[n("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0"},[t._v("NBIF Main Page")]),n("ul",{staticClass:"navbar-nav px-3"},[n("li",{staticClass:"nav-item text-nowrap"})])])]),n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-aside",{attrs:{width:"15%"}},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"Overall"},on:{open:t.handleOpen,close:t.handleClose}},t._l(t.kinds,function(e){return n("el-menu-item",{attrs:{index:e},on:{click:function(n){t.currentTab=e}}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.kind_disp(e)))])])}),1)],1),n("el-main",[n(t.currentTabComponent,{tag:"component",attrs:{variants:t.variants,projects:t.projects,projectinfo:t.projectinfo}})],1)],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeProj,callback:function(e){t.activeProj=e},expression:"activeProj"}},[n("el-tab-pane",{attrs:{label:"mi200",name:"mi200"}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus_mi200,border:""}},[n("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),n("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),n("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),n("el-table-column",{attrs:{prop:"isBACO",label:"isBACO"}}),n("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),n("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),n("el-table-column",{attrs:{prop:"passrate",label:"passrate"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.getgroupstatus(e.row.projectname,e.row.variantname,e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.passrate))])]}}])}),n("el-table-column",{attrs:{prop:"passnum",label:"passnum"}}),n("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.failnum))]),n("el-dialog",{attrs:{title:"FAIL tests list",visible:t.faillistvisible_mi200,width:"80%"},on:{"update:visible":function(e){t.faillistvisible_mi200=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.failnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.unknownnum))]),n("el-dialog",{attrs:{title:"unknown tests list",visible:t.unknownlistvisible_mi200,width:"80%"},on:{"update:visible":function(e){t.unknownlistvisible_mi200=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.unknownnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])})],1),n("br"),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.groupstatus,stripe:"",border:""}},[n("el-table-column",{attrs:{prop:"DVgroup",label:"DVgroup"}}),n("el-table-column",{attrs:{prop:"groupname",label:"groupname"}}),n("el-table-column",{attrs:{prop:"passrate",label:"passrate"}})],1)],1)],1)},i=[],u=n("5d58"),p=n.n(u),c=n("67bb"),d=n.n(c);function m(t){return m="function"===typeof d.a&&"symbol"===typeof p.a?function(t){return typeof t}:function(t){return t&&"function"===typeof d.a&&t.constructor===d.a&&t!==d.a.prototype?"symbol":typeof t},m(t)}function b(t){return b="function"===typeof d.a&&"symbol"===m(p.a)?function(t){return m(t)}:function(t){return t&&"function"===typeof d.a&&t.constructor===d.a&&t!==d.a.prototype?"symbol":m(t)},b(t)}var g={name:"Overall",props:{},data:function(){return{projects:[],projectinfo:{projectname:"mi200"},activeProj:"mi200",regressionstatus_mi200:[],testdetails:[],testdetails_disp:[],faillistvisible_mi200:!1,unknownlistvisible_mi200:!1,groupstatus:[]}},methods:{handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var n=100*(t-1);n<e;n++)this.testdetails_disp.push(this.testdetails[n])},handleCurrentChange_mi200_unknown:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var n=100*(t-1);n<e;n++)this.testdetails_disp.push(this.testdetails[n])},getgroupstatus:function(t,e,n,s,a,l){this.$http.post("/regression/groupstatus",{kind:"all",projectname:t,variantname:e,changelist:n,isBAPU:s,isBACO:a,shelve:l}).then(function(t){"ok"==t.body.ok?(console.log(t.body.groupstatus),console.log(b(t.body.groupstatus)),this.groupstatus=t.body.groupstatus):console.log(t.body)},function(){})},gettestdetails:function(t,e,n,s,a,l,o,r){"FAIL"==t?(this.faillistvisible_mi200=!0,this.$http.post("/regression/testdetails",{projectname:e,variantname:n,groupname:s,changelist:a,isBAPU:l,isBACO:o,shelve:r,kind:"testdetails",result:t}).then(function(t){console.log(t.body.ok),console.log(t.body.testdetails),this.testdetails=t.body.testdetails,this.handleCurrentChange(1)},function(){})):"UNKNOWN"==t&&(this.unknownlistvisible_mi200=!0,this.$http.post("/regression/testdetails",{projectname:e,variantname:n,groupname:s,changelist:a,isBAPU:l,isBACO:o,shelve:r,kind:"testdetails",result:t}).then(function(t){console.log(t.body.ok),console.log(t.body.testdetails),this.testdetails=t.body.testdetails,this.handleCurrentChange(1)},function(){}))},handleClick:function(t,e){console.log(t,e)},regressionstatus:function(t){return this.$http.post("/regression/get",{kind:"Overall",projectname:t}).then(function(t){"ok"==t.body.ok?(this.regressionstatus_mi200=t.body.regressions,console.log(this.regressionstatus_mi200)):console.log(t.body)},function(){}),[]}},mounted:function(){this.regressionstatus("mi200")}},h=g,f=n("2877"),v=Object(f["a"])(h,r,i,!1,null,"0439a1ba",null),w=v.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-main",[t._v("\n  aaa\n  ")]),n("el-main",[t._v("\n  bbb\n  ")])],1)},k=[],_={name:"Byusr",props:{},data:function(){return{}},methods:{}},C=_,j=Object(f["a"])(C,y,k,!1,null,"2458c027",null),A=j.exports,B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-header",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.groupinfo}},[n("el-form-item",{attrs:{label:"Project"}},[n("el-select",{attrs:{placeholder:"projectname"},model:{value:t.groupinfo.projectname,callback:function(e){t.$set(t.groupinfo,"projectname",e)},expression:"groupinfo.projectname"}},[n("el-option",{attrs:{label:"mi200",value:"mi200"}})],1)],1),n("el-form-item",{attrs:{label:"Group"}},[n("el-select",{attrs:{placeholder:"groupname"},model:{value:t.groupinfo.groupname,callback:function(e){t.$set(t.groupinfo,"groupname",e)},expression:"groupinfo.groupname"}},t._l(t.groups,function(t){return n("el-option",{attrs:{label:t,value:t}})}),1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getregressionstatus(t.groupinfo.projectname,t.groupinfo.groupname)}}},[t._v("check")])],1)],1)],1),n("el-main",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus,border:""}},[n("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),n("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),n("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),n("el-table-column",{attrs:{prop:"isBACO",label:"isBACO"}}),n("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),n("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),n("el-table-column",{attrs:{prop:"passrate",label:"passrate"}}),n("el-table-column",{attrs:{prop:"alltestnum",label:"alltestnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("ALL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.alltestnum))]),n("el-dialog",{attrs:{title:"ALL tests list",visible:t.alltestvisible,width:"80%"},on:{"update:visible":function(e){t.alltestvisible=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.alltestnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"passnum",label:"passnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("PASS",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.passnum))]),n("el-dialog",{attrs:{title:"PASS tests list",visible:t.passlistvisible,width:"80%"},on:{"update:visible":function(e){t.passlistvisible=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.passnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.failnum))]),n("el-dialog",{attrs:{title:"FAIL tests list",visible:t.faillistvisible,width:"80%"},on:{"update:visible":function(e){t.faillistvisible=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.failnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.isBACO,e.row.shelve)}}},[t._v(t._s(e.row.unknownnum))]),n("el-dialog",{attrs:{title:"unknown tests list",visible:t.unknownlistvisible,width:"80%"},on:{"update:visible":function(e){t.unknownlistvisible=e}}},[n("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.unknownnum},on:{"current-change":t.handleCurrentChange}}),n("el-table",{attrs:{data:t.testdetails_disp}},[n("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),n("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),n("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])})],1)],1)],1)},x=[],O={name:"Bygrp",props:{},data:function(){return{groupinfo:{projectname:"mi200",groupname:"sanity"},groups:["compliance","generic","stress","aper","mmreg","mmreg_ex","mailbox","acs","aer","aer_compliance","cfg","ats_pri","interrupt","bar","sriov","pcie_cap","reset","cg","ras","pmgr","perf_cnt","gen4","strap"],regressionstatus:[],testdetails:[],testdetails_disp:[],faillistvisible:!1,passlistvisible:!1,unknownlistvisible:!1,alltestvisible:!1}},methods:{getregressionstatus:function(t,e){return this.$http.post("/regression/get",{kind:"Bygrp",projectname:t,groupname:e}).then(function(t){"ok"==t.body.ok?this.regressionstatus=t.body.regressions:console.log(t.body)},function(){}),[]},gettestdetails:function(t,e,n,s,a,l,o,r){var i={projectname:e,variantname:n,changelist:a,isBAPU:l,isBACO:o,shelve:r,kind:"testdetails",groupname:s};"FAIL"==t&&(this.faillistvisible=!0,i.result=t),"PASS"==t&&(this.passlistvisible=!0,i.result=t),"UNKNOWN"==t&&(this.unknownlistvisible=!0,i.result=t),"ALL"==t&&(this.alltestvisible=!0),this.$http.post("/regression/testdetails",i).then(function(t){console.log(t.body.ok),console.log(t.body.testdetails),this.testdetails=t.body.testdetails,this.handleCurrentChange(1)},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var n=100*(t-1);n<e;n++)this.testdetails_disp.push(this.testdetails[n])},getgroups:function(t){this.$http.post("/regression/get",{kind:"Bygrp",projectname:this.groupinfo.projectname,groupname:this.groupinfo.groupname}).then(function(t){console.log(t.body.ok)},function(){})}},mounted:function(){this.getregressionstatus(this.groupinfo.projectname,this.groupinfo.groupname)}},P=O,U=Object(f["a"])(P,B,x,!1,null,"a26fed1c",null),S=U.exports,$={name:"RegressionPage",props:{},data:function(){return{projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",modename:"rc"},projects:[],variants:[],testplans:[],kinds:["Overall","Bygrp","Byusr"],currentTab:"Overall"}},components:{Overall:w,Byusr:A,Bygrp:S},computed:{currentTabComponent:function(){return this.currentTab}},methods:{kind_disp:function(t){return t},handleOpen:function(t,e){},handleClose:function(t,e){}}},N=$,L=Object(f["a"])(N,l,o,!1,null,"1409edb8",null),F=L.exports,I={name:"regression",components:{RegressionPage:F}},z=I,E=Object(f["a"])(z,s,a,!1,null,null,null);e["default"]=E.exports}}]);
//# sourceMappingURL=chunk-206eb056.423d29fe.js.map