(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34b19e67"],{"1f12":function(t,e,a){"use strict";var n=a("8281"),r=a.n(n);r.a},"317b":function(t,e,a){},"79cd":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("MetricsPage")},r=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",{staticStyle:{border:"1px solid #eee"}},[a("el-header",[a("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[a("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[t._v("NBIF Main Page")]),a("ul",{staticClass:"navbar-nav px-3"},[a("li",{staticClass:"nav-item text-nowrap"})])])]),a("el-container",{staticStyle:{border:"1px solid #eee"}},[a("el-aside",{attrs:{width:"15%"}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.currentTab},on:{open:t.handleOpen,close:t.handleClose}},t._l(t.kinds,(function(e){return a("el-menu-item",{attrs:{index:e},on:{click:function(a){t.currentTab=e}}},[a("i",{staticClass:"el-icon-setting"}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.kind_disp(e)))])])})),1)],1),a("el-main",[a(t.currentTab,{tag:"component"})],1)],1)],1)},l=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClickPrj},model:{value:t.currentPrj,callback:function(e){t.currentPrj=e},expression:"currentPrj"}},t._l(t.projects,(function(e){return a("el-tab-pane",{attrs:{label:e.projectname,name:e.projectname}},[a("el-tabs",{on:{"tab-click":t.handleClickDVgrp},model:{value:t.currentDVgroup,callback:function(e){t.currentDVgroup=e},expression:"currentDVgroup"}},t._l(t.DVgroups,(function(e){return a("el-tab-pane",{attrs:{label:e.groupname,name:e.groupname}},[a("el-container",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)],1)],1)})),1)],1)})),1)},c=[],u=a("c1df"),i={name:"Byprj",props:{},data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}],variants:[],validvariants:[],DVgroups:[{groupname:"HOST"},{groupname:"DMA"},{groupname:"MISC"}],projects:[{projectname:"mi200"},{projectname:"mero"}],currentPrj:"mi200",currentDVgroup:"HOST",DVgroupPRstatus:[{groupname:"aer"},{groupname:"haha"}]}},methods:{tableRowClassName:function(t){t.row,t.rowIndex;return"success-row"},weekback:function(t){var e=u().day(-1-7*t).format("YYYY-MM-DD");return e},handleClickPrj:function(t,e){console.log(t,e),console.log(this.currentPrj)},handleClickDVgrp:function(t,e){console.log(t,e),console.log(this.currentDVgroup)},getinfo:function(){this.$http.post("/config/projects/get",{kind:"all"}).then((function(t){"ok"==t.body.ok&&(console.log(t.body.projects),console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))}),(function(){}))}},mounted:function(){this.getinfo()}},p=i,m=(a("1f12"),a("2877")),d=Object(m["a"])(p,s,c,!1,null,"cd669c7c",null),b=d.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)},f=[],h={name:"HomePage",props:{},data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}]}},methods:{tableRowClassName:function(t){t.row;var e=t.rowIndex;return 1===e?"warning-row":3===e?"success-row":""}}},v=h,j=(a("f7a5"),Object(m["a"])(v,g,f,!1,null,null,null)),k=j.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClickPrj},model:{value:t.currentPrj,callback:function(e){t.currentPrj=e},expression:"currentPrj"}},t._l(t.projects,(function(e){return a("el-tab-pane",{attrs:{label:e.projectname,name:e.projectname}},[a("el-tabs",{on:{"tab-click":t.handleClickDVgrp},model:{value:t.currentDVgroup,callback:function(e){t.currentDVgroup=e},expression:"currentDVgroup"}},t._l(t.DVgroups,(function(n){return a("el-tab-pane",{attrs:{label:n.groupname,name:n.groupname}},t._l(t.validvariants,(function(t){return a("PrjDVgrpVrntPage",{attrs:{projectname:e.projectname,variantname:t,DVgroup:n.groupname}})})),1)})),1)],1)})),1)},P=[],w=a("7618"),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",[a("el-header",[t._v("\n    "+t._s(t.variantname)+"\n  ")]),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.DVgroupPRstatus}},[a("el-table-column",{attrs:{prop:"groupname",label:"feature group"}}),a("el-table-column",{attrs:{prop:"isBAPU",label:"isBAPU"}}),a("el-table-column",{attrs:{label:t.weekback(2)}},[a("el-table-column",{attrs:{prop:"ActPRm2",label:"actual passrate"}}),a("el-table-column",{attrs:{prop:"TargetPRm2",label:"target passrate"}})],1),a("el-table-column",{attrs:{label:t.weekback(1)}},[a("el-table-column",{attrs:{prop:"ActPRm1",label:"actual passrate"}}),a("el-table-column",{attrs:{prop:"TargetPRm1",label:"target passrate"}})],1),a("el-table-column",{attrs:{label:t.weekback(0)}},[a("el-table-column",{attrs:{prop:"ActPR0",label:"actual passrate"}}),a("el-table-column",{attrs:{prop:"TargetPR0",label:"target passrate"}})],1),a("el-table-column",{attrs:{label:t.weekback(-1)}},[a("el-table-column",{attrs:{prop:"ActPR1",label:"actual passrate"}}),a("el-table-column",{attrs:{prop:"TargetPR1",label:"target passrate"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{model:{value:e.row.TargetPR1,callback:function(a){t.$set(e.row,"TargetPR1",a)},expression:"scope.row.TargetPR1"}})]}}])}),a("el-table-column",{attrs:{prop:"Comment",label:"Comment"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{model:{value:e.row.Comment,callback:function(a){t.$set(e.row,"Comment",a)},expression:"scope.row.Comment"}})]}}])})],1)],1)],1)],1)},V=[],C=a("c1df"),_={name:"PrjDVgrpVrntPage",props:{variantname:"",projectname:"",DVgroup:""},data:function(){return{DVgroupPRstatus:[]}},methods:{weekback:function(t){var e=C().day(1-7*t).format("YYYY-MM-DD");return e},getstatus:function(){console.log("getstatus"),console.log(this.projectname),console.log(this.variantname),console.log(this.DVgroup),this.$http.post("/metrics/getdvgroupprstatus",{kind:"Bygrp",projectname:this.projectname,variantname:this.variantname,DVgroup:this.DVgroup}).then((function(t){console.log(t.body.featuregroups),console.log(Object(w["a"])(t.body.featuregroups)),this.DVgroupPRstatus=JSON.parse(t.body.featuregroups)}),(function(){}))}},mounted:function(){this.getstatus()}},x=_,R=(a("9307"),Object(m["a"])(x,y,V,!1,null,"6236bd54",null)),O=R.exports,S=a("c1df"),B={name:"Byprj",props:{},data:function(){return{variants:[],validvariants:[],DVgroups:[{groupname:"HOST"},{groupname:"DMA"},{groupname:"MISC"}],projects:[],currentPrj:"mi200",currentDVgroup:"HOST",DVgroupPRstatus:[]}},components:{PrjDVgrpVrntPage:O},methods:{getvalidvariants:function(t){this.$http.post("/metrics/getvalidvariants",{kind:"Bygrp",projectname:t}).then((function(t){console.log(t.body.validvariants),console.log(Object(w["a"])(t.body.validvariants)),this.validvariants=JSON.parse(t.body.validvariants)}),(function(){}))},tableCellClassName:function(t){t.row,t.column,t.rowIndex,t.columnIndex},weekback:function(t){var e=S().day(1-7*t).format("YYYY-MM-DD");return e},handleClickPrj:function(t,e){console.log(t,e),console.log(this.currentPrj),this.getvalidvariants(this.currentPrj)},handleClickDVgrp:function(t,e){console.log(t,e),console.log(this.currentDVgroup)},getinfo:function(){this.$http.post("/config/projects/get",{kind:"all"}).then((function(t){"ok"==t.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(t.body.projects))}),(function(){})),this.getvalidvariants(this.currentPrj)}},mounted:function(){this.getinfo()}},T=B,M=(a("ae62"),Object(m["a"])(T,D,P,!1,null,"2d9a63bc",null)),Y=M.exports,$={name:"MetricsPage",props:{},data:function(){return{projectinfo:{projectname:"mi200"},projects:[],variants:[],users:[],currentTab:"Bygrp",kinds:["Byprj","Bygrp","Byusr"]}},components:{Byprj:b,Bygrp:Y,Byusr:k},methods:{kind_disp:function(t){return t},handleOpen:function(t,e){},handleClose:function(t,e){}}},N=$,A=Object(m["a"])(N,o,l,!1,null,"536454ef",null),I=A.exports,E={name:"metrics",components:{MetricsPage:I}},J=E,H=Object(m["a"])(J,n,r,!1,null,null,null);e["default"]=H.exports},8281:function(t,e,a){},9307:function(t,e,a){"use strict";var n=a("317b"),r=a.n(n);r.a},9715:function(t,e,a){},a397:function(t,e,a){},ae62:function(t,e,a){"use strict";var n=a("9715"),r=a.n(n);r.a},f7a5:function(t,e,a){"use strict";var n=a("a397"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-34b19e67.95c1a15a.js.map