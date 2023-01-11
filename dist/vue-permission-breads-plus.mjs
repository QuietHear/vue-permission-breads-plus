import { ref as d, watch as L, resolveComponent as _, openBlock as l, createElementBlock as c, createElementVNode as E, createTextVNode as B, toDisplayString as h, Fragment as m, renderList as x, createCommentVNode as v, createBlock as k, withCtx as T, resolveDynamicComponent as P, normalizeClass as y } from "vue";
import { useRouter as D, useRoute as $ } from "vue-router";
const A = { class: "vue-permission-breads-plus" }, R = { class: "left" }, z = ["onClick"], F = { key: 0 }, M = {
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
  setup(a) {
    const f = a, w = D(), S = $(), b = d(!1), r = d([]);
    let u = d([]);
    L(
      () => f.menu,
      () => {
        J();
      }
    );
    const g = (t, e) => new Promise((s) => {
      t.forEach((n) => {
        n.name === e ? s(n) : n.children.length > 0 && g(n.children, e).then((i) => {
          s(i);
        });
      });
    }), C = (t, e) => {
      let s = [];
      e && (s = [...e.nameList], s.push(e)), t.forEach((n) => {
        n.nameList = s, n.children && n.children.length > 0 ? C(n.children, JSON.parse(JSON.stringify(n))) : n.children = [];
      });
    }, N = (t) => (t = JSON.parse(JSON.stringify(t)), t.forEach((e) => {
      if (e.replaceIndex !== !0)
        if (e.parents) {
          let s = e.parents.split("/");
          s.forEach((n, i) => {
            g(JSON.parse(JSON.stringify(u.value)), n).then(
              (p) => {
                p.replaceIndex !== !0 && e.nameList.push(p), i + 1 === s.length && e.nameList.push(e);
              }
            );
          });
        } else
          e.nameList.push(e);
      e.children.length > 0 && (e.children = [...N(e.children)]);
    }), t);
    L(S, () => {
      O();
    });
    const O = () => {
      g(u.value, S.name).then((t) => {
        r.value = t.nameList, b.value = r.value[r.value.length - 1].showBackBtn || !1;
      });
    }, J = () => {
      u.value = JSON.parse(JSON.stringify(f.menu)), C(u.value), u.value = [...N(u.value)], O();
    };
    J();
    const I = () => {
      w.back();
    }, V = (t) => {
      w.push({ name: t.name });
    }, o = d(f.backBtnClass.split("/"));
    return (t, e) => {
      const s = _("el-icon");
      return l(), c("div", A, [
        E("div", R, [
          B(h(a.i18n ? t.$t(a.positionTitle) : a.positionTitle) + "\uFF1A ", 1),
          E("ul", null, [
            (l(!0), c(m, null, x(r.value, (n, i) => (l(), c("li", {
              key: i,
              onClick: (p) => i === r.value.length - 1 || V(n)
            }, [
              B(h(a.i18n ? t.$t(n.title) : n.title) + " ", 1),
              i !== r.value.length - 1 ? (l(), c("span", F, ">")) : v("", !0)
            ], 8, z))), 128))
          ])
        ]),
        b.value ? (l(), c("div", {
          key: 0,
          class: "back",
          onClick: I
        }, [
          a.backIconPosition === "left" ? (l(), c(m, { key: 0 }, [
            o.value[0] === "el" ? (l(), k(s, { key: 0 }, {
              default: T(() => [
                (l(), k(P(o.value[1])))
              ]),
              _: 1
            })) : o.value[0] === "iconfont" ? (l(), c("i", {
              key: 1,
              class: y(["icon iconfont", "icon-" + o.value[1]])
            }, null, 2)) : (l(), c("i", {
              key: 2,
              class: y(o.value[0])
            }, h(o.value[1]), 3))
          ], 64)) : v("", !0),
          B(" " + h(a.i18n ? t.$t(a.backTitle) : a.backTitle) + " ", 1),
          a.backIconPosition === "right" ? (l(), c(m, { key: 1 }, [
            o.value[0] === "el" ? (l(), k(s, { key: 0 }, {
              default: T(() => [
                (l(), k(P(o.value[1])))
              ]),
              _: 1
            })) : o.value[0] === "iconfont" ? (l(), c("i", {
              key: 1,
              class: y(["icon iconfont", "icon-" + o.value[1]])
            }, null, 2)) : (l(), c("i", {
              key: 2,
              class: y(o.value[0])
            }, h(o.value[1]), 3))
          ], 64)) : v("", !0)
        ])) : v("", !0)
      ]);
    };
  }
}, j = [M], q = {
  install(a) {
    j.forEach((f) => {
      a.component("vuePermissionBreadsPlus", f);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(q);
export {
  q as default
};
