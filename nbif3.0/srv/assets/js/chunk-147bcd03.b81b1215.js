(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-147bcd03"],{"5d58":function(t,e,s){t.exports=s("d8d6")},"67bb":function(t,e,s){t.exports=s("f921")},7618:function(t,e,s){"use strict";s.d(e,"a",function(){return i});var a=s("5d58"),n=s.n(a),o=s("67bb"),r=s.n(o);function l(t){return l="function"===typeof r.a&&"symbol"===typeof n.a?function(t){return typeof t}:function(t){return t&&"function"===typeof r.a&&t.constructor===r.a&&t!==r.a.prototype?"symbol":typeof t},l(t)}function i(t){return i="function"===typeof r.a&&"symbol"===l(n.a)?function(t){return l(t)}:function(t){return t&&"function"===typeof r.a&&t.constructor===r.a&&t!==r.a.prototype?"symbol":l(t)},i(t)}},d894:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("RegressionPage")},n=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",{staticStyle:{border:"1px solid #eee"}},[s("el-header",[s("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[s("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[t._v("NBIF Main Page")]),s("ul",{staticClass:"navbar-nav px-3"},[s("li",{staticClass:"nav-item text-nowrap"})])])]),s("el-container",{staticStyle:{border:"1px solid #eee"}},[s("el-aside",{attrs:{width:"15%"}},[s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.currentTab},on:{open:t.handleOpen,close:t.handleClose}},t._l(t.kinds,function(e){return s("el-menu-item",{attrs:{index:e},on:{click:function(s){t.currentTab=e}}},[s("i",{staticClass:"el-icon-setting"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.kind_disp(e)))])])}),1)],1),s("el-main",[s(t.currentTabComponent,{tag:"component",attrs:{variants:t.variants,projects:t.projects,projectinfo:t.projectinfo}})],1)],1)],1)},r=[],l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeProj,callback:function(e){t.activeProj=e},expression:"activeProj"}},t._l(t.projects,function(t){return s("el-tab-pane",{attrs:{label:t.projectname,name:t.projectname}},[s("OneprojPage",{attrs:{projectname:t.projectname}})],1)}),1)},i=[],c=s("7618"),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus_disp,border:""}},[s("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),s("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),s("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),s("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),s("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.getgroupstatus(e.row.projectname,e.row.variantname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.passrate))])]}}])}),s("el-table-column",{attrs:{prop:"alltestnum",label:"alltestnum"}}),s("el-table-column",{attrs:{prop:"passnum",label:"passnum"}}),s("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.failnum))])]}}])}),s("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.unknownnum))])]}}])})],1),s("br"),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.groupstatus,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"DVgroup",label:"DVgroup",sortable:""}}),s("el-table-column",{attrs:{prop:"groupname",label:"groupname",sortable:""}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate",sortable:""}})],1),s("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"80%"},on:{"update:visible":function(e){t.visible=e}}},[s("el-pagination",{attrs:{"page-size":t.pagesize,layout:"prev, pager, next",total:t.testdetails.length},on:{"current-change":t.handleCurrentChange}}),s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchparam}},[s("el-form-item",{attrs:{label:"testname contains"}},[s("el-input",{attrs:{placeholder:"testname contains"},model:{value:t.searchparam.testnamesrch,callback:function(e){t.$set(t.searchparam,"testnamesrch",e)},expression:"searchparam.testnamesrch"}})],1),s("el-form-item",{attrs:{label:"signature contains"}},[s("el-input",{attrs:{placeholder:"signature contains"},model:{value:t.searchparam.sigsrch,callback:function(e){t.$set(t.searchparam,"sigsrch",e)},expression:"searchparam.sigsrch"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.gettestdetails(t.searchparam.kind,t.searchparam.projectname,t.searchparam.variantname,t.searchparam.groupname,t.searchparam.changelist,t.searchparam.isBAPU,t.searchparam.shelve,t.searchparam.kickoffdate)}}},[t._v("Filter")])],1)],1),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)],1)},p=[],h={name:"OneprojPage",props:{projectname:""},data:function(){return{regressionstatus_disp:[],testdetails:[],testdetails_disp:[],visible:!1,groupstatus:[],title:"",pagesize:500,searchparam:{testnamesrch:"",sigsrch:"",kind:"",projectname:"",variantname:"",groupname:"",changelist:"",isBAPU:"",shelve:"",kickoffdate:""}}},methods:{getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(this.variants=JSON.parse(t.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=t*this.pagesize<this.testdetails.length?t*this.pagesize:this.testdetails.length;for(var s=(t-1)*this.pagesize;s<e;s++)this.testdetails_disp.push(this.testdetails[s])},getgroupstatus:function(t,e,s,a,n,o){console.log("method : groupstatus"),this.$http.post("/regression/groupstatus",{kind:"all",projectname:t,variantname:e,changelist:s,isBAPU:a,shelve:n,kickoffdate:o}).then(function(t){"ok"==t.body.ok?(console.log(t.body.groupstatus),console.log(Object(c["a"])(t.body.groupstatus)),this.groupstatus=t.body.groupstatus):console.log(t.body)},function(){})},gettestdetails:function(t,e,s,a,n,o,r,l){this.searchparam.testnamesrch="",this.searchparam.sigsrch="",this.searchparam.kind=t,this.searchparam.projectname=e,this.searchparam.variantname=s,this.searchparam.groupname=a,this.searchparam.changelist=n,this.searchparam.isBAPU=o,this.searchparam.shelve=r,this.searchparam.kickoffdate=l,console.log("gettestdetails"),console.log(t),this.visible=!0,this.$http.post("/regression/testdetails",{projectname:this.searchparam.projectname,variantname:this.searchparam.variantname,groupname:this.searchparam.groupname,changelist:this.searchparam.changelist,isBAPU:this.searchparam.isBAPU,shelve:this.searchparam.shelve,kickoffdate:this.searchparam.kickoffdate,kind:"testdetails",result:this.searchparam.kind,testnamesrch:this.searchparam.testnamesrch,sigsrch:this.searchparam.sigsrch}).then(function(e){console.log(t),console.log(e.body.testdetails),this.testdetails=e.body.testdetails,this.handleCurrentChange(1),"FAIL"==t?this.title="FAIL tests list":"UNKNOWN"==t?this.title="UNKNOWN tests list":"PASS"==t?this.title="PASS tests list":"ALL"==t&&(this.title="ALL tests list")},function(){})},regressionstatus:function(t){console.log("regressionstatus"),console.log(t),this.$http.post("/regression/get",{kind:"Overall",projectname:t}).then(function(e){"ok"==e.body.ok?(this.regressionstatus_disp=e.body.regressions,console.log("dbg1"),console.log(t),console.log(this.regressionstatus_disp)):console.log(e.body)},function(){})}},mounted:function(){this.regressionstatus(this.projectname),this.getinfo(),console.log("mounted : "+this.projectname)}},d=h,g=s("2877"),m=Object(g["a"])(d,u,p,!1,null,"07f6c581",null),f=m.exports,b={name:"Overall",props:{},components:{OneprojPage:f},data:function(){return{projects:[],activeProj:"mi200",testdetails:[]}},methods:{getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(this.variants=JSON.parse(t.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var s=100*(t-1);s<e;s++)this.testdetails_disp.push(this.testdetails[s])},handleCurrentChange_mi200_unknown:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var s=100*(t-1);s<e;s++)this.testdetails_disp.push(this.testdetails[s])},getgroupstatus:function(t,e,s,a,n,o){this.$http.post("/regression/groupstatus",{kind:"all",projectname:t,variantname:e,changelist:s,isBAPU:a,shelve:o}).then(function(t){"ok"==t.body.ok?(console.log(t.body.groupstatus),console.log(Object(c["a"])(t.body.groupstatus)),this.groupstatus=t.body.groupstatus):console.log(t.body)},function(){})},gettestdetails:function(t,e,s,a,n,o,r,l){"FAIL"==t?(this.faillistvisible_mi200=!0,this.$http.post("/regression/testdetails",{projectname:e,variantname:s,groupname:a,changelist:n,isBAPU:o,isBACO:r,shelve:l,kind:"testdetails",result:t}).then(function(t){console.log(t.body.ok),console.log(t.body.testdetails),this.testdetails=t.body.testdetails,this.handleCurrentChange(1)},function(){})):"UNKNOWN"==t&&(this.unknownlistvisible_mi200=!0,this.$http.post("/regression/testdetails",{projectname:e,variantname:s,groupname:a,changelist:n,isBAPU:o,isBACO:r,shelve:l,kind:"testdetails",result:t}).then(function(t){console.log(t.body.ok),console.log(t.body.testdetails),this.testdetails=t.body.testdetails,this.handleCurrentChange(1)},function(){}))},handleClick:function(t,e){console.log(this.activeProj+" clicked")}},mounted:function(){this.getinfo()}},v=b,k=Object(g["a"])(v,l,i,!1,null,"9662165a",null),y=k.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",[s("el-main",[t._v("\n  aaa\n  ")]),s("el-main",[t._v("\n  bbb\n  ")])],1)},j=[],_={name:"Byusr",props:{},data:function(){return{}},methods:{}},A=_,P=Object(g["a"])(A,w,j,!1,null,"2458c027",null),B=P.exports,U=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",[s("el-header",[s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.groupinfo}},[s("el-form-item",{attrs:{label:"Project"}},[s("el-select",{attrs:{placeholder:"projectname"},on:{change:function(e){return t.projectchange()}},model:{value:t.groupinfo.projectname,callback:function(e){t.$set(t.groupinfo,"projectname",e)},expression:"groupinfo.projectname"}},t._l(t.projects,function(t){return s("el-option",{attrs:{label:t.projectname,value:t.projectname}})}),1)],1),s("el-form-item",{attrs:{label:"Group"}},[s("el-select",{attrs:{placeholder:"groupname"},model:{value:t.groupinfo.groupname,callback:function(e){t.$set(t.groupinfo,"groupname",e)},expression:"groupinfo.groupname"}},t._l(t.groups,function(t){return s("el-option",{attrs:{label:t.groupname,value:t.groupname}})}),1)],1),s("el-form-item",{attrs:{label:"isBAPU"}},[s("el-select",{attrs:{placeholder:"isBAPU"},model:{value:t.groupinfo.isBAPU,callback:function(e){t.$set(t.groupinfo,"isBAPU",e)},expression:"groupinfo.isBAPU"}},[s("el-option",{attrs:{label:"yes",value:"yes"}}),s("el-option",{attrs:{label:"no",value:"no"}})],1)],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getregressionstatus(t.groupinfo.projectname,t.groupinfo.groupname,t.groupinfo.isBAPU)}}},[t._v("check")])],1)],1)],1),s("el-main",[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus,border:""}},[s("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),s("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),s("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),s("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),s("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"}}),s("el-table-column",{attrs:{prop:"alltestnum",label:"alltestnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("ALL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.alltestnum))])]}}])}),s("el-table-column",{attrs:{prop:"passnum",label:"passnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("PASS",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.passnum))])]}}])}),s("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.failnum))]),s("el-dialog",{attrs:{title:"FAIL tests list",visible:t.faillistvisible,width:"80%"},on:{"update:visible":function(e){t.faillistvisible=e}}},[s("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.failnum},on:{"current-change":t.handleCurrentChange}}),s("el-table",{attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])}),s("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.unknownnum))]),s("el-dialog",{attrs:{title:"unknown tests list",visible:t.unknownlistvisible,width:"80%"},on:{"update:visible":function(e){t.unknownlistvisible=e}}},[s("el-pagination",{attrs:{"page-size":100,layout:"prev, pager, next",total:e.row.unknownnum},on:{"current-change":t.handleCurrentChange}}),s("el-table",{attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)]}}])})],1),s("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"80%"},on:{"update:visible":function(e){t.visible=e}}},[s("el-pagination",{attrs:{"page-size":500,layout:"prev, pager, next",total:t.testdetails.length},on:{"current-change":t.handleCurrentChange}}),s("el-table",{attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)],1)],1)},C=[],O={name:"Bygrp",props:{},data:function(){return{groupinfo:{projectname:"mi200",groupname:"sanity",variantname:"nbif_nv10_gpu",isBAPU:"no"},groups:[],regressionstatus:[],testdetails:[],testdetails_disp:[],visible:!1,projects:[]}},methods:{getregressionstatus:function(t,e,s){this.regressionstatus=[],this.$http.post("/regression/get",{kind:"Bygrp",projectname:t,groupname:e,isBAPU:s}).then(function(t){"ok"==t.body.ok?this.regressionstatus=t.body.regressions:console.log(t.body)},function(){})},gettestdetails:function(t,e,s,a,n,o,r,l){console.log("gettestdetails"),console.log(t),this.visible=!0,this.$http.post("/regression/testdetails",{projectname:e,variantname:s,groupname:a,changelist:n,isBAPU:o,shelve:r,kickoffdate:l,kind:"testdetails",result:t}).then(function(e){console.log(t),console.log(e.body.testdetails),this.testdetails=e.body.testdetails,this.handleCurrentChange(1),"FAIL"==t?this.title="FAIL tests list":"UNKNOWN"==t?this.title="UNKNOWN tests list":"PASS"==t?this.title="PASS tests list":"ALL"==t&&(this.title="ALL tests list")},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=100*t<this.testdetails.length?100*t:this.testdetails.length;for(var s=100*(t-1);s<e;s++)this.testdetails_disp.push(this.testdetails[s])},projectchange:function(){this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.groupinfo.projectname,variantname:this.groupinfo.variantname,isBAPU:this.groupinfo.isBAPU}).then(function(t){"ok"==t.body.ok&&(this.groups=JSON.parse(t.body.groups),console.log("Project : "+this.groupinfo.projectname+" groups successfully get from DB"))},function(){})},getinfo:function(){this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.groupinfo.projectname,variantname:this.groupinfo.variantname,isBAPU:this.groupinfo.isBAPU}).then(function(t){"ok"==t.body.ok&&(this.groups=JSON.parse(t.body.groups),console.log("Project : "+this.groupinfo.projectname+" groups successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})}},mounted:function(){this.getregressionstatus(this.groupinfo.projectname,this.groupinfo.groupname,this.groupinfo.isBAPU),this.getinfo()}},x=O,S=Object(g["a"])(x,U,C,!1,null,"38008641",null),N=S.exports,$={name:"RegressionPage",props:{},data:function(){return{projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",modename:"rc"},projects:[],variants:[],testplans:[],kinds:["Overall","Bygrp","Byusr"],currentTab:"Overall"}},components:{Overall:y,Byusr:B,Bygrp:N},computed:{currentTabComponent:function(){return this.currentTab}},methods:{kind_disp:function(t){return t},handleOpen:function(t,e){},handleClose:function(t,e){}}},L=$,F=Object(g["a"])(L,o,r,!1,null,"67bd0dac",null),z=F.exports,D={name:"regression",components:{RegressionPage:z}},I=D,J=Object(g["a"])(I,a,n,!1,null,null,null);e["default"]=J.exports}}]);
//# sourceMappingURL=chunk-147bcd03.b81b1215.js.map