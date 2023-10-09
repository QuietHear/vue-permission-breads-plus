import { resolveComponent as N, openBlock as o, createBlock as u, resolveDynamicComponent as D, normalizeProps as x, mergeProps as y, withCtx as R, createElementBlock as l, toDisplayString as d, ref as E, watch as $, normalizeClass as V, createElementVNode as S, Fragment as g, createTextVNode as b, createCommentVNode as s, renderList as z, unref as m } from "vue";
import { useRouter as q, useRoute as F } from "vue-router";
const w = {
  __name: "icon",
  props: {
    iconObj: {
      type: Object,
      requured: !0
    }
  },
  setup(e) {
    return (r, B) => {
      const h = N("el-icon");
      return e.iconObj.type === "custom" ? (o(), u(D(e.iconObj.icon), x(y({ key: 0 }, e.iconObj.attrs)), null, 16)) : e.iconObj.type === "el" ? (o(), u(h, x(y({ key: 1 }, e.iconObj.attrs)), {
        default: R(() => [
          (o(), u(D(e.iconObj.icon)))
        ]),
        _: 1
      }, 16)) : e.iconObj.type === "iconfont" ? (o(), l("i", y({
        key: 2,
        class: ["icon iconfont", "icon-" + e.iconObj.icon]
      }, e.iconObj.attrs), null, 16)) : (o(), l("i", y({
        key: 3,
        class: e.iconObj.type
      }, e.iconObj.attrs), d(e.iconObj.icon), 17));
    };
  }
};
const G = { class: "left" }, H = ["onClick"], J = {
  __name: "index",
  props: {
    // 菜单集合数据
    menu: {
      type: Array,
      default: () => []
    },
    // 隐藏菜单图标
    hideMenuIcon: {
      type: Boolean,
      default: !1
    },
    // 间隔图标
    spaceIcon: {
      type: Object,
      default: () => ({
        icon: "＜"
      })
    },
    // 是否开启国际化
    i18n: {
      type: Boolean,
      default: !1
    },
    // 简易模式
    simpleMode: {
      type: Boolean,
      default: !1
    },
    // 我的位置文字
    positionTitle: {
      type: String,
      default: "我的位置"
    },
    // 返回文字
    backTitle: {
      type: String,
      default: "返回"
    },
    // 返回图标的位置
    backIconPosition: {
      type: String,
      default: "left"
    },
    // 返回按钮
    backBtn: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const r = e, B = q(), h = F(), O = E(!1), i = E([]);
    let v = [], f = [];
    const j = (n) => {
      let t = n instanceof Array ? [] : {};
      for (let c in n)
        t[c] = typeof n[c] == "object" ? j(n[c]) : n[c];
      return t;
    }, k = (n) => ({
      name: n.name,
      title: n.title,
      icon: n.icon,
      replaceIndex: n.replaceIndex || !1,
      showBackBtn: n.showBackBtn || !1
    });
    $(
      () => r.menu,
      () => {
        L();
      }
    );
    const I = (n) => v.filter((t) => t.name === n)[0], C = (n, t) => {
      n.forEach((c) => {
        let a = [];
        t && (a = [...t.nameList], a.push(k(t))), c.nameList = a, c.children && c.children.length > 0 ? C(c.children, c) : c.children = [], v.push(c);
      });
    }, M = (n) => {
      n.forEach((t) => {
        t.parents && (t.nameList = [], t.parents.split("/").forEach((a) => {
          const P = I(a);
          t.nameList.push(k(P));
        })), t.replaceIndex !== !0 && t.nameList.push(k(t)), t.children.length > 0 && M(t.children);
      });
    };
    $(h, () => {
      f.length > 0 && T();
    });
    const T = () => {
      i.value = [], O.value = !1;
      const n = I(h.name);
      n && (i.value = [...n.nameList], O.value = i.value[i.value.length - 1].showBackBtn || !1);
    }, L = () => {
      f = j(r.menu), v = [], f.length > 0 && (C(f), M(f), T());
    };
    L();
    const p = () => {
      B.back();
    }, A = (n) => {
      B.push({ name: n.name });
    };
    return (n, t) => (o(), l("div", {
      class: V(["vue-permission-breads-plus", e.simpleMode ? "simple" : ""])
    }, [
      S("div", G, [
        e.simpleMode ? s("", !0) : (o(), l(g, { key: 0 }, [
          b(d(e.i18n ? n.$t(e.positionTitle) : e.positionTitle) + "： ", 1)
        ], 64)),
        S("ul", null, [
          (o(!0), l(g, null, z(m(i), (c, a) => (o(), l("li", {
            key: a,
            onClick: (P) => a === m(i).length - 1 || A(c)
          }, [
            !e.hideMenuIcon && c.icon && (c.icon.icon || c.icon.type) ? (o(), u(w, {
              key: 0,
              class: "menu-icon",
              iconObj: c.icon
            }, null, 8, ["iconObj"])) : s("", !0),
            b(" " + d(e.i18n ? n.$t(c.title) : c.title) + " ", 1),
            a !== m(i).length - 1 && (e.spaceIcon.icon || e.spaceIcon.type) ? (o(), u(w, {
              key: 1,
              class: "space-icon",
              iconObj: e.spaceIcon
            }, null, 8, ["iconObj"])) : s("", !0)
          ], 8, H))), 128))
        ])
      ]),
      !e.simpleMode && m(O) ? (o(), l("div", {
        key: 0,
        class: V(["back", e.backIconPosition === "right" ? "icon-right" : "icon-left"]),
        onClick: p
      }, [
        e.backIconPosition === "right" ? (o(), l(g, { key: 0 }, [
          b(d(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
        ], 64)) : s("", !0),
        e.backBtn.icon || e.backBtn.type ? (o(), u(w, {
          key: 1,
          iconObj: e.backBtn
        }, null, 8, ["iconObj"])) : s("", !0),
        e.backIconPosition === "left" ? (o(), l(g, { key: 2 }, [
          b(d(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
        ], 64)) : s("", !0)
      ], 2)) : s("", !0)
    ], 2));
  }
}, K = [J], Q = {
  install(e) {
    K.forEach((r) => {
      e.component("vuePermissionBreadsPlus", r);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Q);
export {
  Q as default
};
