import { ref as B, watch as I, resolveComponent as V, openBlock as t, createElementBlock as l, createElementVNode as L, createTextVNode as A, toDisplayString as h, Fragment as S, renderList as D, createCommentVNode as g, createBlock as y, withCtx as P, resolveDynamicComponent as p, normalizeClass as v } from "vue";
import { useRouter as R, useRoute as z } from "vue-router";
const F = (c, i) => {
  const a = c.__vccOpts || c;
  for (const [n, _] of i)
    a[n] = _;
  return a;
}, M = {
  name: "vuePermissionBreadsPlus",
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    i18n: {
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
    backBtnClass: {
      type: String,
      default: "el/ArrowLeft"
    }
  },
  setup(c, { attrs: i, slots: a, emit: n, expose: _ }) {
    const b = R(), d = z(), u = B(!1), f = B([]);
    let k = B(JSON.parse(JSON.stringify(c.menu)));
    const m = (r, e) => new Promise((s) => {
      r.forEach((o) => {
        o.name === e ? s(o) : o.children.length > 0 && m(o.children, e).then((w) => {
          s(w);
        });
      });
    }), C = (r, e) => {
      let s = [];
      e && (s = [...e.nameList], s.push(e)), r.forEach((o) => {
        o.nameList = s, o.children && o.children.length > 0 ? C(o.children, JSON.parse(JSON.stringify(o))) : o.children = [];
      });
    };
    C(k.value);
    const N = (r) => (r = JSON.parse(JSON.stringify(r)), r.forEach((e) => {
      if (e.replaceIndex !== !0)
        if (e.parents) {
          let s = e.parents.split("/");
          s.forEach((o, w) => {
            m(JSON.parse(JSON.stringify(k.value)), o).then(
              (J) => {
                J.replaceIndex !== !0 && e.nameList.push(J), w + 1 === s.length && e.nameList.push(e);
              }
            );
          });
        } else
          e.nameList.push(e);
      e.children.length > 0 && (e.children = [...N(e.children)]);
    }), r);
    k.value = [...N(k.value)], I(d, () => {
      O();
    });
    const O = () => {
      m(k.value, d.name).then((r) => {
        f.value = r.nameList, u.value = f.value[f.value.length - 1].showBackBtn || !1;
      });
    };
    O();
    const E = () => {
      b.back();
    }, T = (r) => {
      b.push({ name: r.name });
    }, x = B(c.backBtnClass.split("/"));
    return {
      showBackBtn: u,
      navigate: f,
      goBack: E,
      goOne: T,
      backBtnArr: x
    };
  }
}, j = { class: "vue-permission-breads-plus" }, q = { class: "left" }, G = ["onClick"], H = { key: 0 };
function K(c, i, a, n, _, b) {
  const d = V("el-icon");
  return t(), l("div", j, [
    L("div", q, [
      A(h(a.i18n ? c.$t(a.positionTitle) : a.positionTitle) + "\uFF1A ", 1),
      L("ul", null, [
        (t(!0), l(S, null, D(n.navigate, (u, f) => (t(), l("li", {
          key: f,
          onClick: (k) => f === n.navigate.length - 1 || n.goOne(u)
        }, [
          A(h(a.i18n ? c.$t(u.title) : u.title) + " ", 1),
          f !== n.navigate.length - 1 ? (t(), l("span", H, ">")) : g("", !0)
        ], 8, G))), 128))
      ])
    ]),
    n.showBackBtn ? (t(), l("div", {
      key: 0,
      class: "back",
      onClick: i[0] || (i[0] = (...u) => n.goBack && n.goBack(...u))
    }, [
      a.backIconPosition === "left" ? (t(), l(S, { key: 0 }, [
        n.backBtnArr[0] === "el" ? (t(), y(d, { key: 0 }, {
          default: P(() => [
            (t(), y(p(n.backBtnArr[1])))
          ]),
          _: 1
        })) : n.backBtnArr[0] === "iconfont" ? (t(), l("i", {
          key: 1,
          class: v(["icon iconfont", "icon-" + n.backBtnArr[1]])
        }, null, 2)) : (t(), l("i", {
          key: 2,
          class: v(n.backBtnArr[0])
        }, h(n.backBtnArr[1]), 3))
      ], 64)) : g("", !0),
      A(" " + h(a.i18n ? c.$t(a.backTitle) : a.backTitle) + " ", 1),
      a.backIconPosition === "right" ? (t(), l(S, { key: 1 }, [
        n.backBtnArr[0] === "el" ? (t(), y(d, { key: 0 }, {
          default: P(() => [
            (t(), y(p(n.backBtnArr[1])))
          ]),
          _: 1
        })) : n.backBtnArr[0] === "iconfont" ? (t(), l("i", {
          key: 1,
          class: v(["icon iconfont", "icon-" + n.backBtnArr[1]])
        }, null, 2)) : (t(), l("i", {
          key: 2,
          class: v(n.backBtnArr[0])
        }, h(n.backBtnArr[1]), 3))
      ], 64)) : g("", !0)
    ])) : g("", !0)
  ]);
}
const Q = /* @__PURE__ */ F(M, [["render", K]]), U = [Q], W = {
  install(c) {
    U.forEach((i) => {
      c.component(i.name, i);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(W);
export {
  W as default
};
