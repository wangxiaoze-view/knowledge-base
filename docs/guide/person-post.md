---
outline: deep
---

# 个人项目

> 本人空余时间闲暇，开发一些小工具以及项目; [docs 文档地址](https://docs.wangzevw.com/)

### log-reporting <Badge type="danger" text="推荐" />

这款工具呢顾名思义就是日志上报，就是搜集客户端的一些告警报错日志到服务端，从而在服务端进行数据分析征集成客户端可视化数据面板；

目前该工具分为俩个版本：

1. [log-reporting](https://github.com/wxz-tools/log-reporting-server)
   > 该版本为低版本，支支持部分功能，目前仅支持日志上报，视屏录制，但是不支持 `pv与曝光统计`
   - [Github](https://github.com/wangxiaoze-view/log-repeorting/tree/v1)
   - [npm](https://www.npmjs.com/package/log-reporting)
   - [文档说明](https://docs.wangzevw.com/personal/log-reporting/v1.html)
2. [@log-reporting/core](https://github.com/wxz-tools/log-reporting-server)
   > 该版本为全新版本，与 `log-reporting` 完全不同， 映射以及使用完全不一样; 在原有的基础上完全支持 `pv与曝光统计`； 在原有的基础上对资源以及性能监控进行优化; 当然有内置的 `logger, types`插件；
   - [Github](https://github.com/wangxiaoze-view/log-repeorting/tree/main)
   - [npm](https://www.npmjs.com/package/@log-reporting/core)
   - [文档说明](https://docs.wangzevw.com/personal/log-reporting/v2.html)

### wxzUtils

> 个人开发的一款超简单的工具库

- [Github](https://github.com/wangxiaoze-view/utilstools)
- [文档说明](https://docs-tools.wangzevw.com/)

### 项目模板 <Badge type="warning" text="不再进行开发更新" />

> 为了避免模板项目重复开发, 统一使用模板项目， 当然包含多个设备

- [Github](https://github.com/wangxiaoze-view/project-template)
- [Github（通过 npm 命令拉取模板）](https://github.com/wangxiaoze-view/temp-pro)
- [文档说明](https://docs.wangzevw.com/personal/temp-pro/docs.html)

### demos

> 资源放在 github，可能首次访问会慢一点

- [地址](https://demos.wangzevw.com/)

### Sim-Admin <Badge type="warning" text="项目紧急开发中" />

> 一款简单的中后台管理系统

### HarmonyOs-App

> 这是一款鸿蒙 App, 当然不会涉及到业务逻辑，仅仅是布局而已；

- [Github](https://github.com/wangxiaoze-view/HarmonyOs-App)

### 桌面端开发工具 dev-tools

> 使用 rust + vue 搭建的一款桌面端的开发工具； 目前不开源，等版本稳定之后在开源；

- [mac0.0.1 版本](https://file.wangzevw.com/app/dev-tools/0.0.1/dev-tools_0.0.1_aarch64.dmg)
- [windows0.0.1 版本](https://file.wangzevw.com/app/dev-tools/0.0.1/dev-tools_0.0.1_x64-setup.exe)
- [文档](https://docs.wangzevw.com/personal/dev-tools/info.html)

### 远程组件 remote-components-lib

> 远程组件的使用场景很简单，就是多个平台端需要使用同一份代码，但是由于平台差异，需要做兼容处理，那么就可以使用远程组件，只需要在 `main.ts` 中进行注册即可；

- [文档](https://docs.wangzevw.com/personal/remote-components-lib/info.html)

## 后期工作

1. 对现在已完成的项目进行文档整理
2. 日志上报工具实现可视化面板, 以 `nest + mongodb` 搭建后端服务 <Badge type="tip" text="看个人时间" />
3. 编写一个轻量级的 `vue3` 组件库与后台管理系统 (<Badge type="tip" text="看个人时间" />)
