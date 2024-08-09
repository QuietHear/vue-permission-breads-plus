import { resolveComponent as A, openBlock as o, createBlock as f, resolveDynamicComponent as P, normalizeProps as D, mergeProps as k, withCtx as N, createElementBlock as i, toDisplayString as d, ref as x, watch as E, normalizeClass as $, createElementVNode as S, Fragment as g, createTextVNode as b, createCommentVNode as u, renderList as R, unref as m } from "vue";
import { useRouter as z, useRoute as F } from "vue-router";
const j = {
  __name: "icon",
  props: {
    iconObj: {
      type: Object,
      requured: !0
    }
  },
  setup(e) {
    return (r, v) => {
      const s = A("el-icon");
      return e.iconObj.type === "custom" ? (o(), f(P(e.iconObj.icon), D(k({ key: 0 }, e.iconObj.attrs)), null, 16)) : e.iconObj.type === "el" ? (o(), f(s, D(k({ key: 1 }, e.iconObj.attrs)), {
        default: N(() => [
          (o(), f(P(e.iconObj.icon)))
        ]),
        _: 1
      }, 16)) : e.iconObj.type === "iconfont" ? (o(), i("i", k({
        key: 2,
        class: ["icon iconfont", "icon-" + e.iconObj.icon]
      }, e.iconObj.attrs), null, 16)) : (o(), i("i", k({
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
      default: "left",
      validator(e, r) {
        return ["left", "right"].includes(e);
      }
    },
    // 返回按钮
    backBtn: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const r = e, v = z(), s = F(), B = x(!1), l = x([]);
    let O = [], h = [];
    const w = (n) => {
      let t = n instanceof Array ? [] : {};
      for (let c in n)
        t[c] = typeof n[c] == "object" ? w(n[c]) : n[c];
      return t;
    }, y = (n) => ({
      name: n.name,
      title: n.title,
      icon: n.icon,
      replaceIndex: n.replaceIndex || !1,
      showBackBtn: n.showBackBtn || !1
    });
    E(
      () => r.menu,
      () => {
        M();
      }
    );
    const I = (n) => O.filter((t) => t.name === n)[0], T = (n, t) => {
      n.forEach((c) => {
        let a = [];
        t && (a = [...t.nameList], a.push(y(t))), c.nameList = a, c.children && c.children.length > 0 ? T(c.children, c) : c.children = [], O.push(c);
      });
    }, C = (n) => {
      n.forEach((t) => {
        t.parents && (t.nameList = [], t.parents.split("/").forEach((a) => {
          const p = I(a);
          t.nameList.push(y(p));
        })), t.replaceIndex !== !0 && t.nameList.push(y(t)), t.children.length > 0 && C(t.children);
      });
    };
    E(s, () => {
      h.length > 0 && L();
    });
    const L = () => {
      l.value = [], B.value = !1;
      const n = I(s.name);
      n && (l.value = w(n.nameList), l.value[l.value.length - 1].supLabel = s.query.breadsSupTit || "", s.query.diyTitle && (l.value[l.value.length - 1].title = s.query.diyTitle), B.value = l.value[l.value.length - 1].showBackBtn || !1);
    }, M = () => {
      h = w(r.menu), O = [], h.length > 0 && (T(h), C(h), L());
    };
    M();
    const V = () => {
      v.back();
    }, q = (n) => {
      v.push({ name: n.name });
    };
    return (n, t) => (o(), i("div", {
      class: $(["vue-permission-breads-plus", e.simpleMode ? "simple" : ""])
    }, [
      S("div", G, [
        e.simpleMode ? u("", !0) : (o(), i(g, { key: 0 }, [
          b(d(e.i18n ? n.$t(e.positionTitle) : e.positionTitle) + "： ", 1)
        ], 64)),
        S("ul", null, [
          (o(!0), i(g, null, R(m(l), (c, a) => (o(), i("li", {
            key: a,
            onClick: (p) => a === m(l).length - 1 || q(c)
          }, [
            !e.hideMenuIcon && c.icon && (c.icon.icon || c.icon.type) ? (o(), f(j, {
              key: 0,
              class: "menu-icon",
              iconObj: c.icon
            }, null, 8, ["iconObj"])) : u("", !0),
            b(" " + d(e.i18n ? n.$t(c.title) : c.title) + d(c.supLabel) + " ", 1),
            a !== m(l).length - 1 && (e.spaceIcon.icon || e.spaceIcon.type) ? (o(), f(j, {
              key: 1,
              class: "space-icon",
              iconObj: e.spaceIcon
            }, null, 8, ["iconObj"])) : u("", !0)
          ], 8, H))), 128))
        ])
      ]),
      !e.simpleMode && m(B) ? (o(), i("div", {
        key: 0,
        class: $(["back", e.backIconPosition === "right" ? "icon-right" : "icon-left"]),
        onClick: V
      }, [
        e.backIconPosition === "right" ? (o(), i(g, { key: 0 }, [
          b(d(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
        ], 64)) : u("", !0),
        e.backBtn.icon || e.backBtn.type ? (o(), f(j, {
          key: 1,
          iconObj: e.backBtn
        }, null, 8, ["iconObj"])) : u("", !0),
        e.backIconPosition === "left" ? (o(), i(g, { key: 2 }, [
          b(d(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
        ], 64)) : u("", !0)
      ], 2)) : u("", !0)
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
