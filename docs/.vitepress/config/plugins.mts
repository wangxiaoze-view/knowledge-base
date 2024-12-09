//// 这是一个自动创建侧边栏的插件
// import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

// export default [
// 	AutoSidebar({
// 		ignoreList: ["README.md"], // 忽略文件夹
// 		path: "docs", // 侧边栏扫描路径(也就是所有笔记所在的目录)
// 		ignoreIndexItem: true, // 忽略首页
// 		// collapsed: false, // 是否启用折叠，默认为false展开
// 		deletePrefix: "docs", // 删除路径前缀
// 		sideBarResolved(data) {
// 			// 接收完整的侧边栏对象以进行自定义修改
// 			return data;
// 		},
// 		sideBarItemsResolved(data) {
// 			// 接收完整的侧边栏 subItem 对象以进行自定义修改
// 			data.forEach(item => {
// 				item.text = item?.text?.replace(/^\d+_/, "");
// 			});
// 			return data;
// 		},
// 		beforeCreateSideBarItems(data) {
// 			// 获取生成侧边栏子项之前扫描的文件名列表。如果要对侧边栏数据进行排序，建议使用

// 			return data;
// 		},
// 		titleFromFile: false, // 从文件中提取标题
// 		// You can also set options to adjust sidebar data
// 		// see option document below
// 	}),
// ];
