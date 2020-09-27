**同学同学, 停停停, 不推荐使用 Mpvue, 推荐转向 Taro, 具体参考 [这里](https://www.zhihu.com/question/58441061/answer/1482661683)**

# Mpvue Boilerplate(Deprecated)

> A Mpvue 样板工程, 由 mpvue/mpvue-quickstart 创建

## 如何使用

``` bash
# 初始化项目
git clone https://github.com/shrekuu/mpvue-boilerplate.git my-project
cd my-project

# 安装依赖
yarn install

# 开发时构建
npm run watch

# 打包构建
npm run prod

# 生成 bundle 分析报告
npm run prod --report
```

## 主要特性

- 引入 [mpvue-entry](https://github.com/F-loat/mpvue-entry)，移除冗余的 main.js 文件
- 引入 [mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch)，支持使用类 [vue-router](https://router.vuejs.org/) 的 api
- 引入 [mpvue-config-loader](https://github.com/F-loat/mpvue-config-loader), 支持在 vue 文件中书写页面配置
- 引入 [wecos](https://github.com/tencentyun/wecos) 及编译配置, 方便把图片放在腾讯对象存储里
- 增加了一个自定义的导航条, 可显示返回按钮与 home 按钮一个或两个或都不显示

## 把图片放在腾讯对象存储里

把图片放在腾讯对象存储里, 参考 [wecos](https://github.com/tencentyun/wecos), 全局安装 `wecos`, 复制 `wecos.config.json.example` 到 `wecos.config.json` 作为你的配置文件. 把图片放到 `cos/upload/images` 里, 执行 `wecos` 命令把图片上传到腾讯对象存储里, 图片会被保存到 `cos/static/images` 目录里. 本地写法有:

```html
<template>
<img src="/static/images/test.png">
<img src="/cos/static/images/test.png">
</template>

<style>
.test1 {
    background-image: url(/static/images/test.png);
}
.test2 {
    background-image: url("/static/images/test.png");
}
.test3 {
    background-image: url("/cos/static/images/test.png");
}
</style>
```

会编译为

```html
<template>
<image src="/static/images/test.png#aws82c4koy" class="_img data-v-3c2d0c66"></image>
<image src="https://mina-1252139118.coscd.myqcloud.com/mpvue-quickstart/static/images/test.png#2zevhrpmhb" class="_img data-v-3c2d0c66"></image>
</template>

<style>
.test1.data-v-3c2d0c66 {
  background-image: url(/static/images/test.png#hi36k8ejyf);
}
.test2.data-v-3c2d0c66 {
  background-image: url(/static/images/test.png#d96lw6zsrd);
}
.test3.data-v-3c2d0c66 {
  background-image: url(https://mina-1252139118.coscd.myqcloud.com/mpvue-quickstart/static/images/test.png#f4memkdzdh);
}
</style>
```






