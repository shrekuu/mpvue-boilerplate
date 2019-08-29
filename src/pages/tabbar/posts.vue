<template>
  <div class="page">
    <navbar title="文章列表"
            color="yellow"
            background="#009a61"></navbar>
    <div class="posts">
      <div class="post" v-for="post in posts" :key="post.id">
        <a class="title text-ellipsis" hover-class="none" :href="'/pages/posts/post?id=' + post.id">{{ post.title }}</a>
        <div class="published-at">{{ post.published_at_humanized }}</div>
      </div>
    </div>
    <!-- <div class="test">
      <div>图片地址编译测试</div>
      <img src="/static/images/test.png">
      <img src="/cos/static/images/test.png">
    </div> -->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import dayjs from 'dayjs'
  import LocalizedFormat from 'dayjs/plugin/localizedFormat'
  import navbar from '../../components/navbar'

  dayjs.extend(LocalizedFormat)

  export default {
    mpType: 'page',
    config: {
      navigationBarTitleText: '文章列表',
      navigationStyle: 'custom',
    },

    components: { navbar },

    data () {
      return {
        posts: [],
      }
    },

    computed: {
      ...mapState('auth', [
        'user',
      ]),
    },

    methods: {
      getPosts () {
        this.showLoading()
        this.$apiService.getPosts()
          .subscribe(
            res => {
              console.log('res', res)
              this.hideLoading()

              this.posts = res.map(e => {
                e.published_at_humanized = dayjs(e.updated_at).format('ll')
                return e
              })
            },
            err => {
              this.showToast(err.message)
            },
          )
      },
    },

    mounted () {
      this.getPosts()

      // this.$router.push({ path: '/pages/posts/post', query: { id: 1 } })

      // this.$router.push({ path: '/pages/tabbar/account', isTab: true })
    },

    // 用于理解生命周期
    // beforeCreate () {console.log('beforeCreate 1')},
    // created () {console.log('created 1')},
    // beforeMount () {console.log('beforeMount 1')},
    // mounted () {
    //   console.log('mounted 1')
    //   this.getPosts()
    // },
    // beforeUpdate () {console.log('beforeUpdate 1')},
    // updated () {console.log('updated 1')},
    // activated () {console.log('activated 1')},
    // deactivated () {console.log('deactivated 1')},
    // beforeDestroy () {console.log('beforeDestroy 1')},
    // destroyed () {console.log('destroyed 1')},
    // onLoad () {console.log('onLoad 1')},
    // onShow () {console.log('onShow 1')},
    // onReady () {console.log('onReady 1')},
    // onHide () {console.log('onHide 1')},
    // onUnload () {console.log('onUnload 1')},
    // onPullDownRefresh () {console.log('onPullDownRefresh 1')},
    // onReachBottom () {console.log('onReachBottom 1')},
    // onShareAppMessage () {console.log('onShareAppMessage 1')},
    // onPageScroll () {console.log('onPageScroll 1')},
    // onTabItemTap () {console.log('onTabItemTap 1')},
  }
</script>

<style lang="scss" scoped="false">
  .page {
    .posts {
      .post {
        margin-left: 15px;
        margin-right: 15px;
        padding: 5px 0;
        display: flex;
        align-items: center;
        min-width: 0;
        a.title {
          flex-grow: 1;
          display: block;
          color: #069;
          font-size: 18px;
        }
        .published-at {
          margin-left: 5px;
          flex-shrink: 0;
          font-size: 13px;
        }
      }
    }
    // 图片地址编译测试
    // .test {
    //   .test1 {
    //       background-image: url(/static/images/test.png);
    //   }
    //   .test2 {
    //       background-image: url("/static/images/test.png");
    //   }
    //   .test3 {
    //       background-image: url("/cos/static/images/test.png");
    //   }
    // }
  }
</style>
