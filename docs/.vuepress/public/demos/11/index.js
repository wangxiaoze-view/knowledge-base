let myChart;

function renderOptionData(data = []) {
	return data
		.map(i => {
			if (!i.name) return "";
			return `<option value="${i.code}">${i.name}</option>`;
		})
		.join("");
}

function request(url, callback) {
	const http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.send();
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			callback(JSON.parse(http.response));
		}
	};
}

function getEchartsOptions() {
	return {
		geo: {
			map: this.name, //引入地图数据
			label: {
				normal: {
					show: true,
					fontSize: "10",
					color: "rgba(0,0,0,0.7)",
				},
			},
			// aspectScale: 0.8, //长宽比，0.,8的含义为宽是高的0.8
			// zoom: 1, //默认地图比例大小为1，根据需要可以改变地图的原始大小
			// roam: true, //是否开启鼠标缩放和平移漫游，如何zoom打印1的话建议开启
			itemStyle: {
				normal: {
					borderColor: "rgba(0, 0, 0, 0.2)",
				},
				emphasis: {
					//高亮的显示设置
					areaColor: "skyblue", //鼠标选择区域颜色
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowBlur: 20,
					borderWidth: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)",
				},
			},
		},
		title: {
			text: "测试地图",
			subtext: "副标题",
			sublink: "https://www.wangxiaoze.wang",
		},
		tooltip: {
			trigger: "item",
			formatter: function (params) {
				return params.name + "：" + params.value;
			},
		},
		series: [
			{
				type: "map",
				map: this.name,
				label: {
					show: true,
				},
				itemStyle: {
					normal: {
						borderColor: "rgba(0, 0, 0, 0.2)",
					},
					emphasis: {
						//高亮的显示设置
						areaColor: "skyblue", //鼠标选择区域颜色
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowBlur: 20,
						borderWidth: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
				geoIndex: 0,
				data: this.echarts_data,
			},
		],
		toolbox: {
			show: false,
			orient: "vertical",
			left: "right",
			top: "center",
			feature: {
				dataView: { readOnly: false },
				restore: {},
				saveAsImage: {},
			},
		},

		visualMap: {
			min: 0,
			max: 1000,
			left: "left",
			top: "bottom",
			text: ["高", "低"],
			calculable: false,
			orient: "horizontal",
			inverse: true,
			inRange: {
				color: ["lightskyblue", "yellow", "orangered"],
				// symbolSize: [100, 1000],
			},
		},
	};
}

function renderEcharts(code = "100000", name = "中国") {
	if (!code) return;
	myChart = echarts.init(document.getElementById("echarts"));
	myChart.showLoading();
	this.request(
		`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}`,
		geoJson => {
			myChart.hideLoading();
			// 注册地图
			echarts.registerMap(name, geoJson);

			// 处理数据
			const echarts_data = geoJson["features"].map(i => {
				return {
					name: i.properties.name,
					value: Math.floor(Math.random() * 1000),
				};
			});

			let options = getEchartsOptions.apply({ code, name, echarts_data });
			myChart.setOption(options);
			myChart.resize();
		}
	);
}

// 选择省
function onChangeProvince() {
	let code = $("#province option:selected").val();
	let name = $("#province option:selected").text();
	if (!code) return;
	const filter = global_city.cityList.filter(
		i => i.type === 2 && i.parentCodeId === code
	);
	$("#city").html(
		`<option value="">请选择市</option>` + renderOptionData(filter)
	);
	renderEcharts(`${code}_full`, name);
}

// 选择市
function onChangeCity() {
	let code = $("#city option:selected").val();
	let name = $("#city option:selected").text();
	if (!code) return;
	const filter = global_city.cityList.filter(
		i => i.type === 3 && i.parentCodeId === code
	);
	$("#area").html(
		`<option value="">请选择区</option>` + renderOptionData(filter)
	);
	renderEcharts(`${code}_full`, name);
}

// 选择区
function onChangeArea() {
	let code = $("#area option:selected").val();
	let name = $("#area option:selected").text();
	if (!code) return;
	renderEcharts(`${code}`, name);
}

!(function () {
	dom.getDom("#province").innerHTML = renderOptionData(
		global_city.cityList.filter(i => i.type === 1)
	);
	renderEcharts("100000_full");
})();

window.onresize = function () {
	myChart.resize();
};
