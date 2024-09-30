::: tip
下方列举了一些枚举的使用示例
:::

## 引入

```ts
import { EColor, ETimePeriodType } from "remote-components-lib/enum";
```

## EColor

```ts
enum EColor {
	red = "#f00",
	green = "#0f0",
	blue = "#00f",
	yellow = "#ff0",
	cyan = "#0ff",
	magenta = "#f0f",
	white = "#fff",
	black = "#000",
	orange = "#ffa500",
	pink = "#ffc0cb",
	purple = "#800080",
	gray = "#808080",
	brown = "#a52a2a",
	silver = "#c0c0c0",
	gold = "#ffd700",
	coral = "#ff7f50",
	lime = "#00ff00",
	teal = "#008080",
	navy = "#000080",
	olive = "#808000",
	maroon = "#800000",
	aqua = "#00ffff",
	violet = "#ee82ee",
	indigo = "#4b0082",
	turquoise = "#40e0d0",
}
```

## ETimePeriodType

```ts
enum ETimePeriodType {
	// 最近30天
	lastOneMonth = "lastOneMonth",
	// 最近90天
	lastThreeMonth = "lastThreeMonth",
	// 最近365天
	lastOneYear = "lastOneYear",
	// 上周
	lastWeek = "lastWeek",
	// 上月
	lastMonth = "lastMonth",
	// 上季度
	lastQuarter = "lastQuarter",
	// 上年
	lastYear = "lastYear",
	// 本周
	nearWeek = "nearWeek",
	// 本月
	nearMonth = "nearMonth",
	// 本季度
	nearQuarter = "nearQuarter",
	// 本年
	nearYear = "nearYear",
}
```
