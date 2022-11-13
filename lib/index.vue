/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2022-11-13 17:03:49
*/
<template>
  <div class="vue-permission-breads-plus">
    <!-- 左侧内容 -->
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
    <!-- 右侧返回区 -->
    <div class="back" @click="goBack" v-if="showBackBtn">
      <template v-if="backIconPosition === 'left'">
        <el-icon v-if="backBtnArr[0] === 'el'">
          <component :is="backBtnArr[1]" />
        </el-icon>
        <i
          :class="['icon iconfont', 'icon-' + backBtnArr[1]]"
          v-else-if="backBtnArr[0] === 'iconfont'"
        />
        <i :class="backBtnArr[0]" v-else>{{ backBtnArr[1] }}</i>
      </template>
      {{ i18n ? $t(backTitle) : backTitle }}
      <template v-if="backIconPosition === 'right'">
        <el-icon v-if="backBtnArr[0] === 'el'">
          <component :is="backBtnArr[1]" />
        </el-icon>
        <i
          :class="['icon iconfont', 'icon-' + backBtnArr[1]]"
          v-else-if="backBtnArr[0] === 'iconfont'"
        />
        <i :class="backBtnArr[0]" v-else>{{ backBtnArr[1] }}</i>
      </template>
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
    // 返回按钮
    backBtnClass: {
      type: String,
      default: "el/ArrowLeft",
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
        console.log(showBackBtn.value, "showBackBtn");
      });
    };
    routeChange();
    const goBack = () => {
      router.back();
    };
    const goOne = (item) => {
      router.push({ name: item.name });
    };
    // 返回按钮详情
    const backBtnArr = ref(props.backBtnClass.split("/"));
    return {
      showBackBtn,
      navigate,
      goBack,
      goOne,
      backBtnArr,
    };
  },
};
</script>
<style lang="scss">
@use "style/index.scss" as *;
</style>