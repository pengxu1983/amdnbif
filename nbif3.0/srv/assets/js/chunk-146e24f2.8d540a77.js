(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-146e24f2"],{"4d3e":function(t,e,s){"use strict";var a=s("f155"),n=s.n(a);n.a},"5d58":function(t,e,s){t.exports=s("d8d6")},"67bb":function(t,e,s){t.exports=s("f921")},7618:function(t,e,s){"use strict";s.d(e,"a",function(){return l});var a=s("5d58"),n=s.n(a),r=s("67bb"),o=s.n(r);function i(t){return i="function"===typeof o.a&&"symbol"===typeof n.a?function(t){return typeof t}:function(t){return t&&"function"===typeof o.a&&t.constructor===o.a&&t!==o.a.prototype?"symbol":typeof t},i(t)}function l(t){return l="function"===typeof o.a&&"symbol"===i(n.a)?function(t){return i(t)}:function(t){return t&&"function"===typeof o.a&&t.constructor===o.a&&t!==o.a.prototype?"symbol":i(t)},l(t)}},d894:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("RegressionPage")},n=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",{staticStyle:{border:"1px solid #eee"}},[s("el-header",[s("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[s("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[t._v("NBIF Main Page")]),s("ul",{staticClass:"navbar-nav px-3"},[s("li",{staticClass:"nav-item text-nowrap"})])])]),s("el-container",{staticStyle:{border:"1px solid #eee"}},[s("el-aside",{attrs:{width:"15%"}},[s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.currentTab},on:{open:t.handleOpen,close:t.handleClose}},t._l(t.kinds,function(e){return s("el-menu-item",{attrs:{index:e},on:{click:function(s){t.currentTab=e}}},[s("i",{staticClass:"el-icon-setting"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.kind_disp(e)))])])}),1)],1),s("el-main",[s(t.currentTabComponent,{tag:"component",attrs:{variants:t.variants,projects:t.projects,projectinfo:t.projectinfo}})],1)],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeProj,callback:function(e){t.activeProj=e},expression:"activeProj"}},t._l(t.projects,function(t){return s("el-tab-pane",{attrs:{label:t.projectname,name:t.projectname}},[s("OneprojPage",{attrs:{projectname:t.projectname}})],1)}),1)},l=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus_disp,border:"",height:"500","row-class-name":t.selectedRegression}},[s("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),s("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),s("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),s("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),s("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){t.getgroupstatus(e.row.projectname,e.row.variantname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate),t.selectedRegressionIndex=e.$index}}},[t._v(t._s(e.row.passrate))])]}}])}),s("el-table-column",{attrs:{prop:"alltestnum",label:"alltestnum"}}),s("el-table-column",{attrs:{prop:"passnum",label:"passnum"}}),s("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate),t.selectedRegressionIndex=e.$index}}},[t._v(t._s(e.row.failnum))])]}}])}),s("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate),t.selectedRegressionIndex=e.$index}}},[t._v(t._s(e.row.unknownnum))])]}}])}),s("el-table-column",{attrs:{prop:"runningnum",label:"runningnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){t.gettestdetails("RUNNING",e.row.projectname,e.row.variantname,"all",e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate),t.selectedRegressionIndex=e.$index}}},[t._v(t._s(e.row.runningnum))])]}}])})],1),s("h3",[t._v("Per DVgroup status")]),s("Oneprojoneregress",{attrs:{groupstatus:t.groupstatus}}),s("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"80%"},on:{"update:visible":function(e){t.visible=e}}},[s("el-pagination",{attrs:{"page-size":t.pagesize,layout:"prev, pager, next",total:t.testdetails.length},on:{"current-change":t.handleCurrentChange}}),s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchparam}},[s("el-form-item",{attrs:{label:"testname contains"}},[s("el-input",{attrs:{placeholder:"testname contains"},model:{value:t.searchparam.testnamesrch,callback:function(e){t.$set(t.searchparam,"testnamesrch",e)},expression:"searchparam.testnamesrch"}})],1),s("el-form-item",{attrs:{label:"signature contains"}},[s("el-input",{attrs:{placeholder:"signature contains"},model:{value:t.searchparam.sigsrch,callback:function(e){t.$set(t.searchparam,"sigsrch",e)},expression:"searchparam.sigsrch"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.gettestdetails(t.searchparam.kind,t.searchparam.projectname,t.searchparam.variantname,t.searchparam.groupname,t.searchparam.changelist,t.searchparam.isBAPU,t.searchparam.shelve,t.searchparam.kickoffdate)}}},[t._v("Filter")])],1)],1),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200"}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)],1)},u=[],p=s("7618"),h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-container",[s("el-main",[s("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.selectedgroup,callback:function(e){t.selectedgroup=e},expression:"selectedgroup"}},t._l(t.DVgroups,function(t){return s("el-tab-pane",{attrs:{label:t,name:t}})}),1),s("h2",[t._v("DV Group Summary")]),s("hr"),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.DVsum,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"allnum",label:"alltestnum"}}),s("el-table-column",{attrs:{prop:"passnum",label:"passtestnum"}}),s("el-table-column",{attrs:{prop:"failnum",label:"failtestnum"}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"}})],1),s("h2",[t._v("Feature Group Summary")]),s("hr"),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.grpstatus,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"groupname",label:"groupname",sortable:""}}),s("el-table-column",{attrs:{prop:"allnum",label:"alltestnum",sortable:""}}),s("el-table-column",{attrs:{prop:"passnum",label:"passtestnum",sortable:""}}),s("el-table-column",{attrs:{prop:"failnum",label:"failtestnum",sortable:""}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"}})],1)],1)],1)],1)},m=[],g={name:"Oneprojoneregress",props:{groupstatus:[]},data:function(){return{DVgroups:["HOST","DMA","MISC","OTHERS","PERF","ALL"],grpstatus:[],DVsum:[],buttonclicked:"",selectedgroup:"ALL"}},methods:{handleClick:function(t,e){console.log(t,e),this.cal(this.selectedgroup)},cal:function(t){this.buttonclicked=t,this.grpstatus=[];for(var e=0,s=0,a=0,n=0,r=0;r<this.groupstatus.length;r++)"ALL"==t?(this.grpstatus.push(this.groupstatus[r]),e+=this.groupstatus[r].allnum,s+=this.groupstatus[r].passnum,a+=this.groupstatus[r].failnum):this.groupstatus[r].DVgroup==t&&(this.grpstatus.push(this.groupstatus[r]),e+=this.groupstatus[r].allnum,s+=this.groupstatus[r].passnum,a+=this.groupstatus[r].failnum);0==e||(n=s/e*100,n=n.toFixed(2)),this.DVsum=[],this.DVsum.push({allnum:e,passnum:s,failnum:a,passrate:n})}},mounted:function(){},updated:function(){this.handleClick()}},f=g,d=s("2877"),b=Object(d["a"])(f,h,m,!1,null,"736cf6f4",null),v=b.exports,k={name:"OneprojPage",props:{projectname:""},data:function(){return{regressionstatus_disp:[],testdetails:[],testdetails_disp:[],visible:!1,groupstatus:[],title:"",pagesize:500,selectedRegressionIndex:"",searchparam:{testnamesrch:"",sigsrch:"",kind:"",projectname:"",variantname:"",groupname:"",changelist:"",isBAPU:"",shelve:"",kickoffdate:""},oneregressioninfo:{projectname:"",variantname:"",changelist:"",shelve:"",isBAPU:"",kickoffdate:""}}},watch:{visible:function(t,e){0==e&&(this.searchparam.testnamesrch="",this.searchparam.sigsrch="")}},components:{Oneprojoneregress:v},methods:{selectedRegression:function(t){t.row;var e=t.rowIndex;return e==this.selectedRegressionIndex?"success-row":""},getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(this.variants=JSON.parse(t.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=t*this.pagesize<this.testdetails.length?t*this.pagesize:this.testdetails.length;for(var s=(t-1)*this.pagesize;s<e;s++)this.testdetails_disp.push(this.testdetails[s])},getgroupstatus:function(t,e,s,a,n,r){console.log("method : groupstatus"),this.oneregressioninfo.projectname=t,this.oneregressioninfo.variantname=e,this.oneregressioninfo.changelist=s,this.oneregressioninfo.isBAPU=a,this.oneregressioninfo.shelve=n,this.oneregressioninfo.kickoffdate=r,this.$http.post("/regression/groupstatus",{kind:"all",projectname:t,variantname:e,changelist:s,isBAPU:a,shelve:n,kickoffdate:r}).then(function(t){"ok"==t.body.ok?(console.log(t.body.groupstatus),console.log(Object(p["a"])(t.body.groupstatus)),this.groupstatus=t.body.groupstatus):console.log(t.body)},function(){})},gettestdetails:function(t,e,s,a,n,r,o,i){this.searchparam.kind=t,this.searchparam.projectname=e,this.searchparam.variantname=s,this.searchparam.groupname=a,this.searchparam.changelist=n,this.searchparam.isBAPU=r,this.searchparam.shelve=o,this.searchparam.kickoffdate=i,console.log("gettestdetails"),console.log(t),this.visible=!0,this.$http.post("/regression/testdetails",{projectname:this.searchparam.projectname,variantname:this.searchparam.variantname,groupname:this.searchparam.groupname,changelist:this.searchparam.changelist,isBAPU:this.searchparam.isBAPU,shelve:this.searchparam.shelve,kickoffdate:this.searchparam.kickoffdate,kind:"testdetails",result:this.searchparam.kind,testnamesrch:this.searchparam.testnamesrch,sigsrch:this.searchparam.sigsrch}).then(function(e){console.log(t),console.log(e.body.testdetails),this.testdetails=e.body.testdetails,this.handleCurrentChange(1),"FAIL"==t?this.title="FAIL tests list":"UNKNOWN"==t?this.title="UNKNOWN tests list":"PASS"==t?this.title="PASS tests list":"ALL"==t?this.title="ALL tests list":"RUNNING"==t&&(this.title="RUNNING tests list")},function(){})},regressionstatus:function(t){console.log("regressionstatus"),console.log(t),this.$http.post("/regression/get",{kind:"Overall",projectname:t}).then(function(e){if("ok"==e.body.ok){this.regressionstatus_disp=e.body.regressions,console.log("regressionstatus"),console.log(t),console.log(this.regressionstatus_disp);var s=this.regressionstatus_disp.shift();this.getgroupstatus(s.projectname,s.variantname,s.changelist,s.isBAPU,s.shelve,s.kickoffdate)}else console.log(e.body)},function(){})}},mounted:function(){this.getinfo(),this.regressionstatus(this.projectname),console.log("mounted : "+this.projectname)}},y=k,w=(s("4d3e"),Object(d["a"])(y,c,u,!1,null,"3f4fd861",null)),j=w.exports,_={name:"Overall",props:{},components:{OneprojPage:j},data:function(){return{projects:[],activeProj:"mi200",testdetails:[]}},methods:{getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(this.variants=JSON.parse(t.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})},handleClick:function(t,e){console.log(this.activeProj+" clicked")}},mounted:function(){this.getinfo()}},P=_,A=Object(d["a"])(P,i,l,!1,null,"fa5d2e92",null),B=A.exports,U=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",[s("el-main",[t._v("\n  aaa\n  ")]),s("el-main",[t._v("\n  bbb\n  ")])],1)},x=[],N={name:"Byusr",props:{},data:function(){return{}},methods:{}},S=N,O=Object(d["a"])(S,U,x,!1,null,"2458c027",null),C=O.exports,$=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",[s("el-header",[s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.groupinfo}},[s("el-form-item",{attrs:{label:"Project"}},[s("el-select",{attrs:{placeholder:"projectname"},on:{change:function(e){return t.projectchange()}},model:{value:t.groupinfo.projectname,callback:function(e){t.$set(t.groupinfo,"projectname",e)},expression:"groupinfo.projectname"}},t._l(t.projects,function(t){return s("el-option",{attrs:{label:t.projectname,value:t.projectname}})}),1)],1),s("el-form-item",{attrs:{label:"Group"}},[s("el-select",{attrs:{placeholder:"groupname"},model:{value:t.groupinfo.groupname,callback:function(e){t.$set(t.groupinfo,"groupname",e)},expression:"groupinfo.groupname"}},t._l(t.groups,function(t){return s("el-option",{attrs:{label:t.groupname,value:t.groupname}})}),1)],1),s("el-form-item",{attrs:{label:"isBAPU"}},[s("el-select",{attrs:{placeholder:"isBAPU"},model:{value:t.groupinfo.isBAPU,callback:function(e){t.$set(t.groupinfo,"isBAPU",e)},expression:"groupinfo.isBAPU"}},[s("el-option",{attrs:{label:"yes",value:"yes"}}),s("el-option",{attrs:{label:"no",value:"no"}})],1)],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getregressionstatus(t.groupinfo.projectname,t.groupinfo.groupname,t.groupinfo.isBAPU)}}},[t._v("check")])],1)],1)],1),s("el-main",[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.regressionstatus,border:""}},[s("el-table-column",{attrs:{prop:"kickoffdate",label:"kickoffdate",sortable:""}}),s("el-table-column",{attrs:{prop:"variantname",label:"variantname"}}),s("el-table-column",{attrs:{prop:"changelist",label:"changelist"}}),s("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),s("el-table-column",{attrs:{prop:"shelve",label:"shelve"}}),s("el-table-column",{attrs:{prop:"passrate",label:"passrate"}}),s("el-table-column",{attrs:{prop:"alltestnum",label:"alltestnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("ALL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.alltestnum))])]}}])}),s("el-table-column",{attrs:{prop:"passnum",label:"passnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("PASS",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.passnum))])]}}])}),s("el-table-column",{attrs:{prop:"failnum",label:"failnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("FAIL",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.failnum))])]}}])}),s("el-table-column",{attrs:{prop:"unknownnum",label:"unknownnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("UNKNOWN",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.unknownnum))])]}}])}),s("el-table-column",{attrs:{prop:"runningnum",label:"runningnum"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){return t.gettestdetails("RUNNING",e.row.projectname,e.row.variantname,t.groupinfo.groupname,e.row.changelist,e.row.isBAPU,e.row.shelve,e.row.kickoffdate)}}},[t._v(t._s(e.row.runningnum))])]}}])})],1),s("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"80%"},on:{"update:visible":function(e){t.visible=e}}},[s("el-pagination",{attrs:{"page-size":t.pagesize,layout:"prev, pager, next",total:t.testdetails.length},on:{"current-change":t.handleCurrentChange}}),s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchparam}},[s("el-form-item",{attrs:{label:"testname contains"}},[s("el-input",{attrs:{placeholder:"testname contains"},model:{value:t.searchparam.testnamesrch,callback:function(e){t.$set(t.searchparam,"testnamesrch",e)},expression:"searchparam.testnamesrch"}})],1),s("el-form-item",{attrs:{label:"signature contains"}},[s("el-input",{attrs:{placeholder:"signature contains"},model:{value:t.searchparam.sigsrch,callback:function(e){t.$set(t.searchparam,"sigsrch",e)},expression:"searchparam.sigsrch"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.gettestdetails(t.searchparam.kind,t.searchparam.projectname,t.searchparam.variantname,t.searchparam.groupname,t.searchparam.changelist,t.searchparam.isBAPU,t.searchparam.shelve,t.searchparam.kickoffdate)}}},[t._v("Filter")])],1)],1),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.testdetails_disp}},[s("el-table-column",{attrs:{property:"testname",label:"testname",width:"200",sortable:""}}),s("el-table-column",{attrs:{property:"seed",label:"seed",width:"200"}}),s("el-table-column",{attrs:{property:"signature",label:"signature"}})],1)],1)],1)],1)},L=[],I={name:"Bygrp",props:{},data:function(){return{groupinfo:{projectname:"mi200",groupname:"sanity",variantname:"nbif_nv10_gpu",isBAPU:"no"},groups:[],regressionstatus:[],testdetails:[],testdetails_disp:[],visible:!1,projects:[],searchparam:{testnamesrch:"",sigsrch:"",kind:"",projectname:"",variantname:"",groupname:"",changelist:"",isBAPU:"",shelve:"",kickoffdate:""},pagesize:500,title:""}},watch:{visible:function(t,e){0==e&&(this.searchparam.testnamesrch="",this.searchparam.sigsrch="")}},methods:{getregressionstatus:function(t,e,s){this.regressionstatus=[],this.$http.post("/regression/get",{kind:"Bygrp",projectname:t,groupname:e,isBAPU:s}).then(function(t){"ok"==t.body.ok?this.regressionstatus=t.body.regressions:console.log(t.body)},function(){})},gettestdetails:function(t,e,s,a,n,r,o,i){this.searchparam.kind=t,this.searchparam.projectname=e,this.searchparam.variantname=s,this.searchparam.groupname=a,this.searchparam.changelist=n,this.searchparam.isBAPU=r,this.searchparam.shelve=o,this.searchparam.kickoffdate=i,console.log("gettestdetails"),console.log(t),this.visible=!0,this.$http.post("/regression/testdetails",{projectname:this.searchparam.projectname,variantname:this.searchparam.variantname,groupname:this.searchparam.groupname,changelist:this.searchparam.changelist,isBAPU:this.searchparam.isBAPU,shelve:this.searchparam.shelve,kickoffdate:this.searchparam.kickoffdate,kind:"testdetails",result:this.searchparam.kind,testnamesrch:this.searchparam.testnamesrch,sigsrch:this.searchparam.sigsrch}).then(function(e){console.log(t),console.log(e.body.testdetails),this.testdetails=e.body.testdetails,this.handleCurrentChange(1),"FAIL"==t?this.title="FAIL tests list":"UNKNOWN"==t?this.title="UNKNOWN tests list":"PASS"==t?this.title="PASS tests list":"ALL"==t?this.title="ALL tests list":"RUNNING"==t&&(this.title="RUNNING tests list")},function(){})},handleCurrentChange:function(t){var e;console.log(t),this.testdetails_disp=[],e=t*this.pagesize<this.testdetails.length?t*this.pagesize:this.testdetails.length;for(var s=(t-1)*this.pagesize;s<e;s++)this.testdetails_disp.push(this.testdetails[s])},projectchange:function(){this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.groupinfo.projectname,variantname:this.groupinfo.variantname,isBAPU:this.groupinfo.isBAPU}).then(function(t){"ok"==t.body.ok&&(this.groups=JSON.parse(t.body.groups),console.log("Project : "+this.groupinfo.projectname+" groups successfully get from DB"))},function(){})},getinfo:function(){this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.groupinfo.projectname,variantname:this.groupinfo.variantname,isBAPU:this.groupinfo.isBAPU}).then(function(t){"ok"==t.body.ok&&(this.groups=JSON.parse(t.body.groups),console.log("Project : "+this.groupinfo.projectname+" groups successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))},function(){})}},mounted:function(){this.getregressionstatus(this.groupinfo.projectname,this.groupinfo.groupname,this.groupinfo.isBAPU),this.getinfo()}},R=I,D=Object(d["a"])(R,$,L,!1,null,"6948c941",null),z=D.exports,F={name:"RegressionPage",props:{},data:function(){return{projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",modename:"rc"},projects:[],variants:[],testplans:[],kinds:["Overall","Bygrp","Byusr"],currentTab:"Overall"}},components:{Overall:B,Byusr:C,Bygrp:z},computed:{currentTabComponent:function(){return this.currentTab}},methods:{kind_disp:function(t){return t},handleOpen:function(t,e){},handleClose:function(t,e){}}},E=F,G=Object(d["a"])(E,r,o,!1,null,"67bd0dac",null),J=G.exports,V={name:"regression",components:{RegressionPage:J}},T=V,K=Object(d["a"])(T,a,n,!1,null,null,null);e["default"]=K.exports},f155:function(t,e,s){}}]);
//# sourceMappingURL=chunk-146e24f2.8d540a77.js.map