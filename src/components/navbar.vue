<template>
  <div class="navbar-container"
       :class="{'is-ios': isIOS, 'navbar-text-style-white': textStyle === 'white'}">

    <!-- 占位栏 -->
    <cover-view class="navbar-placeholder" :style="{height: navbarHeight + 'PX'}"></cover-view>

    <!-- 导航栏主体 -->
    <cover-view class="navbar" :style="{height: navbarHeight + 'PX',backgroundColor: background}">

      <!-- 状态栏 -->
      <cover-view class="status-bar" :style="{height: statusBarHeight + 'PX'}"></cover-view>

      <!-- 标题栏 -->
      <cover-view class="title-bar" :style="{height: titleBarHeight + 'PX'}">

        <!-- home及后退按钮 -->
        <cover-view class="action-left" :class="'action-btn-count-' + actionBtnCount">
          <cover-view v-if="backVisible"
                      class="action action-back"
                      hover-class="active"
                      @click="goBack">
            <cover-image class="icon icon-image-chevron-left-black"
                         src="/static/images/icons/chevron-left-black.png"
                         v-if="textStyle === 'black'"
            ></cover-image>
            <cover-image class="icon icon-image-chevron-left-white"
                         src="/static/images/icons/chevron-left-white.png"
                         v-if="textStyle === 'white'"
            ></cover-image>
          </cover-view>

          <cover-view v-if="backVisible && homeVisible" class="divider"></cover-view>

          <cover-view v-if="homeVisible"
                      class="action action-home"
                      hover-class="active"
                      @click="goToHomePage">
            <cover-image class="icon icon-image-home-black"
                         src="/static/images/icons/home-black.png"
                         v-if="textStyle === 'black'"
            ></cover-image>
            <cover-image class="icon icon-image-home-white"
                         src="/static/images/icons/home-white.png"
                         v-if="textStyle === 'white'"
            ></cover-image>
          </cover-view>
        </cover-view>

        <!-- 标题 -->
        <cover-view class="title" :style="[{color:titleColor}]">{{title}}</cover-view>

        <!-- 右边的菜单占位 -->
        <cover-view class="action-right-placeholder"></cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>

  // 注意: icon-image-chevron-left-* icon-image-home-* 按钮用样式 display: none 控制无效, 保持用上面的 v-if 控制, 不要修改

  export default {
    props: {
      // 导航栏文本为浅色还是深色风格
      textStyle: {
        default: 'black',
      },
      // 导航栏背景色
      background: {
        default: '#ffffff',
      },
      //标题文字
      title: {
        required: false,
        default: '',
      },
      // 标题颜色
      color: {
        default: '#000000',
      },
      // 是否显示后退按钮
      back: {
        required: false,
        default: null,
      },
      // 是否显示home按钮
      home: {
        required: false,
        default: null,
      },
    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navbarHeight: '', // 导航栏总高度
        actionBtnCount: 2,
        backVisible: this.back,
        homeVisible: this.home,
        isIOS: false,
      }
    },
    methods: {
      goBack () {
        try {
          this.$router.back()
        } catch (e) {
          this.goToHomePage()
        }
      },
      goToHomePage () {
        this.$router.push({
          path: '/pages/tabbar/posts', // 小程序首页
          reLaunch: true,
        })
      },
    },
    beforeMount () {
    
      console.log('navbar component mounted');
      
      console.log(this, this.backVisible, this.homeVisible);
      console.log(this._data.backVisible);
      setTimeout(() => {
        console.log(this._data.backVisible);
      }) 
      
      
      // console.log('beforeMount', this, this.$data, this.backVisible, this.homeVisible)

      if (this.backVisible === null) {

        // 如果当前页面栈里页面多于一个再显示返回按钮
        this.backVisible = getCurrentPages().length !== 1
      }

      if (this.homeVisible === null) {
        this.homeVisible = true
      }

      const system = wx.getSystemInfoSync()

      this.statusBarHeight = system.statusBarHeight
      this.platform = system.platform

      if (/ios/i.test(system.system)) {
        this.isIOS = true
        this.titleBarHeight = 44
      } else {
        this.titleBarHeight = 48
      }

      this.navbarHeight = this.statusBarHeight + this.titleBarHeight
      if (this.backVisible && this.homeVisible) {
        this.actionBtnCount = 2
      } else if (this.backVisible || this.homeVisible) {
        this.actionBtnCount = 1
      } else {
        this.actionBtnCount = 0
      }
    },

    // mounted () {
    //   console.log('mounted', this.backVisible, this.homeVisible)
    // },
  }
</script>

<style lang="scss">
  .navbar-container {
    width: 100vw;
    z-index: 999999;
    flex-shrink: 0;

    .navbar-placeholder {
      background-color: transparent;
      width: 100%;
    }

    .navbar {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      .title-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .action-left {
          bottom: 1px;
          margin-top: -2PX;
          flex-shrink: 0;
          margin-left: 10PX;
          width: 87PX;
          height: 32PX;
          border: .5PX solid rgba(0, 0, 0, .1);
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: stretch;
          left: 7PX;
          background: rgba(255, 255, 255, .5);
          border-radius: 25PX;
          overflow: hidden;

          // 有两个按钮
          &.action-btn-count-2 {
            width: 87PX;
          }

          // 有一个按钮
          &.action-btn-count-1 {
            width: 45PX;
            .action {
              width: 100%;
            }
          }

          // 没有按钮
          &.action-btn-count-0 {
            width: 0;
            opacity: 0;
          }
          .action {
            width: 49.5%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &.active {
              background: rgba(0, 0, 0, .4)
            }
            .icon {
              width: 16PX;
              height: 16PX;
            }
          }
          .action-back {
          }
          .divider {
            align-self: center;
            display: block;
            height: 16PX;
            width: 1PX; // 这条线小于 1PX 时什么都不显示
            background-color: rgba(0, 0, 0, .1);
          }
          .action-home {
          }
        }
        .title {
          margin: 0 9PX;
          flex-grow: 1;
          font-size: 14PX;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .action-right-placeholder {
          margin-right: 10PX;
          flex-shrink: 0;
          width: 87PX;
          height: 30PX;
        }
      }
    }
  }

  // 仅 iOS 有效
  .is-ios {
    .navbar {
      .title-bar {
        .title {
          text-align: center;
        }
      }
    }
  }

  // 当为浅配色时改变标题与按钮样式
  .navbar-text-style-white {
    .navbar {
      .title-bar {
        .action-left {
          margin-top: -1PX;
          border-color: rgba(0, 0, 0, .05);
          background: rgba(0, 0, 0, .15);
          .divider {
            background-color: rgba(255, 255, 255, .15);
          }
        }
        .title {
          color: #fff;
        }
      }
    }
  }
</style>
