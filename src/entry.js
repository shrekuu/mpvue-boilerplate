// 这个就是原来的 app.json 文件
// 使用了 mpvue-entry 工具后可以写成 js 文件, 方便加些注释

module.exports = {
  pages: [
    'pages/tabbar/posts',
    'pages/tabbar/account',
    'pages/login',
  ],
  window: {
    'backgroundTextStyle': 'dark',
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTitleText': 'mpvue-boilerplate',
    'navigationBarTextStyle': 'black',
  },
  tabBar: {
    'color': '#999',
    'backgroundColor': '#fafafa',
    'selectedColor': '#333',
    'borderStyle': 'white',

    'list': [{
      'text': '首页',
      'pagePath': 'pages/tabbar/posts',
      'iconPath': 'static/images/tabbar/posts.png',
      'selectedIconPath': 'static/images/tabbar/posts-active.png',
    }, {
      'text': '我的',
      'pagePath': 'pages/tabbar/account',
      'iconPath': 'static/images/tabbar/account.png',
      'selectedIconPath': 'static/images/tabbar/account-active.png',
    }],
  },

  subPackages: [
    {
      root: 'pages/posts',
      pages: [
        'post',
      ],
    },
    {
      root: 'pages/account',
      pages: [
        'profile',
      ],
    },
  ],
}
