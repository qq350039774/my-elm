<template>
    <div>
        <head-top :headTitle="cityname" signin-up='home'>
        </head-top>
        <van-form>
            <van-field v-model.lazy="inputVaule" placeholder="请输入地址"/>
            <div style="margin: 16px;">
                <van-button round block type="info"  @click.prevent="postpois">
                    搜索
                </van-button>
            </div>
        </van-form>
        <div style="text-align: left;margin:5px 15px;" v-if="historytitle">
            <small >搜索历史</small>
        </div>
        <van-list  style="text-align: left;">
            <van-cell v-for="(item,index) in placelist" :key="index" @click='nextpage(index, item.geohash)'>
                <div style="font-size: 16px;">{{item.name}}<br>
                <span style="font-size: 10px;color:#999;">{{item.address}}</span></div>
            </van-cell>
        </van-list>
        <div style="padding-top:15px;" v-if="historytitle" @click="clearAll">
            <small>清空所有</small>
        </div>
    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import {currentcity, searchplace} from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'

    import { Button } from 'vant'
    import { Form } from 'vant';
    import { Field } from 'vant';
    import { Icon } from 'vant';
    import { List } from 'vant';
    import { Cell } from 'vant';
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                inputVaule:'', // 搜索地址
                cityid:'', // 当前城市id
                cityname:'', // 当前城市名字
                placelist:[], // 搜索城市列表
                placeHistory:[], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false, // 搜索无结果，显示提示信息
            }
        },
        mounted() {
            this.cityid = this.$route.params.cityid;
            //获取当前城市名字
            currentcity(this.cityid).then(res => {
                this.cityname = res.name;
            })
            this.initData();
        },
        components: {
            headTop,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Icon.name]: Icon,
            [List.name]: List,
            [Cell.name]: Cell,
            [Toast.name]:Toast

        },
        methods:{
            initData(){
                //获取搜索历史记录
                if (getStore('placeHistory')) {
                    this.placelist = JSON.parse(getStore('placeHistory'));
                }else{
                    this.placelist = [];
                }
            },
            //发送搜索信息inputVaule
            postpois(){
                //输入值不为空时才发送信息
                if (this.inputVaule) {
                    searchplace(this.cityid, this.inputVaule).then(res => {
                        this.historytitle = false;
                        this.placelist = res;
                        this.placeNone = res.length? false : true;
                    })
                }
            },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index, geohash){
                let history = getStore('placeHistory');
                let choosePlace = this.placelist[index];
                if (history) {
                    let checkrepeat = false;
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(item => {
                        if (item.geohash == geohash) {
                            checkrepeat = true;
                        }
                    })
                    if (!checkrepeat) {
                        this.placeHistory.push(choosePlace)
                    }
                }else {
                    this.placeHistory.push(choosePlace)
                }
                setStore('placeHistory',this.placeHistory)
                this.$router.push({path:'/msite', query:{geohash}})
            },
            clearAll(){
                removeStore('placeHistory');
                this.initData();
            }
        }
    }
</script>