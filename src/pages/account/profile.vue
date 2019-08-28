<template>
  <div class="page">
    <div class="section">
      <div class="avatar">
        <img src="https://placeholdit.projects.linwise.com/v2?dimension=300x300&category=cats&key=1">
      </div>
      <div class="details">
        <div class="nickname">
          James Bond
        </div>
        <div class="motto">c'est la vie</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    mpType: 'page',

    config: {
      navigationBarTitleText: '我的主页',
    },

    computed: {
      ...mapState('auth', [
        'user',
      ]),
    },

    mounted () {
      console.log('profile mounted')
    },

  }
</script>

<style lang="scss">
  .page {
  }
</style>
