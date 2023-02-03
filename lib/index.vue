/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-02-03 17:13:14
*/
<template>
  <div :class="['vue-permission-breads-plus', simpleMode ? 'simple' : '']">
    <!-- 左侧内容 -->
    <div class="left">
      <template v-if="!simpleMode">
        {{ i18n? $t(positionTitle): positionTitle }}：
      </template>
      <ul>
        <li v-for="(item, index) in navigate" :key="index" @click="index === navigate.length - 1 || goOne(item)">
          <template v-if="!hideMenuIcon && item.icon && (item.icon.icon || item.icon.type)">
            <component class="menu-icon" :is="item.icon.icon" v-bind="item.icon.attrs"
              v-if="item.icon.type === 'custom'" />
            <el-icon class="menu-icon" v-bind="item.icon.attrs" v-else-if="item.icon.type === 'el'">
              <component :is="item.icon.icon" />
            </el-icon>
            <i :class="['menu-icon icon iconfont', 'icon-' + item.icon.icon]" v-bind="item.icon.attrs"
              v-else-if="item.icon.type === 'iconfont'" />
            <i :class="['menu-icon', item.icon.type]" v-bind="item.icon.attrs" v-else>{{ item.icon.icon }}</i>
          </template>
          {{ i18n? $t(item.title) : item.title }}
          <template v-if="index !== navigate.length - 1 && (spaceIcon.icon || spaceIcon.type)">
            <component class="space-icon" :is="spaceIcon.icon" v-bind="spaceIcon.attrs"
              v-if="spaceIcon.type === 'custom'" />
            <el-icon class="space-icon" v-bind="spaceIcon.attrs" v-else-if="spaceIcon.type === 'el'">
              <component :is="spaceIcon.icon" />
            </el-icon>
            <i :class="['space-icon icon iconfont', 'icon-' + spaceIcon.icon]" v-bind="spaceIcon.attrs"
              v-else-if="spaceIcon.type === 'iconfont'" />
            <i :class="['space-icon', spaceIcon.type]" v-bind="spaceIcon.attrs" v-else>{{ spaceIcon.icon }}</i>
          </template>
        </li>
      </ul>
    </div>
    <!-- 右侧返回区 -->
    <div :class="['back', backIconPosition === 'right' ? 'icon-right' : 'icon-left']" @click="goBack"
      v-if="!simpleMode && showBackBtn">
      <template v-if="backIconPosition === 'right'">
        {{ i18n? $t(backTitle): backTitle }}
      </template>
      <template v-if="backBtn.icon || backBtn.type">
        <component :is="backBtn.icon" v-bind="backBtn.attrs" v-if="backBtn.type === 'custom'" />
        <el-icon v-bind="backBtn.attrs" v-else-if="backBtn.type === 'el'">
          <component :is="backBtn.icon" />
        </el-icon>
        <i :class="['icon iconfont', 'icon-' + backBtn.icon]" v-bind="backBtn.attrs"
          v-else-if="backBtn.type === 'iconfont'" />
        <i :class="backBtn.type" v-bind="backBtn.attrs" v-else>{{ backBtn.icon }}</i>
      </template>
      <template v-if="backIconPosition === 'left'">
        {{ i18n? $t(backTitle): backTitle }}
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const props = defineProps({
  // 菜单集合数据
  menu: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // 隐藏菜单图标
  hideMenuIcon: {
    type: Boolean,
    default: false,
  },
  // 间隔图标
  spaceIcon: {
    type: Object,
    default: () => {
      return {
        icon: "＜"
      };
    },
  },
  // 是否开启国际化
  i18n: {
    type: Boolean,
    default: false,
  },
  // 简易模式
  simpleMode: {
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
  backBtn: {
    type: Object,
    default: () => {
      return {};
    },
  }
});
const router = useRouter();
const route = useRoute();
// 显示返回按钮
const showBackBtn = ref(false);
// 展示的列表
const navigate = ref([]);
// 展开数据
let rowData = [];
// 树形数据
let routeMsg = [];
// 深拷贝
const deepCopy = (obj) => {
  let result = obj instanceof Array ? [] : {};
  for (let key in obj) {
    result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
  }
  return result;
};
// 标准数据格式化
const standardData = (obj) => {
  return {
    name: obj.name,
    title: obj.title,
    icon: obj.icon,
    replaceIndex: obj.replaceIndex || false,
    showBackBtn: obj.showBackBtn || false
  };
};
watch(
  () => props.menu,
  () => {
    init();
  }
);
// 找到当前路径
const searchRoute = (name) => {
  return rowData.filter(item => {
    return item.name === name;
  })[0];
};
// 格式化数据
const sortData = (list, parent) => {
  list.forEach((item) => {
    let routeArr = [];
    if (parent) {
      routeArr = [...parent.nameList];
      routeArr.push(standardData(parent));
    }
    item.nameList = routeArr;
    if (item.children && item.children.length > 0) {
      sortData(item.children, item);
    } else {
      item.children = [];
    }
    rowData.push(item);
  });
};
// 处理数据最终路径
const dealData = (list) => {
  list.forEach((item) => {
    if (item.replaceIndex !== true) {
      if (item.parents) {
        let arr = item.parents.split("/");
        arr.forEach((one, oneIndex) => {
          const res = searchRoute(one);
          if (res.replaceIndex !== true) {
            item.nameList.push(standardData(res));
          }
          if (oneIndex + 1 === arr.length) {
            item.nameList.push(standardData(item));
          }
        });
      } else {
        item.nameList.push(standardData(item));
      }
    }
    if (item.children.length > 0) {
      dealData(item.children);
    }
  });
};
watch(route, () => {
  console.log(route, 'watch route');
  routeChange();
});
// 路由改变
const routeChange = () => {
  const res = searchRoute(route.name);
  console.log(res, 'routeChange');
  navigate.value = [...res.nameList];
  showBackBtn.value = navigate.value[navigate.value.length - 1].showBackBtn || false;
  console.log(navigate.value, 'navigate');
  console.log(showBackBtn.value, "showBackBtn");
};
// 初始化方法
const init = () => {
  console.log(props.menu, 'props.menu');
  routeMsg = deepCopy(props.menu);
  rowData = [];
  sortData(routeMsg);
  dealData(routeMsg);
  console.log(routeMsg, rowData, 'routeMsg');
  routeChange();
};
init();
const goBack = () => {
  router.back();
};
const goOne = (item) => {
  router.push({ name: item.name });
};
</script>
<style lang="scss">
@use "style/index.scss" as *;
</style>