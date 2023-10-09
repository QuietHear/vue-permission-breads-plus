/*
 * @Author: aFei
 * @Date: 2023-09-20 13:38:58
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-10-09 14:53:35
*/
<template>
  <div class="demo">
    <el-scrollbar>
      <vue-permission-breads-plus :menu="menu" />
      <div>
        <vue-permission-breads-plus :menu="menu" simpleMode />
      </div>
      <el-button @click="router.push({ name: 'a' })">普通一级菜单</el-button>
      <el-button @click="router.push({ name: 'b' })">一级菜单</el-button>
      <el-button @click="router.push({ name: 'ba' })">特殊二级菜单</el-button>
      <el-button @click="router.push({ name: 'bb' })">二级菜单的详情</el-button>
      <el-button @click="router.push({ name: 'bc' })">二级菜单的详情的详情</el-button>
      <router-view />
    </el-scrollbar>
  </div>
</template>
<script setup>
import vuePermissionBreadsPlus from "~/lib/index.vue";
const router = useRouter();
const menu = ref([
  {
    name: 'a',
    title: '普通一级菜单',
    icon: { type: 'el', icon: 'Apple' }
  },
  {
    name: 'b',
    title: '一级菜单',
    icon: { type: 'el', icon: 'Apple' },
    children: [
      {
        name: 'ba',
        title: '特殊二级菜单',
        icon: { type: 'el', icon: 'Apple' },
        replaceIndex: true
      },
      {
        name: 'bb',
        title: '二级菜单的详情',
        icon: { type: 'el', icon: 'Apple' },
        showBackBtn: true
      },
      {
        name: 'bc',
        title: '二级菜单的详情的详情',
        icon: { type: 'el', icon: 'Apple' },
        showBackBtn: true,
        parents: 'b/bb'
      }
    ]
  }
]);
</script>