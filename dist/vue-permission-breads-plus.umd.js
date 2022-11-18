(function(e,d){typeof exports=="object"&&typeof module<"u"?module.exports=d(require("vue"),require("vue-router")):typeof define=="function"&&define.amd?define(["vue","vue-router"],d):(e=typeof globalThis<"u"?globalThis:e||self,e.vuePermissionBreadsPlus=d(e.Vue,e.vueRouter))})(this,function(e,d){"use strict";const L="",N=(a,i)=>{const o=a.__vccOpts||a;for(const[n,h]of i)o[n]=h;return o},S={name:"vuePermissionBreadsPlus",props:{menu:{type:Array,default:()=>[]},i18n:{type:Boolean,default:!1},positionTitle:{type:String,default:"\u6211\u7684\u4F4D\u7F6E"},backTitle:{type:String,default:"\u8FD4\u56DE"},backIconPosition:{type:String,default:"left"},backBtnClass:{type:String,default:"el/ArrowLeft"}},setup(a,{attrs:i,slots:o,emit:n,expose:h}){const m=d.useRouter(),f=d.useRoute(),s=e.ref(!1),k=e.ref([]);let B=e.ref([]);e.watch(()=>a.menu,()=>{E()});const g=(r,t)=>new Promise(l=>{r.forEach(c=>{c.name===t?l(c):c.children.length>0&&g(c.children,t).then(y=>{l(y)})})}),_=(r,t)=>{let l=[];t&&(l=[...t.nameList],l.push(t)),r.forEach(c=>{c.nameList=l,c.children&&c.children.length>0?_(c.children,JSON.parse(JSON.stringify(c))):c.children=[]})},b=r=>(r=JSON.parse(JSON.stringify(r)),r.forEach(t=>{if(t.replaceIndex!==!0)if(t.parents){let l=t.parents.split("/");l.forEach((c,y)=>{g(JSON.parse(JSON.stringify(B.value)),c).then(w=>{w.replaceIndex!==!0&&t.nameList.push(w),y+1===l.length&&t.nameList.push(t)})})}else t.nameList.push(t);t.children.length>0&&(t.children=[...b(t.children)])}),r);e.watch(f,()=>{C()});const C=()=>{g(B.value,f.name).then(r=>{k.value=r.nameList,s.value=k.value[k.value.length-1].showBackBtn||!1})},E=()=>{B.value=JSON.parse(JSON.stringify(a.menu)),_(B.value),B.value=[...b(B.value)],C()};E();const x=()=>{m.back()},D=r=>{m.push({name:r.name})},J=e.ref(a.backBtnClass.split("/"));return{showBackBtn:s,navigate:k,goBack:x,goOne:D,backBtnArr:J}}},A={class:"vue-permission-breads-plus"},P={class:"left"},V=["onClick"],u={key:0};function O(a,i,o,n,h,m){const f=e.resolveComponent("el-icon");return e.openBlock(),e.createElementBlock("div",A,[e.createElementVNode("div",P,[e.createTextVNode(e.toDisplayString(o.i18n?a.$t(o.positionTitle):o.positionTitle)+"\uFF1A ",1),e.createElementVNode("ul",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.navigate,(s,k)=>(e.openBlock(),e.createElementBlock("li",{key:k,onClick:B=>k===n.navigate.length-1||n.goOne(s)},[e.createTextVNode(e.toDisplayString(o.i18n?a.$t(s.title):s.title)+" ",1),k!==n.navigate.length-1?(e.openBlock(),e.createElementBlock("span",u,">")):e.createCommentVNode("",!0)],8,V))),128))])]),n.showBackBtn?(e.openBlock(),e.createElementBlock("div",{key:0,class:"back",onClick:i[0]||(i[0]=(...s)=>n.goBack&&n.goBack(...s))},[o.backIconPosition==="left"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[n.backBtnArr[0]==="el"?(e.openBlock(),e.createBlock(f,{key:0},{default:e.withCtx(()=>[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(n.backBtnArr[1])))]),_:1})):n.backBtnArr[0]==="iconfont"?(e.openBlock(),e.createElementBlock("i",{key:1,class:e.normalizeClass(["icon iconfont","icon-"+n.backBtnArr[1]])},null,2)):(e.openBlock(),e.createElementBlock("i",{key:2,class:e.normalizeClass(n.backBtnArr[0])},e.toDisplayString(n.backBtnArr[1]),3))],64)):e.createCommentVNode("",!0),e.createTextVNode(" "+e.toDisplayString(o.i18n?a.$t(o.backTitle):o.backTitle)+" ",1),o.backIconPosition==="right"?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[n.backBtnArr[0]==="el"?(e.openBlock(),e.createBlock(f,{key:0},{default:e.withCtx(()=>[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(n.backBtnArr[1])))]),_:1})):n.backBtnArr[0]==="iconfont"?(e.openBlock(),e.createElementBlock("i",{key:1,class:e.normalizeClass(["icon iconfont","icon-"+n.backBtnArr[1]])},null,2)):(e.openBlock(),e.createElementBlock("i",{key:2,class:e.normalizeClass(n.backBtnArr[0])},e.toDisplayString(n.backBtnArr[1]),3))],64)):e.createCommentVNode("",!0)])):e.createCommentVNode("",!0)])}const T=[N(S,[["render",O]])],p={install(a){T.forEach(i=>{a.component(i.name,i)})}};return typeof window<"u"&&window.Vue&&window.Vue.use(p),p});
