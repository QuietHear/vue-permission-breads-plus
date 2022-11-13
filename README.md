# 面包屑组件（vue3版）
***vue3版本*** | [**vue2版本**](https://github.com/QuietHear/vue-permission-breads '浏览')

## 安装
	npm i vue-permission-breads-plus

## 0. 可改动样式变量
* `--permis-bread-height`：33px;-->面包屑高度

* `--permis-bread-bg`：#fff;-->面包屑背景色

* `--permis-bread-position-color`：#000;-->我的位置字体颜色

* `--permis-bread-color`：#8998a6;-->不可点击的路由颜色

* `--permis-bread-active-color`：var(--el-color-primary);-->可点击的路由颜色

* `--permis-bread-back-color`：#000;-->返回字体颜色

## 1. 参数
* `menu`：要显示的菜单数据-->Array;非必传;默认*[]*
>
	// 字段说明
	{
		// 菜单唯一值，对应路由的name
		"name":'',
		// 菜单名
		"title":'',
		// 隐藏当前路由的名字，只会展示父级
		"replaceIndex":false,
		// 是否展示返回按钮，只有设置为true才展示
		"showBackBtn":true,
		// 将平级菜单转换为父子级，父级链用/分隔
		"parents":'第一个父级/第二个父级/xxx',
		// 子菜单
		"children":[]
	}
>

* `i18n`：标题是否开启国际化-->Boolean;非必传;默认*false*

* `positionTitle`：我的位置文字-->String;非必传;默认*我的位置*

* `backTitle`：返回文字-->String;非必传;默认*返回*

* `backIconPosition`：返回图标的位置-->String;非必传;默认*left*
>
	只能为left/right
>