import { ref as $, watch as S, resolveComponent as F, openBlock as t, createElementBlock as l, normalizeClass as A, createElementVNode as N, Fragment as u, createTextVNode as I, toDisplayString as r, createCommentVNode as k, renderList as q, unref as b, createBlock as s, resolveDynamicComponent as y, mergeProps as i, withCtx as w, normalizeProps as O } from "vue";
import { useRouter as G, useRoute as H } from "vue-router";
const J = { class: "left" }, K = ["onClick"], Q = {
  __name: "index",
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    hideMenuIcon: {
      type: Boolean,
      default: !1
    },
    spaceIcon: {
      type: Object,
      default: () => ({
        icon: "\uFF1C"
      })
    },
    i18n: {
      type: Boolean,
      default: !1
    },
    simpleMode: {
      type: Boolean,
      default: !1
    },
    positionTitle: {
      type: String,
      default: "\u6211\u7684\u4F4D\u7F6E"
    },
    backTitle: {
      type: String,
      default: "\u8FD4\u56DE"
    },
    backIconPosition: {
      type: String,
      default: "left"
    },
    backBtn: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const h = e, C = G(), M = H(), T = $(!1), f = $([]);
    let m = [], B = [];
    const P = (n) => {
      let o = n instanceof Array ? [] : {};
      for (let a in n)
        o[a] = typeof n[a] == "object" ? P(n[a]) : n[a];
      return o;
    }, g = (n) => ({
      name: n.name,
      title: n.title,
      icon: n.icon,
      replaceIndex: n.replaceIndex || !1,
      showBackBtn: n.showBackBtn || !1
    });
    S(
      () => h.menu,
      () => {
        V();
      }
    );
    const D = (n) => m.filter((o) => o.name === n)[0], L = (n, o) => {
      n.forEach((a) => {
        let c = [];
        o && (c = [...o.nameList], c.push(g(o))), a.nameList = c, a.children && a.children.length > 0 ? L(a.children, a) : a.children = [], m.push(a);
      });
    }, E = (n) => {
      n.forEach((o) => {
        if (o.replaceIndex !== !0)
          if (o.parents) {
            let a = o.parents.split("/");
            a.forEach((c, d) => {
              const v = D(c);
              v.replaceIndex !== !0 && o.nameList.push(g(v)), d + 1 === a.length && o.nameList.push(g(o));
            });
          } else
            o.nameList.push(g(o));
        o.children.length > 0 && E(o.children);
      });
    };
    S(M, () => {
      x();
    });
    const x = () => {
      const n = D(M.name);
      f.value = [...n.nameList], T.value = f.value[f.value.length - 1].showBackBtn || !1;
    }, V = () => {
      B = P(h.menu), m = [], B.length > 0 && (L(B), E(B), x());
    };
    V();
    const R = () => {
      C.back();
    }, z = (n) => {
      C.push({ name: n.name });
    };
    return (n, o) => {
      const a = F("el-icon");
      return t(), l("div", {
        class: A(["vue-permission-breads-plus", e.simpleMode ? "simple" : ""])
      }, [
        N("div", J, [
          e.simpleMode ? k("", !0) : (t(), l(u, { key: 0 }, [
            I(r(e.i18n ? n.$t(e.positionTitle) : e.positionTitle) + "\uFF1A ", 1)
          ], 64)),
          N("ul", null, [
            (t(!0), l(u, null, q(b(f), (c, d) => (t(), l("li", {
              key: d,
              onClick: (v) => d === b(f).length - 1 || z(c)
            }, [
              !e.hideMenuIcon && c.icon && (c.icon.icon || c.icon.type) ? (t(), l(u, { key: 0 }, [
                c.icon.type === "custom" ? (t(), s(y(c.icon.icon), i({
                  key: 0,
                  class: "menu-icon"
                }, c.icon.attrs), null, 16)) : c.icon.type === "el" ? (t(), s(a, i({
                  key: 1,
                  class: "menu-icon"
                }, c.icon.attrs), {
                  default: w(() => [
                    (t(), s(y(c.icon.icon)))
                  ]),
                  _: 2
                }, 1040)) : c.icon.type === "iconfont" ? (t(), l("i", i({
                  key: 2,
                  class: ["menu-icon icon iconfont", "icon-" + c.icon.icon]
                }, c.icon.attrs), null, 16)) : (t(), l("i", i({
                  key: 3,
                  class: ["menu-icon", c.icon.type]
                }, c.icon.attrs), r(c.icon.icon), 17))
              ], 64)) : k("", !0),
              I(" " + r(e.i18n ? n.$t(c.title) : c.title) + " ", 1),
              d !== b(f).length - 1 && (e.spaceIcon.icon || e.spaceIcon.type) ? (t(), l(u, { key: 1 }, [
                e.spaceIcon.type === "custom" ? (t(), s(y(e.spaceIcon.icon), i({
                  key: 0,
                  class: "space-icon"
                }, e.spaceIcon.attrs), null, 16)) : e.spaceIcon.type === "el" ? (t(), s(a, i({
                  key: 1,
                  class: "space-icon"
                }, e.spaceIcon.attrs), {
                  default: w(() => [
                    (t(), s(y(e.spaceIcon.icon)))
                  ]),
                  _: 1
                }, 16)) : e.spaceIcon.type === "iconfont" ? (t(), l("i", i({
                  key: 2,
                  class: ["space-icon icon iconfont", "icon-" + e.spaceIcon.icon]
                }, e.spaceIcon.attrs), null, 16)) : (t(), l("i", i({
                  key: 3,
                  class: ["space-icon", e.spaceIcon.type]
                }, e.spaceIcon.attrs), r(e.spaceIcon.icon), 17))
              ], 64)) : k("", !0)
            ], 8, K))), 128))
          ])
        ]),
        !e.simpleMode && b(T) ? (t(), l("div", {
          key: 0,
          class: A(["back", e.backIconPosition === "right" ? "icon-right" : "icon-left"]),
          onClick: R
        }, [
          e.backIconPosition === "right" ? (t(), l(u, { key: 0 }, [
            I(r(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
          ], 64)) : k("", !0),
          e.backBtn.icon || e.backBtn.type ? (t(), l(u, { key: 1 }, [
            e.backBtn.type === "custom" ? (t(), s(y(e.backBtn.icon), O(i({ key: 0 }, e.backBtn.attrs)), null, 16)) : e.backBtn.type === "el" ? (t(), s(a, O(i({ key: 1 }, e.backBtn.attrs)), {
              default: w(() => [
                (t(), s(y(e.backBtn.icon)))
              ]),
              _: 1
            }, 16)) : e.backBtn.type === "iconfont" ? (t(), l("i", i({
              key: 2,
              class: ["icon iconfont", "icon-" + e.backBtn.icon]
            }, e.backBtn.attrs), null, 16)) : (t(), l("i", i({
              key: 3,
              class: e.backBtn.type
            }, e.backBtn.attrs), r(e.backBtn.icon), 17))
          ], 64)) : k("", !0),
          e.backIconPosition === "left" ? (t(), l(u, { key: 2 }, [
            I(r(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
          ], 64)) : k("", !0)
        ], 2)) : k("", !0)
      ], 2);
    };
  }
}, U = [Q], W = {
  install(e) {
    U.forEach((h) => {
      e.component("vuePermissionBreadsPlus", h);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(W);
export {
  W as default
};
