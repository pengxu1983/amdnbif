(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa22f"],{1071:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ConfigPage")},a=[],r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",{staticStyle:{border:"1px solid #eee"}},[o("el-header",[o("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[o("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[e._v("NBIF Main Page")]),o("ul",{staticClass:"navbar-nav px-3"},[o("li",{staticClass:"nav-item text-nowrap"})])])]),o("el-container",{staticStyle:{border:"1px solid #eee"}},[o("el-aside",[o("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"Groups"},on:{open:e.handleOpen,close:e.handleClose}},e._l(e.kinds,function(t){return o("el-menu-item",{attrs:{index:t},on:{click:function(o){e.currentTab=t}}},[o("i",{staticClass:"el-icon-setting"}),o("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.kind_disp(t)))])])}),1)],1),o("el-main",[o(e.currentTabComponent,{tag:"component"})],1)],1)],1)},l=[],s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",[o("el-header",[o("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[o("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("NBIF Main Page")])])]),o("el-main",[o("el-row",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")]),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1),o("el-row",[o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.sanity,"max-height":"250"}},[o("el-table-column",{attrs:{fixed:"",prop:"taskname",label:"taskname"}}),o("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),o("el-table-column",{attrs:{prop:"province",label:"省份",width:"120"}}),o("el-table-column",{attrs:{prop:"city",label:"市区",width:"120"}}),o("el-table-column",{attrs:{prop:"address",label:"地址",width:"300"}}),o("el-table-column",{attrs:{prop:"zip",label:"邮编",width:"120"}}),o("el-table-column",{attrs:{fixed:"right",label:"operation",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},i=[],c={name:"SanityPage",props:{},data:function(){return{}},methods:{add:function(){},upload:function(){},get:function(){},deleteRow:function(e,t){t.splice(e,1)}}},u=c,p=o("2877"),d=Object(p["a"])(u,s,i,!1,null,"29f7e00f",null),f=d.exports,m=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",[o("el-main",[o("el-row",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")]),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1),o("el-row",[o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.variants}},[o("el-table-column",{attrs:{fixed:"",prop:"variantname",label:"variant"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{model:{value:t.row.variantname,callback:function(o){e.$set(t.row,"variantname",o)},expression:"scope.row.variantname"}})]}}])}),o("el-table-column",{attrs:{prop:"isSanity",label:"isSanity",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{clearable:"",placeholder:"yes or no"},model:{value:t.row.isSanity,callback:function(o){e.$set(t.row,"isSanity",o)},expression:"scope.row.isSanity"}},e._l(e.options,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),o("el-table-column",{attrs:{prop:"isValid",label:"isValid",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{clearable:"",placeholder:"yes or no"},model:{value:t.row.isValid,callback:function(o){e.$set(t.row,"isValid",o)},expression:"scope.row.isValid"}},e._l(e.options,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),o("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v("\n            delete\n          ")])]}}])})],1)],1)],1)],1)},h=[],b={name:"VariantsPage",props:{},data:function(){return{variants:[],options:["yes","no"]}},methods:{deleteRow:function(e,t){t.splice(e,1)},add:function(){this.variants.unshift({variantname:"",isSanity:"no",isValid:"yes"})},upload:function(){this.$http.post("/config/variants/upload",{kind:"all",variants:JSON.stringify(this.variants)}).then(function(e){"ok"==e.body.ok?alert(e.body.msg):"notok"==e.body.ok&&alert(e.body.msg)},function(){})},get:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(this.variants=JSON.parse(e.body.variants),console.log("all variants successfully get from DB"))},function(){})}},mounted:function(){this.get()}},g=b,v=Object(p["a"])(g,m,h,!1,null,"212178ee",null),y=v.exports,k=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",[o("el-main",[o("el-row",[o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.projectinfo}},[o("el-form-item",{attrs:{label:"Project"}},[o("el-select",{attrs:{placeholder:"Project"},on:{change:function(t){return e.getprojects()}},model:{value:e.projectinfo.projectname,callback:function(t){e.$set(e.projectinfo,"projectname",t)},expression:"projectinfo.projectname"}},e._l(e.projects,function(e){return o("el-option",{attrs:{label:e.projectname,value:e.projectname}})}),1)],1),o("el-form-item",{attrs:{label:"Variant"}},[o("el-select",{attrs:{placeholder:"Variant"},on:{change:function(t){return e.getgroups()}},model:{value:e.projectinfo.variantname,callback:function(t){e.$set(e.projectinfo,"variantname",t)},expression:"projectinfo.variantname"}},e._l(e.validvariants,function(e){return o("el-option",{attrs:{label:e,value:e}})}),1)],1),o("el-form-item",{attrs:{label:"isBAPU"}},[o("el-select",{attrs:{placeholder:"BAPU"},on:{change:function(t){return e.getgroups()}},model:{value:e.projectinfo.isBAPU,callback:function(t){e.$set(e.projectinfo,"isBAPU",t)},expression:"projectinfo.isBAPU"}},e._l(e.options,function(e){return o("el-option",{attrs:{label:e,value:e}})}),1)],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")])],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1)],1)],1),o("el-row",[o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.groups}},[o("el-table-column",{attrs:{fixed:"",prop:"groupname",label:"Feature Group"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{model:{value:t.row.groupname,callback:function(o){e.$set(t.row,"groupname",o)},expression:"scope.row.groupname"}})]}}])}),o("el-table-column",{attrs:{prop:"DVgroup",label:"DVgroup"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{clearable:"",placeholder:"DVgroup"},model:{value:t.row.DVgroup,callback:function(o){e.$set(t.row,"DVgroup",o)},expression:"scope.row.DVgroup"}},e._l(e.DVgroups,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),o("el-table-column",{attrs:{prop:"owner",label:"Owner"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"name contains","remote-method":e.remoteMethod,loading:e.loading},model:{value:t.row.owner,callback:function(o){e.$set(t.row,"owner",o)},expression:"scope.row.owner"}},e._l(e.users,function(e){return o("el-option",{key:e.realname,attrs:{label:e.realname,value:e.realname}})}),1)]}}])}),o("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRow(t.$index,e.groups)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},w=[],j={name:"GroupsPage",props:{},data:function(){return{options:["yes","no"],groups:[],DVgroups:["MISC","DMA","HOST"],users:[],loading:!1,projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",isBACO:"no",isBAPU:"no"},projects:[],validvariants:[]}},methods:{remoteMethod:function(e){this.loading=!0,""!==e?this.$http.post("/config/users/get",{kind:"search",query:e}).then(function(e){this.loading=!1,"ok"==e.body.ok&&(console.log(e.body),this.users=JSON.parse(e.body.users))},function(){}):this.users=[]},gotohome:function(){this.$router.push({name:"home"})},deleteRow:function(e,t){t.splice(e,1),t[0].groupname},add:function(){this.groups.unshift({groupname:"",DVgroup:"",owner:"",projectname:this.projectinfo.projectname,variantname:this.projectinfo.variantname,isBAPU:"no"})},upload:function(){this.$http.post("/config/groups/upload",{kind:"all",groups:JSON.stringify(this.groups)}).then(function(e){"ok"==e.body.ok?alert(e.body.msg):"notok"==e.body.ok&&alert(e.body.msg)},function(){})},getprojects:function(){this.projects=[],this.validvariants=[],this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){if("ok"==e.body.ok){console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects);for(var t=0;t<this.projects.length;t++)if(this.projects[t].projectname==this.projectinfo.projectname){console.log(this.projectinfo.projectname),console.log(this.projects[t].validvariants),this.validvariants=this.projects[t].validvariants,this.projectinfo.variantname=this.validvariants[0],this.getgroups();break}}},function(){})},getgroups:function(){this.groups=[],this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.projectinfo.projectname,variantname:this.projectinfo.variantname,isBAPU:this.projectinfo.isBAPU}).then(function(e){"ok"==e.body.ok&&(this.groups=JSON.parse(e.body.groups),console.log(e.body.groups),console.log("Project : "+this.projectinfo.projectname+" groups successfully get from DB"))},function(){})},get:function(){console.log("get"),console.log(this.projectinfo),this.groups=[],this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.projectinfo.projectname,variantname:this.projectinfo.variantname}).then(function(e){"ok"==e.body.ok&&(this.groups=JSON.parse(e.body.groups),console.log(e.body.groups),console.log("Project : "+this.projectinfo.projectname+" groups successfully get from DB"))},function(){}),this.projects=[],this.validvariants=[],this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){if("ok"==e.body.ok){console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects);for(var t=0;t<this.projects.length;t++)if(this.projects[t].projectname==this.projectinfo.projectname){console.log(this.projectinfo.projectname),console.log(this.projects[t].validvariants),this.validvariants=this.projects[t].validvariants,this.projectinfo.variantname=this.validvariants[0];break}}},function(){})}},mounted:function(){this.getgroups(),this.getprojects()}},_=j,x=Object(p["a"])(_,k,w,!1,null,"f248f42a",null),S=x.exports,$=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",[o("el-main",[o("el-row",[o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.projectadd()}}},[e._v("add")])],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.projectupload()}}},[e._v("upload")])],1)],1)],1),o("el-row",[o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.projects,border:"",stripe:"","max-height":"1000"}},[o("el-table-column",{attrs:{fixed:"",prop:"projectname",label:"projectname",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{model:{value:t.row.projectname,callback:function(o){e.$set(t.row,"projectname",o)},expression:"scope.row.projectname"}})]}}])}),o("el-table-column",{attrs:{prop:"validvariants",label:"validvariants",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-checkbox-group",{model:{value:t.row.validvariants,callback:function(o){e.$set(t.row,"validvariants",o)},expression:"scope.row.validvariants"}},e._l(e.variants,function(t){return o("div",[o("el-checkbox",{key:t,attrs:{label:t.variantname}},[e._v(e._s(t.variantname))])],1)}),0)]}}])}),o("el-table-column",{attrs:{prop:"hasBACO",label:"hasBACO",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{placeholder:"Yes or No"},model:{value:t.row.hasBACO,callback:function(o){e.$set(t.row,"hasBACO",o)},expression:"scope.row.hasBACO"}},e._l(e.options,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),o("el-table-column",{attrs:{prop:"hasBAPU",label:"hasBAPU",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{placeholder:"Yes or No"},model:{value:t.row.hasBAPU,callback:function(o){e.$set(t.row,"hasBAPU",o)},expression:"scope.row.hasBAPU"}},e._l(e.options,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),o("el-table-column",{attrs:{prop:"milestones",label:"milestones",width:"800"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-row",[o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(o){return e.milestoneadd(t.row.milestones)}}},[e._v("add")])],1)],1)],1),o("el-row",[o("el-table",{attrs:{data:t.row.milestones,width:"100%"}},[o("el-table-column",{attrs:{property:"milestonename",label:"milestonename"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-input",{model:{value:t.row.milestonename,callback:function(o){e.$set(t.row,"milestonename",o)},expression:"scope.row.milestonename"}})]}}],null,!0)}),o("el-table-column",{attrs:{property:"droptime",label:"droptime",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",{staticClass:"block"},[o("el-date-picker",{attrs:{type:"date",placeholder:"dateselect"},model:{value:t.row.droptime,callback:function(o){e.$set(t.row,"droptime",o)},expression:"scope.row.droptime"}})],1)]}}],null,!0)}),o("el-table-column",{attrs:{property:"integratetime",label:"integratetime"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",{staticClass:"block"},[o("el-date-picker",{attrs:{type:"date",placeholder:"dateselect"},model:{value:t.row.integratetime,callback:function(o){e.$set(t.row,"integratetime",o)},expression:"scope.row.integratetime"}})],1)]}}],null,!0)}),o("el-table-column",{attrs:{fixed:"right",label:"operation",width:"100"},scopedSlots:e._u([{key:"default",fn:function(n){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRow(n.$index,t.row.milestones)}}},[e._v("\n                      delete\n                    ")])]}}],null,!0)})],1)],1)]}}])}),o("el-table-column",{attrs:{prop:"ownerships",label:"ownerships",width:"600"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.row.ownerships,border:""}},[o("el-table-column",{attrs:{prop:"title",label:"title"}}),o("el-table-column",{attrs:{prop:"name",label:"name"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"name contains","remote-method":e.remoteMethod,loading:e.loading},model:{value:t.row.name,callback:function(o){e.$set(t.row,"name",o)},expression:"scope1.row.name"}},e._l(e.users,function(e){return o("el-option",{key:e.realname,attrs:{label:e.realname,value:e.realname}})}),1)]}}],null,!0)})],1)]}}])}),o("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRow(t.$index,e.projects)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},P=[],B={name:"ProjectsPage",props:{},data:function(){return{variants:[],projects:[],users:[],loading:!1,options:["yes","no"]}},methods:{remoteMethod:function(e){""!==e?(this.loading=!0,this.$http.post("/config/users/get",{kind:"search",query:e}).then(function(e){this.loading=!1,"ok"==e.body.ok&&(console.log(e.body),this.users=JSON.parse(e.body.users))},function(){})):this.users=[]},getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(this.variants=JSON.parse(e.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects))},function(){})},deleteRow:function(e,t){console.log("index"),console.log(e),console.log("rows"),console.log(t),t.splice(e,1)},milestoneadd:function(e){e.push({milestonename:"LS?",droptime:"",integratetime:""}),console.log(this.projects)},projectupload:function(){this.$http.post("/config/projects/upload",{kind:"all",projects:JSON.stringify(this.projects)}).then(function(e){"ok"==e.body.ok?(console.log(e.body),alert("projects uploaded")):"notok"==e.body.ok&&console.log(e.body)},function(){})},projectadd:function(){var e={projectname:"new project",validvariants:[],hasBAPU:"no",hasBACO:"no",milestones:[{milestonename:"LSA",droptime:"",integratetime:""},{milestonename:"LSB",droptime:"",integratetime:""},{milestonename:"LSC",droptime:"",integratetime:""},{milestonename:"LSD",droptime:"",integratetime:""}],ownerships:[{title:"PM",name:""},{title:"DElead",name:""},{title:"DVlead",name:""}]};this.projects.unshift(e)}},mounted:function(){this.getinfo()}},O=B,C=Object(p["a"])(O,$,P,!1,null,"400da8f8",null),D=C.exports,A={name:"ConfigPage",props:{},data:function(){return{projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",modename:"rc"},projects:[],variants:[],testplans:[],kinds:["Sanity","Users","Projects","Variants","Groups"],currentTab:"Groups"}},components:{SanityPage:f,VariantsPage:y,GroupsPage:S,ProjectsPage:D},computed:{currentTabComponent:function(){return this.currentTab+"Page"}},methods:{kind_disp:function(e){return e},handleOpen:function(e,t){},handleClose:function(e,t){}}},V=A,N=Object(p["a"])(V,r,l,!1,null,"289d7ce7",null),U=N.exports,J={name:"config",components:{ConfigPage:U}},M=J,R=Object(p["a"])(M,n,a,!1,null,null,null);t["default"]=R.exports}}]);
//# sourceMappingURL=chunk-2d0aa22f.e994a656.js.map