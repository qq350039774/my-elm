<template>
    <div>
        <van-nav-bar
        :title="headTitle"
        @click-left="onClickLeft"
      >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #right>
        <router-link to="/login" class="blue-link">登录</router-link>
      </template>
        </van-nav-bar>
    </div>
</template>
<script>
    import { NavBar } from 'vant';
    import {Icon} from 'vant';

    export default {
        data() {
            return {

            }
        },
        props: ['headTitle'],
        components:{
           [NavBar.name]:NavBar,
           [Icon.name]: Icon,

        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
a:LINK, a:VISITED,a:HOVER{
    color: #1989FA;
}
</style>