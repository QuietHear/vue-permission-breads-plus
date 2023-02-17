# 面包屑组件（vue3版）
***vue3版本*** | [**vue2版本**](https://github.com/QuietHear/vue-permission-breads '右键新窗口浏览')


## 安装
	npm i vue-permission-breads-plus
	// 需要安装前置依赖组件，已安装请忽略
	npm i vue-router
	// 开启国际化需要安装组件，已安装请忽略
	npm i vue-i18n

## 使用
	import vuePermissionBreadsPlus from "vue-permission-breads-plus";
	import "vue-permission-breads-plus/index.css";
	
	app.use(vuePermissionBreadsPlus);


## 0. 可改动样式变量
* `--permis-bread-height`：50px;-->面包屑高度

* `--permis-bread-bg`：#fff(黑夜模式:rgb(24, 24, 28));-->面包屑背景色

* `--permis-bread-position-color`：#000(黑夜模式:rgba(255, 255, 255, 0.82));-->我的位置字体颜色

* `--permis-bread-color`：#8998a6;-->不可点击的路由颜色

* `--permis-bread-active-color`：#000;-->可点击的路由颜色

* `--permis-bread-back-color`：#000(黑夜模式:rgba(255, 255, 255, 0.82));-->返回字体颜色


## 1. 参数
* `menu`：要显示的菜单数据-->Array;非必传;默认*[]*
>
	// 配置项说明
	{
		"name":'' // 菜单唯一值，对应路由的name
		"title":'' // 菜单名
		"icon":{  // 菜单图标
			"attrs":{},
			"type":'',
			"icon":''
		}
		//
		// attrs的值会v-bind到对应dom上
		// type的值，有以下四种情况：
		// custom，此时为自定义组件,icon为组件名（！！！未内置，确保当前页面或全局已引入）
		// el，此时为el-icon,icon为图标组件名（！！！未内置，确保当前页面或全局已引入）
		// iconfont，此时为iconfont，icon为图标去掉icon-后部分（！！！未内置，确保当前页面或全局已引入）
		// 其他，此时为本地自定义图标，type为class，icon为内容
		//
		"replaceIndex":false // 隐藏当前路由的名字，只会展示父级
		"showBackBtn":true // 是否展示返回按钮，只有设置为true才展示
		"parents":'第一个父级/第二个父级/xxx' // 将平级菜单转换为父子级，父级链用/分隔
		"children":[] // 子菜单
	}
>

* `hideMenuIcon`：隐藏菜单图标-->Boolean;非必传;默认*false*

* `spaceIcon`：间隔图标-->Object;非必传;默认*{icon:'＜'}*
>
	attrs的值会v-bind到对应dom上
	type的值，有以下四种情况
	// custom，此时为自定义组件,icon为组件名（！！！未内置，确保当前页面或全局已引入）
	// el，此时为el-icon,icon为图标组件名（！！！未内置，确保当前页面或全局已引入）
	// iconfont，此时为iconfont，icon为图标去掉icon-后部分（！！！未内置，确保当前页面或全局已引入）
	// 其他，此时为本地自定义图标，type为class，icon为内容
>

* `i18n`：标题是否开启国际化-->Boolean;非必传;默认*false*

* `simpleMode`：简易模式，此时为行内块元素且只保留面包屑主内容-->Boolean;非必传;默认*false*

* `positionTitle`：我的位置文字-->String;非必传;默认*我的位置*

* `backTitle`：返回文字-->String;非必传;默认*返回*

* `backIconPosition`：返回图标的位置-->String;非必传;默认*left*
>
	只能为left/right
>

* `backBtn`：返回图标-->Object;非必传;默认*{}*
>
	attrs的值会v-bind到对应dom上
	type的值，有以下四种情况
	// custom，此时为自定义组件,icon为组件名（！！！未内置，确保当前页面或全局已引入）
	// el，此时为el-icon,icon为图标组件名（！！！未内置，确保当前页面或全局已引入）
	// iconfont，此时为iconfont，icon为图标去掉icon-后部分（！！！未内置，确保当前页面或全局已引入）
	// 其他，此时为本地自定义图标，type为class，icon为内容
>


## 更多vue3组件
[**自定义右键菜单**](https://github.com/QuietHear/vue-diy-rightmenu-plus '右键新窗口浏览') | [**可拖拽菜单**](https://github.com/QuietHear/vue-drag-menu-plus '右键新窗口浏览') | [**echarts组件**](https://github.com/QuietHear/vue-echarts-block-plus '右键新窗口浏览') | [**基于el-menu的菜单组件**](https://github.com/QuietHear/vue-ele-nav-plus '右键新窗口浏览') | ***面包屑组件*** | [**滑动拼图**](https://github.com/QuietHear/vue-puzzle-slider-plus '右键新窗口浏览') | [**工作日历**](https://github.com/QuietHear/vue-shop-calendar-plus '右键新窗口浏览') | [**多页签组件**](https://github.com/QuietHear/vue-tabs-plus '右键新窗口浏览') | [**wangEditor**](https://github.com/QuietHear/vue-wangEditor-block-plus '右键新窗口浏览')