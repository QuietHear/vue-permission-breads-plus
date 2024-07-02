/*
* @Author: aFei
* @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-07-02 10:47:30
*/
<template>
  <div :class="['vue-permission-breads-plus', simpleMode ? 'simple' : '']">
    <!-- 左侧内容 -->
    <div class="left">
      <template v-if="!simpleMode">
        {{ i18n ? $t(positionTitle) : positionTitle }}：
      </template>
      <ul>
        <li v-for="(item, index) in navigate" :key="index" @click="index === navigate.length - 1 || goOne(item)">
          <Icon class="menu-icon" :iconObj="item.icon"
            v-if="!hideMenuIcon && item.icon && (item.icon.icon || item.icon.type)" />
          {{ i18n ? $t(item.title) : item.title }}{{ item.supLabel }}
          <Icon class="space-icon" :iconObj="spaceIcon"
            v-if="index !== navigate.length - 1 && (spaceIcon.icon || spaceIcon.type)" />
        </li>
      </ul>
    </div>
    <!-- 右侧返回区 -->
    <div :class="['back', backIconPosition === 'right' ? 'icon-right' : 'icon-left']" @click="goBack"
      v-if="!simpleMode && showBackBtn">
      <template v-if="backIconPosition === 'right'">
        {{ i18n ? $t(backTitle) : backTitle }}
      </template>
      <Icon :iconObj="backBtn" v-if="backBtn.icon || backBtn.type" />
      <template v-if="backIconPosition === 'left'">
        {{ i18n ? $t(backTitle) : backTitle }}
      </template>
    </div>
  </div>
</template>
<script setup>
import Icon from "./components/icon.vue";
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
    if (item.parents) {
      item.nameList = [];
      let arr = item.parents.split("/");
      arr.forEach(one => {
        const res = searchRoute(one);
        item.nameList.push(standardData(res));
      });
      if (item.replaceIndex !== true) {
        item.nameList.push(standardData(item));
      }
    }
    else if (item.replaceIndex !== true) {
      item.nameList.push(standardData(item));
    }
    if (item.children.length > 0) {
      dealData(item.children);
    }
  });
};
watch(route, () => {
  console.log(route, 'watch route');
  if (routeMsg.length > 0) {
    routeChange();
  }
});
// 路由改变
const routeChange = () => {
  navigate.value = [];
  showBackBtn.value = false;
  const res = searchRoute(route.name);
  console.log(res, 'routeChange');
  if (res) {
    navigate.value = deepCopy(res.nameList);
    navigate.value[navigate.value.length - 1].supLabel = route.query.breadsSupTit || '';
    route.query.diyTitle ? navigate.value[navigate.value.length - 1].title = route.query.diyTitle : null;
    showBackBtn.value = navigate.value[navigate.value.length - 1].showBackBtn || false;
  }
  console.log(navigate.value, 'navigate');
  console.log(showBackBtn.value, "showBackBtn");
};
// 初始化方法
const init = () => {
  console.log(props.menu, 'props.menu');
  routeMsg = deepCopy(props.menu);
  rowData = [];
  if (routeMsg.length > 0) {
    sortData(routeMsg);
    dealData(routeMsg);
    console.log(routeMsg, rowData, 'routeMsg');
    routeChange();
  }
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