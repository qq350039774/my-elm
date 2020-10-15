<template>
    <div>
        <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
        </head-top>
        <!-- <form v-if="loginWay">
            <section>
                <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}"
                    v-show="!computedTime">获取验证码</button>
                <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
            </section>
            <section>
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
        </form> 
        <form>
            <section>
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <br>
            <section>
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                <input v-else type="text" placeholder="密码" v-model="passWord">
                <div :class="{change_to_text: showPassword}">
                    <van-button @click="changePassWordType" plain type="info">显示密码</van-button>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section>
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div>
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p>
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p>
            注册过的用户可凭账号密码登录
        </p>
        <div @click="mobileLogin">登录</div>
        <router-link to="/forget" v-if="!loginWay">重置密码？</router-link>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
-->
        <van-form>
            <van-field v-model.lazy="userAccount" name="userAccount" label="账号" placeholder="请输入账号"
                :rules="[{ required: true }]" />
            <van-field v-if="!showPassword" v-model="passWord" type="password" name="Password" label="密码"
                placeholder="请输入密码" :rules="[{ required: true }]">
                <template #button>
                    <van-icon name="eye-o" @click="changePassWordType"  size="20" />
                </template>
            </van-field>
            <van-field v-else v-model="passWord" type="text" name="Password" label="密码" placeholder="请输入密码"
                :rules="[{ required: true }]">
                <template #button>
                    <van-icon name="closed-eye" @click="changePassWordType"  size="20" />
                </template>
            </van-field>
            <van-field v-model="codeNumber" type="text" name="codeNumber" label="验证码" :rules="[{ required: true }]">
                <template #button>
                    <img @click="getCaptchaCode" v-show="captchaCodeImg" :src="captchaCodeImg">
                </template>
            </van-field>

            <div style="margin: 16px;">
                <van-button round block type="info" @click="mobileLogin">
                    登录
                </van-button>
                <router-link to="/forget" v-if="!loginWay">重置密码？</router-link>
            </div>
        </van-form>
    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    //import alertTip from '../../components/common/alertTip'
    //import {localapi, proapi, imgBaseUrl} from '../../config/env'
    import { mapMutations } from 'vuex'
    import { getcaptchas, accountLogin } from '../../service/getData'
    import { Button } from 'vant'
    import { Form } from 'vant';
    import { Field } from 'vant';
    import { Icon } from 'vant';
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: null, //电话号码
                mobileCode: null, //短信验证码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created() {
            this.getCaptchaCode();
        },
        components: {
            headTop,
            //alertTip,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Toast.name]:Toast
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function () {
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //改变登录方式
            changeLoginWay() {
                this.loginWay = !this.loginWay;
            },
            //是否显示密码
            changePassWordType() {
                this.showPassword = !this.showPassword;
            },
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode() {
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            },
            //发送登录信息
            async mobileLogin() {
                debugger;
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    Toast(this.alertText);
                    return
                } else if (!this.passWord) {
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    Toast(this.alertText);
                    return
                } else if (!this.codeNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    Toast(this.alertText);
                    return
                }
                //用户名登录
                this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);

                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                    Toast(this.alertText);
                    if (!this.loginWay) this.getCaptchaCode();
                } else {
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);
                }
            },
            closeTip() {
                this.showAlert = false;
            }
        }
    }
</script>