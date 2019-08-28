# Mpvue Boilerplate

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

## 修改

移除了除微信小程序外的一些代码

增加了一个自定义的导航条, 可显示返回按钮与 home 按钮一个或两个或都不显示.

把图片放在腾讯对象存储里, 参考 [wecos](https://github.com/tencentyun/wecos), 复制 `wecos.config.json.example` 到 `wecos.config.json` 作为你的配置文件. 把图片放到 `cos/upload/images` 里, 执行 `wecos` 命令把图片上传到腾讯对象存储里, 图片会被保存到 `cos/static/images` 目录里. 本地写法有:

```plain
# 比如在模版里
<img src="/static/images/test.png">
<img src="/cos/static/images/test.png">
# 会编译为
<image src="/static/images/test.png#aws82c4koy" class="_img data-v-3c2d0c66"></image>
<image src="https://mina-1252139118.coscd.myqcloud.com/mpvue-quickstart/static/images/test.png#2zevhrpmhb" class="_img data-v-3c2d0c66"></image>

# 在样式里
.test1 {
    background-image: url(/static/images/test.png);
}
.test2 {
    background-image: url("/static/images/test.png");
}
.test3 {
    background-image: url("/cos/static/images/test.png");
}
# 会编译为
.test1.data-v-3c2d0c66 {
  background-image: url(/static/images/test.png#hi36k8ejyf);
}
.test2.data-v-3c2d0c66 {
  background-image: url(/static/images/test.png#d96lw6zsrd);
}
.test3.data-v-3c2d0c66 {
  background-image: url(https://mina-1252139118.coscd.myqcloud.com/mpvue-quickstart/static/images/test.png#f4memkdzdh);
}

```







