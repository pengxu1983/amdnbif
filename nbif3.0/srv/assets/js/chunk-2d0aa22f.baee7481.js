(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa22f"],{1071:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ConfigPage")},a=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-header",[n("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[n("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"/"}},[e._v("NBIF Main Page")]),n("ul",{staticClass:"navbar-nav px-3"},[n("li",{staticClass:"nav-item text-nowrap"})])])]),n("el-container",{staticStyle:{border:"1px solid #eee"}},[n("el-aside",[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"Groups"},on:{open:e.handleOpen,close:e.handleClose}},e._l(e.kinds,function(t){return n("el-menu-item",{attrs:{index:t},on:{click:function(n){e.currentTab=t}}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.kind_disp(t)))])])}),1)],1),n("el-main",[n(e.currentTabComponent,{tag:"component"})],1)],1)],1)},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[n("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[e._v("NBIF Main Page")])])]),n("el-main",[n("el-row",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1),n("el-row",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.sanity,"max-height":"250"}},[n("el-table-column",{attrs:{fixed:"",prop:"taskname",label:"taskname"}}),n("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),n("el-table-column",{attrs:{prop:"province",label:"省份",width:"120"}}),n("el-table-column",{attrs:{prop:"city",label:"市区",width:"120"}}),n("el-table-column",{attrs:{prop:"address",label:"地址",width:"300"}}),n("el-table-column",{attrs:{prop:"zip",label:"邮编",width:"120"}}),n("el-table-column",{attrs:{fixed:"right",label:"operation",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},s=[],c={name:"SanityPage",props:{},data:function(){return{}},methods:{add:function(){},upload:function(){},get:function(){},deleteRow:function(e,t){t.splice(e,1)}}},u=c,p=n("2877"),d=Object(p["a"])(u,i,s,!1,null,"29f7e00f",null),m=d.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-main",[n("el-row",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1),n("el-row",[n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.variants}},[n("el-table-column",{attrs:{fixed:"",prop:"variantname",label:"variant"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{model:{value:t.row.variantname,callback:function(n){e.$set(t.row,"variantname",n)},expression:"scope.row.variantname"}})]}}])}),n("el-table-column",{attrs:{prop:"isSanity",label:"isSanity",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{clearable:"",placeholder:"yes or no"},model:{value:t.row.isSanity,callback:function(n){e.$set(t.row,"isSanity",n)},expression:"scope.row.isSanity"}},e._l(e.options,function(e){return n("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),n("el-table-column",{attrs:{prop:"isValid",label:"isValid",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{clearable:"",placeholder:"yes or no"},model:{value:t.row.isValid,callback:function(n){e.$set(t.row,"isValid",n)},expression:"scope.row.isValid"}},e._l(e.options,function(e){return n("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v("\n            delete\n          ")])]}}])})],1)],1)],1)],1)},b=[],h={name:"VariantsPage",props:{},data:function(){return{variants:[],options:["yes","no"]}},methods:{deleteRow:function(e,t){t.splice(e,1)},add:function(){this.variants.unshift({variantname:"",isSanity:"no",isValid:"yes"})},upload:function(){this.$http.post("/config/variants/upload",{kind:"all",variants:JSON.stringify(this.variants)}).then(function(e){"ok"==e.body.ok?alert(e.body.msg):"notok"==e.body.ok&&alert(e.body.msg)},function(){})},get:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(this.variants=JSON.parse(e.body.variants),console.log("all variants successfully get from DB"))},function(){})}},mounted:function(){this.get()}},v=h,g=Object(p["a"])(v,f,b,!1,null,"212178ee",null),y=g.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-main",[n("el-row",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.projectinfo}},[n("el-form-item",{attrs:{label:"Project"}},[n("el-select",{attrs:{placeholder:"Project"},on:{change:function(t){return e.get()}},model:{value:e.projectinfo.projectname,callback:function(t){e.$set(e.projectinfo,"projectname",t)},expression:"projectinfo.projectname"}},e._l(e.projects,function(e){return n("el-option",{attrs:{label:e.projectname,value:e.projectname}})}),1)],1),n("el-form-item",{attrs:{label:"Variant"}},[n("el-select",{attrs:{placeholder:"Variant"},on:{change:function(t){return e.get()}},model:{value:e.projectinfo.variantname,callback:function(t){e.$set(e.projectinfo,"variantname",t)},expression:"projectinfo.variantname"}},e._l(e.validvariants,function(e){return n("el-option",{attrs:{label:e.variantname,value:e.variantname}})}),1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("add")])],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upload()}}},[e._v("upload")])],1)],1)],1),n("el-row",[n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.groups}},[n("el-table-column",{attrs:{fixed:"",prop:"groupname",label:"Feature Group"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{model:{value:t.row.groupname,callback:function(n){e.$set(t.row,"groupname",n)},expression:"scope.row.groupname"}})]}}])}),n("el-table-column",{attrs:{prop:"DVgroup",label:"DVgroup"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{clearable:"",placeholder:"DVgroup"},model:{value:t.row.DVgroup,callback:function(n){e.$set(t.row,"DVgroup",n)},expression:"scope.row.DVgroup"}},e._l(e.DVgroups,function(e){return n("el-option",{key:e,attrs:{label:e,value:e}})}),1)]}}])}),n("el-table-column",{attrs:{prop:"owner",label:"Owner"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"name contains","remote-method":e.remoteMethod,loading:e.loading},model:{value:t.row.owner,callback:function(n){e.$set(t.row,"owner",n)},expression:"scope.row.owner"}},e._l(e.users,function(e){return n("el-option",{key:e.realname,attrs:{label:e.realname,value:e.realname}})}),1)]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),e.deleteRow(t.$index,e.groups)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},w=[],j={name:"GroupsPage",props:{},data:function(){return{groups:[],DVgroups:["MISC","DMA","HOST"],users:[],loading:!1,projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu"},projects:[],validvariants:[]}},methods:{remoteMethod:function(e){this.loading=!0,""!==e?this.$http.post("/config/users/get",{kind:"search",query:e}).then(function(e){this.loading=!1,"ok"==e.body.ok&&(console.log(e.body),this.users=JSON.parse(e.body.users))},function(){}):this.users=[]},gotohome:function(){this.$router.push({name:"home"})},deleteRow:function(e,t){t.splice(e,1)},add:function(){this.groups.unshift({groupname:"",DVgroup:"",owner:"",projectname:this.projectinfo.projectname,variantname:this.projectinfo.variantname})},upload:function(){this.$http.post("/config/groups/upload",{kind:"all",groups:JSON.stringify(this.groups)}).then(function(e){"ok"==e.body.ok?alert(e.body.msg):"notok"==e.body.ok&&alert(e.body.msg)},function(){})},get:function(){this.groups=[],this.$http.post("/config/groups/get",{kind:"Bygrp",projectname:this.projectinfo.projectname,variantname:this.projectinfo.variantname}).then(function(e){"ok"==e.body.ok&&(this.groups=JSON.parse(e.body.groups),console.log("Project : "+this.projectinfo.projectname+" groups successfully get from DB"))},function(){}),this.projects=[],this.validvariants=[],this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){if("ok"==e.body.ok){console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects);for(var t=0;t<this.projects.length;t++)if(this.projects[t].projectname==this.projectinfo.projectname){console.log(this.projectinfo.projectname),console.log(projects[t].validvariants),this.validvariants=projects[t].validvariants;break}}},function(){})}},mounted:function(){this.get()}},_=j,x=Object(p["a"])(_,k,w,!1,null,"5d49a58c",null),S=x.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-main",[n("el-row",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.projectadd()}}},[e._v("add")])],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.projectupload()}}},[e._v("upload")])],1)],1)],1),n("el-row",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.projects,border:"",stripe:""}},[n("el-table-column",{attrs:{prop:"projectname",label:"projectname",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{model:{value:t.row.projectname,callback:function(n){e.$set(t.row,"projectname",n)},expression:"scope.row.projectname"}})]}}])}),n("el-table-column",{attrs:{prop:"validvariants",label:"validvariants",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-checkbox-group",{model:{value:t.row.validvariants,callback:function(n){e.$set(t.row,"validvariants",n)},expression:"scope.row.validvariants"}},e._l(e.variants,function(t){return n("div",[n("el-checkbox",{key:t,attrs:{label:t.variantname}},[e._v(e._s(t.variantname))])],1)}),0)]}}])}),n("el-table-column",{attrs:{prop:"milestones",label:"milestones"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-row",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(n){return e.milestoneadd(t.row.milestones)}}},[e._v("add")])],1)],1)],1),n("el-row",[n("el-table",{attrs:{data:t.row.milestones,width:"100%"}},[n("el-table-column",{attrs:{property:"milestonename",label:"milestonename"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{model:{value:t.row.milestonename,callback:function(n){e.$set(t.row,"milestonename",n)},expression:"scope.row.milestonename"}})]}}],null,!0)}),n("el-table-column",{attrs:{property:"droptime",label:"droptime",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"block"},[n("el-date-picker",{attrs:{type:"date",placeholder:"dateselect"},model:{value:t.row.droptime,callback:function(n){e.$set(t.row,"droptime",n)},expression:"scope.row.droptime"}})],1)]}}],null,!0)}),n("el-table-column",{attrs:{property:"integratetime",label:"integratetime"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"block"},[n("el-date-picker",{attrs:{type:"date",placeholder:"dateselect"},model:{value:t.row.integratetime,callback:function(n){e.$set(t.row,"integratetime",n)},expression:"scope.row.integratetime"}})],1)]}}],null,!0)}),n("el-table-column",{attrs:{fixed:"right",label:"operation",width:"100"},scopedSlots:e._u([{key:"default",fn:function(o){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),e.deleteRow(o.$index,t.row.milestones)}}},[e._v("\n                      delete\n                    ")])]}}],null,!0)})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"ownerships",label:"ownerships"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.row.ownerships,border:""}},[n("el-table-column",{attrs:{prop:"title",label:"title"}}),n("el-table-column",{attrs:{prop:"name",label:"name"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"name contains","remote-method":e.remoteMethod,loading:e.loading},model:{value:t.row.name,callback:function(n){e.$set(t.row,"name",n)},expression:"scope1.row.name"}},e._l(e.users,function(e){return n("el-option",{key:e.realname,attrs:{label:e.realname,value:e.realname}})}),1)]}}],null,!0)})],1)]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"operation",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),e.deleteRow(t.$index,e.projects)}}},[e._v("\n              delete\n            ")])]}}])})],1)],1)],1)],1)},D=[],O={name:"ProjectsPage",props:{},data:function(){return{variants:[],projects:[],users:[],loading:!1}},methods:{remoteMethod:function(e){""!==e?(this.loading=!0,this.$http.post("/config/users/get",{kind:"search",query:e}).then(function(e){this.loading=!1,"ok"==e.body.ok&&(console.log(e.body),this.users=JSON.parse(e.body.users))},function(){})):this.users=[]},getinfo:function(){this.$http.post("/config/variants/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(this.variants=JSON.parse(e.body.variants),console.log("all variants successfully get from DB"))},function(){}),this.$http.post("/config/projects/get",{kind:"all"}).then(function(e){"ok"==e.body.ok&&(console.log("all projects successfully get from DB"),this.projects=JSON.parse(e.body.projects))},function(){})},deleteRow:function(e,t){console.log("index"),console.log(e),console.log("rows"),console.log(t),t.splice(e,1)},milestoneadd:function(e){e.push({milestonename:"LS?",droptime:"",integratetime:""}),console.log(this.projects)},projectupload:function(){this.$http.post("/config/projects/upload",{kind:"all",projects:JSON.stringify(this.projects)}).then(function(e){"ok"==e.body.ok?(console.log(e.body),alert("projects uploaded")):"notok"==e.body.ok&&console.log(e.body)},function(){})},projectadd:function(){var e={projectname:"new project",validvariants:[],milestones:[{milestonename:"LSA",droptime:"",integratetime:""},{milestonename:"LSB",droptime:"",integratetime:""},{milestonename:"LSC",droptime:"",integratetime:""},{milestonename:"LSD",droptime:"",integratetime:""}],ownerships:[{title:"PM",name:""},{title:"DElead",name:""},{title:"DVlead",name:""}]};this.projects.unshift(e)}},mounted:function(){this.getinfo()}},C=O,P=Object(p["a"])(C,$,D,!1,null,"7dfb47d8",null),V=P.exports,J={name:"ConfigPage",props:{},data:function(){return{projectinfo:{projectname:"mi200",variantname:"nbif_nv10_gpu",modename:"rc"},projects:[],variants:[],testplans:[],kinds:["Sanity","Users","Projects","Variants","Groups"],currentTab:"Groups"}},components:{SanityPage:m,VariantsPage:y,GroupsPage:S,ProjectsPage:V},computed:{currentTabComponent:function(){return this.currentTab+"Page"}},methods:{kind_disp:function(e){return e},handleOpen:function(e,t){},handleClose:function(e,t){}}},N=J,B=Object(p["a"])(N,l,r,!1,null,"289d7ce7",null),M=B.exports,R={name:"config",components:{ConfigPage:M}},E=R,z=Object(p["a"])(E,o,a,!1,null,null,null);t["default"]=z.exports}}]);
//# sourceMappingURL=chunk-2d0aa22f.baee7481.js.map