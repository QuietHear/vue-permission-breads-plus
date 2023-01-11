/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-01-11 18:15:56
*/
import vuePermissionBreadsPlus from "./index.vue";
const arr = [vuePermissionBreadsPlus];
const comment = {
  install(Vue) {
    arr.forEach(item => {
      Vue.component('vuePermissionBreadsPlus', item);
    })
  },
};
// 注入script方式vue中
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出为全量
export default comment;