import { ref as V, watch as $, resolveComponent as z, openBlock as c, createElementBlock as l, normalizeClass as S, createElementVNode as A, Fragment as u, createTextVNode as g, toDisplayString as r, createCommentVNode as k, renderList as F, createBlock as s, resolveDynamicComponent as f, mergeProps as i, withCtx as m, normalizeProps as N } from "vue";
import { useRouter as p, useRoute as q } from "vue-router";
const G = { class: "left" }, H = ["onClick"], J = {
  __name: "index",
  props: {
    menu: {
      type: Array,
      default: () => []
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
    const h = e, w = p(), C = q(), T = V(!1), y = V([]);
    let v = [], I = [];
    const P = (t, a = 1) => {
      let o = t instanceof Array ? [] : {};
      for (let n in t)
        o[n] = typeof t[n] == "object" ? P(t[n], a + 1) : t[n];
      return o;
    }, B = (t) => ({
      name: t.name,
      title: t.title,
      icon: t.icon,
      replaceIndex: t.replaceIndex || !1,
      showBackBtn: t.showBackBtn || !1
    });
    $(
      () => h.menu,
      () => {
        x();
      }
    );
    const D = (t) => v.filter((a) => a.name === t)[0], L = (t, a) => {
      t.forEach((o) => {
        let n = [];
        a && (n = [...a.nameList], n.push(B(a))), o.nameList = n, o.children && o.children.length > 0 ? L(o.children, o) : o.children = [], v.push(o);
      });
    }, M = (t) => {
      t.forEach((a) => {
        if (a.replaceIndex !== !0)
          if (a.parents) {
            let o = a.parents.split("/");
            o.forEach((n, d) => {
              const b = D(n);
              b.replaceIndex !== !0 && a.nameList.push(B(b)), d + 1 === o.length && a.nameList.push(B(a));
            });
          } else
            a.nameList.push(B(a));
        a.children.length > 0 && M(a.children);
      });
    };
    $(C, () => {
      E();
    });
    const E = () => {
      const t = D(C.name);
      y.value = [...t.nameList], T.value = y.value[y.value.length - 1].showBackBtn || !1;
    }, x = () => {
      I = P(h.menu), v = [], L(I), M(I), E();
    };
    x();
    const O = () => {
      w.back();
    }, R = (t) => {
      w.push({ name: t.name });
    };
    return (t, a) => {
      const o = z("el-icon");
      return c(), l("div", {
        class: S(["vue-permission-breads-plus", e.simpleMode ? "simple" : ""])
      }, [
        A("div", G, [
          e.simpleMode ? k("", !0) : (c(), l(u, { key: 0 }, [
            g(r(e.i18n ? t.$t(e.positionTitle) : e.positionTitle) + "\uFF1A ", 1)
          ], 64)),
          A("ul", null, [
            (c(!0), l(u, null, F(y.value, (n, d) => (c(), l("li", {
              key: d,
              onClick: (b) => d === y.value.length - 1 || R(n)
            }, [
              n.icon && (n.icon.icon || n.icon.type) ? (c(), l(u, { key: 0 }, [
                n.icon.type === "custom" ? (c(), s(f(n.icon.icon), i({
                  key: 0,
                  class: "menu-icon"
                }, n.icon.attrs), null, 16)) : n.icon.type === "el" ? (c(), s(o, i({
                  key: 1,
                  class: "menu-icon"
                }, n.icon.attrs), {
                  default: m(() => [
                    (c(), s(f(n.icon.icon)))
                  ]),
                  _: 2
                }, 1040)) : n.icon.type === "iconfont" ? (c(), l("i", i({
                  key: 2,
                  class: ["menu-icon icon iconfont", "icon-" + n.icon.icon]
                }, n.icon.attrs), null, 16)) : (c(), l("i", i({
                  key: 3,
                  class: ["menu-icon", n.icon.type]
                }, n.icon.attrs), r(n.icon.icon), 17))
              ], 64)) : k("", !0),
              g(" " + r(e.i18n ? t.$t(n.title) : n.title) + " ", 1),
              d !== y.value.length - 1 && (e.spaceIcon.icon || e.spaceIcon.type) ? (c(), l(u, { key: 1 }, [
                e.spaceIcon.type === "custom" ? (c(), s(f(e.spaceIcon.icon), i({
                  key: 0,
                  class: "space-icon"
                }, e.spaceIcon.attrs), null, 16)) : e.spaceIcon.type === "el" ? (c(), s(o, i({
                  key: 1,
                  class: "space-icon"
                }, e.spaceIcon.attrs), {
                  default: m(() => [
                    (c(), s(f(e.spaceIcon.icon)))
                  ]),
                  _: 1
                }, 16)) : e.spaceIcon.type === "iconfont" ? (c(), l("i", i({
                  key: 2,
                  class: ["space-icon icon iconfont", "icon-" + e.spaceIcon.icon]
                }, e.spaceIcon.attrs), null, 16)) : (c(), l("i", i({
                  key: 3,
                  class: ["space-icon", e.spaceIcon.type]
                }, e.spaceIcon.attrs), r(e.spaceIcon.icon), 17))
              ], 64)) : k("", !0)
            ], 8, H))), 128))
          ])
        ]),
        !e.simpleMode && T.value ? (c(), l("div", {
          key: 0,
          class: S(["back", e.backIconPosition === "right" ? "icon-right" : "icon-left"]),
          onClick: O
        }, [
          e.backIconPosition === "right" ? (c(), l(u, { key: 0 }, [
            g(r(e.i18n ? t.$t(e.backTitle) : e.backTitle), 1)
          ], 64)) : k("", !0),
          e.backBtn.icon || e.backBtn.type ? (c(), l(u, { key: 1 }, [
            e.backBtn.type === "custom" ? (c(), s(f(e.backBtn.icon), N(i({ key: 0 }, e.backBtn.attrs)), null, 16)) : e.backBtn.type === "el" ? (c(), s(o, N(i({ key: 1 }, e.backBtn.attrs)), {
              default: m(() => [
                (c(), s(f(e.backBtn.icon)))
              ]),
              _: 1
            }, 16)) : e.backBtn.type === "iconfont" ? (c(), l("i", i({
              key: 2,
              class: ["icon iconfont", "icon-" + e.backBtn.icon]
            }, e.backBtn.attrs), null, 16)) : (c(), l("i", i({
              key: 3,
              class: e.backBtn.type
            }, e.backBtn.attrs), r(e.backBtn.icon), 17))
          ], 64)) : k("", !0),
          e.backIconPosition === "left" ? (c(), l(u, { key: 2 }, [
            g(r(e.i18n ? t.$t(e.backTitle) : e.backTitle), 1)
          ], 64)) : k("", !0)
        ], 2)) : k("", !0)
      ], 2);
    };
  }
}, K = [J], Q = {
  install(e) {
    K.forEach((h) => {
      e.component("vuePermissionBreadsPlus", h);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Q);
export {
  Q as default
};
