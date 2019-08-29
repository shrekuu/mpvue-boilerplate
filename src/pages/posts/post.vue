<template>
  <div class="page">
    <navbar :title="post && post.title"
            color="#009a61"
            background="#F7A700"></navbar>
    <div class="post" v-if="post">
      <div class="title">
        {{ post.title }}
      </div>
      <div class="meta">
        <div class="author">
          <img class="avatar" :src="post.author.avatar">
          <div class="name text-ellipsis">{{ post.author.name }} text overflow text overflow text overflow text overflow
            text overflow text overflow text overflow
          </div>
        </div>
        <div class="published-at">{{ post.published_at_humanized }}</div>
      </div>
      <div class="body">
        <rich-text :nodes="post.body"></rich-text>
      </div>
    </div>
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
      navigationBarTitleText: '我的',
      navigationStyle: 'custom',
    },

    components: { navbar },

    data () {
      return {
        post_id: null,
        post: null,
      }
    },

    computed: {
      ...mapState('auth', [
        'user',
      ]),
    },

    methods: {
      getPost () {
        this.showLoading()
        this.$apiService.getPost(this.post_id)
          .subscribe(
            res => {
              this.hideLoading()
              const post = res
              post.published_at_humanized = dayjs(post.updated_at).format('ll')
              this.post = post
            },
            err => {
              this.showToast(err.message)
            },
          )
      },
    },

    mounted () {
      console.log('post mounted')
      this.getPost(+this.$root.$mp.query.id)
    },

    // 用于理解生命周期
    // beforeCreate () {console.log('beforeCreate 2')},
    // created () {console.log('created 2')},
    // beforeMount () {console.log('beforeMount 2')},
    // mounted () {
    //   console.log('mounted 2', +this.$root.$mp.query.id)
    //   this.post_id = +this.$root.$mp.query.id
    //   this.getPost()
    // },
    // beforeUpdate () {console.log('beforeUpdate 2')},
    // updated () {console.log('updated 2')},
    // activated () {console.log('activated 2')},
    // deactivated () {console.log('deactivated 2')},
    // beforeDestroy () {console.log('beforeDestroy 2')},
    // destroyed () {console.log('destroyed 2')},
    // onLoad () {console.log('onLoad 2')},
    // onShow () {console.log('onShow 2')},
    // onReady () {console.log('onReady 2')},
    // onHide () {console.log('onHide 2')},
    // onUnload () {console.log('onUnload 2')},
    // onPullDownRefresh () {console.log('onPullDownRefresh 2')},
    // onReachBottom () {console.log('onReachBottom 2')},
    // onShareAppMessage () {console.log('onShareAppMessage 2')},
    // onPageScroll () {console.log('onPageScroll 2')},
    // onTabItemTap () {console.log('onTabItemTap 2')},
  }
</script>

<style lang="scss">
  .page {
    .post {
      margin: 0 15px;
      .title {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #f8f8f8;
      }
      .meta {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 0;
        .author {
          display: flex;
          align-items: center;
          min-width: 0;
          .avatar {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            border-radius: 15px;
          }
          .name {
            margin-left: 5px;
            color: #666;
            font-size: 12px;
          }
        }
        .published-at {
          flex-shrink: 0;
          margin-left: 5px;
          color: #666;
          font-size: 12px;
        }
      }
      .body {
        margin-top: 20px;
      }
    }
  }
</style>
