import { ref as B, watch as P, resolveComponent as D, openBlock as t, createElementBlock as l, createElementVNode as E, createTextVNode as A, toDisplayString as h, Fragment as S, renderList as R, createCommentVNode as g, createBlock as y, withCtx as T, resolveDynamicComponent as p, normalizeClass as v } from "vue";
import { useRouter as z, useRoute as F } from "vue-router";
const M = (r, s) => {
  const a = r.__vccOpts || r;
  for (const [n, _] of s)
    a[n] = _;
  return a;
}, j = {
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
  setup(r, { attrs: s, slots: a, emit: n, expose: _ }) {
    const b = z(), d = F(), u = B(!1), f = B([]);
    let k = B([]);
    P(
      () => r.menu,
      () => {
        J();
      }
    );
    const m = (c, e) => new Promise((i) => {
      c.forEach((o) => {
        o.name === e ? i(o) : o.children.length > 0 && m(o.children, e).then((w) => {
          i(w);
        });
      });
    }), C = (c, e) => {
      let i = [];
      e && (i = [...e.nameList], i.push(e)), c.forEach((o) => {
        o.nameList = i, o.children && o.children.length > 0 ? C(o.children, JSON.parse(JSON.stringify(o))) : o.children = [];
      });
    }, N = (c) => (c = JSON.parse(JSON.stringify(c)), c.forEach((e) => {
      if (e.replaceIndex !== !0)
        if (e.parents) {
          let i = e.parents.split("/");
          i.forEach((o, w) => {
            m(JSON.parse(JSON.stringify(k.value)), o).then(
              (L) => {
                L.replaceIndex !== !0 && e.nameList.push(L), w + 1 === i.length && e.nameList.push(e);
              }
            );
          });
        } else
          e.nameList.push(e);
      e.children.length > 0 && (e.children = [...N(e.children)]);
    }), c);
    P(d, () => {
      O();
    });
    const O = () => {
      m(k.value, d.name).then((c) => {
        f.value = c.nameList, u.value = f.value[f.value.length - 1].showBackBtn || !1;
      });
    }, J = () => {
      k.value = JSON.parse(JSON.stringify(r.menu)), C(k.value), k.value = [...N(k.value)], O();
    };
    J();
    const x = () => {
      b.back();
    }, I = (c) => {
      b.push({ name: c.name });
    }, V = B(r.backBtnClass.split("/"));
    return {
      showBackBtn: u,
      navigate: f,
      goBack: x,
      goOne: I,
      backBtnArr: V
    };
  }
}, q = { class: "vue-permission-breads-plus" }, G = { class: "left" }, H = ["onClick"], K = { key: 0 };
function Q(r, s, a, n, _, b) {
  const d = D("el-icon");
  return t(), l("div", q, [
    E("div", G, [
      A(h(a.i18n ? r.$t(a.positionTitle) : a.positionTitle) + "\uFF1A ", 1),
      E("ul", null, [
        (t(!0), l(S, null, R(n.navigate, (u, f) => (t(), l("li", {
          key: f,
          onClick: (k) => f === n.navigate.length - 1 || n.goOne(u)
        }, [
          A(h(a.i18n ? r.$t(u.title) : u.title) + " ", 1),
          f !== n.navigate.length - 1 ? (t(), l("span", K, ">")) : g("", !0)
        ], 8, H))), 128))
      ])
    ]),
    n.showBackBtn ? (t(), l("div", {
      key: 0,
      class: "back",
      onClick: s[0] || (s[0] = (...u) => n.goBack && n.goBack(...u))
    }, [
      a.backIconPosition === "left" ? (t(), l(S, { key: 0 }, [
        n.backBtnArr[0] === "el" ? (t(), y(d, { key: 0 }, {
          default: T(() => [
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
      A(" " + h(a.i18n ? r.$t(a.backTitle) : a.backTitle) + " ", 1),
      a.backIconPosition === "right" ? (t(), l(S, { key: 1 }, [
        n.backBtnArr[0] === "el" ? (t(), y(d, { key: 0 }, {
          default: T(() => [
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
const U = /* @__PURE__ */ M(j, [["render", Q]]), W = [U], X = {
  install(r) {
    W.forEach((s) => {
      r.component(s.name, s);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(X);
export {
  X as default
};
