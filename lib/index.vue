/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2022-11-13 16:28:34
*/
<template>
  <div class="vue-permission-breads-plus">
    <div class="left">
      {{ i18n ? $t(positionTitle) : positionTitle }}：
      <ul>
        <li
          v-for="(item, index) in navigate"
          :key="index"
          @click="index === navigate.length - 1 || goOne(item)"
        >
          {{ i18n ? $t(item.title) : item.title }}
          <span v-if="index !== navigate.length - 1">&gt;</span>
        </li>
      </ul>
    </div>
    <div class="back" @click="goBack" v-if="showBackBtn">
      <el-icon v-if="backIconPosition === 'left'"><ArrowLeft /></el-icon>
      {{ i18n ? $t(backTitle) : backTitle }}
      <el-icon v-if="backIconPosition === 'right'"><ArrowLeft /></el-icon>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "vuePermissionBreadsPlus",
  props: {
    // 菜单集合数据
    menu: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否开启国际化
    i18n: {
      type: Boolean,
      default: false,
    },
    // 我的位置文字
    positionTitle: {
      type: String,
      default: "我的位置",
    },
    // 返回文字
    backTitle: {
      type: String,
      default: "返回",
    },
    // 返回图标的位置
    backIconPosition: {
      type: String,
      default: "left",
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const router = useRouter();
    const route = useRoute();
    // 显示返回按钮
    const showBackBtn = ref(false);
    // 展示的列表
    const navigate = ref([]);
    let routeMsg = ref(JSON.parse(JSON.stringify(props.menu)));
    // 找到当前路径
    const searchRoute = (list, name) => {
      return new Promise((resolve) => {
        list.forEach((item) => {
          if (item.name === name) {
            resolve(item);
          } else if (item.children.length > 0) {
            searchRoute(item.children, name).then((res) => {
              resolve(res);
            });
          }
        });
      });
    };
    // 格式化数据
    const sortData = (list, parent) => {
      let arr = [];
      if (parent) {
        arr = [...parent.nameList];
        arr.push(parent);
      }
      list.forEach((item) => {
        item.nameList = arr;
        if (item.children && item.children.length > 0) {
          sortData(item.children, JSON.parse(JSON.stringify(item)));
        } else {
          item.children = [];
        }
      });
    };
    sortData(routeMsg.value);
    // 处理数据最终路径
    const dealData = (list) => {
      list = JSON.parse(JSON.stringify(list));
      list.forEach((item) => {
        if (item.replaceIndex !== true) {
          if (item.parents) {
            let arr = item.parents.split("/");
            arr.forEach((one, oneIndex) => {
              searchRoute(JSON.parse(JSON.stringify(routeMsg.value)), one).then(
                (res) => {
                  if (res.replaceIndex !== true) {
                    item.nameList.push(res);
                  }
                  if (oneIndex + 1 === arr.length) {
                    item.nameList.push(item);
                  }
                }
              );
            });
          } else {
            item.nameList.push(item);
          }
        }
        if (item.children.length > 0) {
          item.children = [...dealData(item.children)];
        }
      });
      return list;
    };
    routeMsg.value = [...dealData(routeMsg.value)];
    watch(route, () => {
      routeChange();
    });
    // 路由改变
    const routeChange = () => {
      searchRoute(routeMsg.value, route.name).then((res) => {
        navigate.value = res.nameList;
        showBackBtn.value =
          navigate.value[navigate.value.length - 1].showBackBtn || false;
      });
    };
    routeChange();
    const goBack = () => {
      router.back();
    };
    const goOne = (item) => {
      router.push({ name: item.name });
    };
    return {
      showBackBtn,
      navigate,
      goBack,
      goOne,
    };
  },
};
</script>
<style lang="scss">
@use "style/index.scss" as *;
</style>