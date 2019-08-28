<template>
    <div class="page">
        <navbar title="我的" title-color="deeppink" background-color="lightpink" :back-visible="false" :home-visible="true"></navbar>
        <div class="author">
            <img src="/static/images/account/avatar.jpg" mode="aspectFill" class="avatar" />
            <div class="details">
                <div class="nickname">James Bond</div>
                <div class="motto">c'est la vie</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import navbar from '../../components/navbar'

export default {
    components: { navbar },
    mpType: 'page',

    config: {
        navigationBarTitleText: '我的',
        navigationStyle: 'custom',
    },

    computed: {
        ...mapState('auth', [
            'user',
        ]),
    },

    mounted() {
        console.log('account mounted')
    },
}
</script>

<style lang="scss">
.page {
    .author {
        margin: 10px 15px;
        display: flex;
        .avatar {
            flex-shrink: 0;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 0 3px rgba(0, 0, 0, .3);
        }
        .details {
            margin-left: 10px;
            flex-grow: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
</style>
