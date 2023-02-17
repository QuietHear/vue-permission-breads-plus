import { ref as V, watch as $, resolveComponent as z, openBlock as t, createElementBlock as l, normalizeClass as S, createElementVNode as A, Fragment as u, createTextVNode as I, toDisplayString as r, createCommentVNode as k, renderList as F, createBlock as s, resolveDynamicComponent as f, mergeProps as i, withCtx as m, normalizeProps as N } from "vue";
import { useRouter as q, useRoute as G } from "vue-router";
const H = { class: "left" }, J = ["onClick"], K = {
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
    const h = e, w = q(), C = G(), M = V(!1), y = V([]);
    let v = [], B = [];
    const T = (n) => {
      let a = n instanceof Array ? [] : {};
      for (let o in n)
        a[o] = typeof n[o] == "object" ? T(n[o]) : n[o];
      return a;
    }, g = (n) => ({
      name: n.name,
      title: n.title,
      icon: n.icon,
      replaceIndex: n.replaceIndex || !1,
      showBackBtn: n.showBackBtn || !1
    });
    $(
      () => h.menu,
      () => {
        x();
      }
    );
    const P = (n) => v.filter((a) => a.name === n)[0], D = (n, a) => {
      n.forEach((o) => {
        let c = [];
        a && (c = [...a.nameList], c.push(g(a))), o.nameList = c, o.children && o.children.length > 0 ? D(o.children, o) : o.children = [], v.push(o);
      });
    }, L = (n) => {
      n.forEach((a) => {
        if (a.replaceIndex !== !0)
          if (a.parents) {
            let o = a.parents.split("/");
            o.forEach((c, d) => {
              const b = P(c);
              b.replaceIndex !== !0 && a.nameList.push(g(b)), d + 1 === o.length && a.nameList.push(g(a));
            });
          } else
            a.nameList.push(g(a));
        a.children.length > 0 && L(a.children);
      });
    };
    $(C, () => {
      E();
    });
    const E = () => {
      const n = P(C.name);
      y.value = [...n.nameList], M.value = y.value[y.value.length - 1].showBackBtn || !1;
    }, x = () => {
      B = T(h.menu), v = [], B.length > 0 && (D(B), L(B), E());
    };
    x();
    const O = () => {
      w.back();
    }, R = (n) => {
      w.push({ name: n.name });
    };
    return (n, a) => {
      const o = z("el-icon");
      return t(), l("div", {
        class: S(["vue-permission-breads-plus", e.simpleMode ? "simple" : ""])
      }, [
        A("div", H, [
          e.simpleMode ? k("", !0) : (t(), l(u, { key: 0 }, [
            I(r(e.i18n ? n.$t(e.positionTitle) : e.positionTitle) + "\uFF1A ", 1)
          ], 64)),
          A("ul", null, [
            (t(!0), l(u, null, F(y.value, (c, d) => (t(), l("li", {
              key: d,
              onClick: (b) => d === y.value.length - 1 || R(c)
            }, [
              !e.hideMenuIcon && c.icon && (c.icon.icon || c.icon.type) ? (t(), l(u, { key: 0 }, [
                c.icon.type === "custom" ? (t(), s(f(c.icon.icon), i({
                  key: 0,
                  class: "menu-icon"
                }, c.icon.attrs), null, 16)) : c.icon.type === "el" ? (t(), s(o, i({
                  key: 1,
                  class: "menu-icon"
                }, c.icon.attrs), {
                  default: m(() => [
                    (t(), s(f(c.icon.icon)))
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
              d !== y.value.length - 1 && (e.spaceIcon.icon || e.spaceIcon.type) ? (t(), l(u, { key: 1 }, [
                e.spaceIcon.type === "custom" ? (t(), s(f(e.spaceIcon.icon), i({
                  key: 0,
                  class: "space-icon"
                }, e.spaceIcon.attrs), null, 16)) : e.spaceIcon.type === "el" ? (t(), s(o, i({
                  key: 1,
                  class: "space-icon"
                }, e.spaceIcon.attrs), {
                  default: m(() => [
                    (t(), s(f(e.spaceIcon.icon)))
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
            ], 8, J))), 128))
          ])
        ]),
        !e.simpleMode && M.value ? (t(), l("div", {
          key: 0,
          class: S(["back", e.backIconPosition === "right" ? "icon-right" : "icon-left"]),
          onClick: O
        }, [
          e.backIconPosition === "right" ? (t(), l(u, { key: 0 }, [
            I(r(e.i18n ? n.$t(e.backTitle) : e.backTitle), 1)
          ], 64)) : k("", !0),
          e.backBtn.icon || e.backBtn.type ? (t(), l(u, { key: 1 }, [
            e.backBtn.type === "custom" ? (t(), s(f(e.backBtn.icon), N(i({ key: 0 }, e.backBtn.attrs)), null, 16)) : e.backBtn.type === "el" ? (t(), s(o, N(i({ key: 1 }, e.backBtn.attrs)), {
              default: m(() => [
                (t(), s(f(e.backBtn.icon)))
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
}, Q = [K], U = {
  install(e) {
    Q.forEach((h) => {
      e.component("vuePermissionBreadsPlus", h);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(U);
export {
  U as default
};
