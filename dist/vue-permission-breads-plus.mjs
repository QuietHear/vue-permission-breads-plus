import { inject as x, ref as h, watch as V, resolveComponent as R, openBlock as l, createElementBlock as s, createElementVNode as _, createTextVNode as g, toDisplayString as f, Fragment as w, renderList as T, createCommentVNode as v, createBlock as p, withCtx as D, resolveDynamicComponent as L, normalizeClass as k } from "vue";
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
var J;
(function(e) {
  e.pop = "pop", e.push = "push";
})(J || (J = {}));
var P;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(P || (P = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var I;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(I || (I = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const K = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), j = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function z() {
  return x(K);
}
function M() {
  return x(j);
}
const q = { class: "vue-permission-breads-plus" }, G = { class: "left" }, H = ["onClick"], Q = { key: 0 }, U = {
  __name: "index",
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
  setup(e) {
    const d = e, m = z(), E = M(), S = h(!1), u = h([]);
    let i = h([]);
    V(
      () => d.menu,
      () => {
        C();
      }
    );
    const y = (o, n) => new Promise((c) => {
      o.forEach((t) => {
        t.name === n ? c(t) : t.children.length > 0 && y(t.children, n).then((r) => {
          c(r);
        });
      });
    }), N = (o, n) => {
      let c = [];
      n && (c = [...n.nameList], c.push(n)), o.forEach((t) => {
        t.nameList = c, t.children && t.children.length > 0 ? N(t.children, JSON.parse(JSON.stringify(t))) : t.children = [];
      });
    }, B = (o) => (o = JSON.parse(JSON.stringify(o)), o.forEach((n) => {
      if (n.replaceIndex !== !0)
        if (n.parents) {
          let c = n.parents.split("/");
          c.forEach((t, r) => {
            y(JSON.parse(JSON.stringify(i.value)), t).then(
              (b) => {
                b.replaceIndex !== !0 && n.nameList.push(b), r + 1 === c.length && n.nameList.push(n);
              }
            );
          });
        } else
          n.nameList.push(n);
      n.children.length > 0 && (n.children = [...B(n.children)]);
    }), o);
    V(E, () => {
      O();
    });
    const O = () => {
      y(i.value, E.name).then((o) => {
        u.value = o.nameList, S.value = u.value[u.value.length - 1].showBackBtn || !1;
      });
    }, C = () => {
      i.value = JSON.parse(JSON.stringify(d.menu)), N(i.value), i.value = [...B(i.value)], O();
    };
    C();
    const $ = () => {
      m.back();
    }, A = (o) => {
      m.push({ name: o.name });
    }, a = h(d.backBtnClass.split("/"));
    return (o, n) => {
      const c = R("el-icon");
      return l(), s("div", q, [
        _("div", G, [
          g(f(e.i18n ? o.$t(e.positionTitle) : e.positionTitle) + "\uFF1A ", 1),
          _("ul", null, [
            (l(!0), s(w, null, T(u.value, (t, r) => (l(), s("li", {
              key: r,
              onClick: (b) => r === u.value.length - 1 || A(t)
            }, [
              g(f(e.i18n ? o.$t(t.title) : t.title) + " ", 1),
              r !== u.value.length - 1 ? (l(), s("span", Q, ">")) : v("", !0)
            ], 8, H))), 128))
          ])
        ]),
        S.value ? (l(), s("div", {
          key: 0,
          class: "back",
          onClick: $
        }, [
          e.backIconPosition === "left" ? (l(), s(w, { key: 0 }, [
            a.value[0] === "el" ? (l(), p(c, { key: 0 }, {
              default: D(() => [
                (l(), p(L(a.value[1])))
              ]),
              _: 1
            })) : a.value[0] === "iconfont" ? (l(), s("i", {
              key: 1,
              class: k(["icon iconfont", "icon-" + a.value[1]])
            }, null, 2)) : (l(), s("i", {
              key: 2,
              class: k(a.value[0])
            }, f(a.value[1]), 3))
          ], 64)) : v("", !0),
          g(" " + f(e.i18n ? o.$t(e.backTitle) : e.backTitle) + " ", 1),
          e.backIconPosition === "right" ? (l(), s(w, { key: 1 }, [
            a.value[0] === "el" ? (l(), p(c, { key: 0 }, {
              default: D(() => [
                (l(), p(L(a.value[1])))
              ]),
              _: 1
            })) : a.value[0] === "iconfont" ? (l(), s("i", {
              key: 1,
              class: k(["icon iconfont", "icon-" + a.value[1]])
            }, null, 2)) : (l(), s("i", {
              key: 2,
              class: k(a.value[0])
            }, f(a.value[1]), 3))
          ], 64)) : v("", !0)
        ])) : v("", !0)
      ]);
    };
  }
}, W = [U], X = {
  install(e) {
    W.forEach((d) => {
      e.component("vuePermissionBreadsPlus", d);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(X);
export {
  X as default
};
