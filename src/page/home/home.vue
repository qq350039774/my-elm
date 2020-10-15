<template>
    <div>
        <head-top headTitle="城市列表" signin-up='home'>
            <span slot='logo' class="head_logo" @click="reload">ele.me</span>
        </head-top>
        <van-cell-group>
            <router-link :to="'/city/' + guessCityid">
                <van-cell title="当前城市：" icon="location-o" is-link :value="guessCity" style="text-align: left;"></van-cell>
            </router-link>
        </van-cell-group>
        <van-grid clickable>
            <van-grid-item v-for="(item,idx) in hotcity" :key="idx"  :to="'/city/' + item.id" :text="item.name" />
        </van-grid>
        <van-index-bar :index-list="indexList" :sticky="false" highlight-color="#1989FA" >
            <van-index-anchor highlight-color="#07c160" v-for="(value, key) in groupcity" :key="key" :index="key"
                style="text-align: left;">
                {{key}}
                <van-cell clickable v-for="item in value" :key="item.id" :to="'/city/'+item.id" :title="item.name" style="text-align: left;" />
            </van-index-anchor>
        </van-index-bar> 
    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import { cityGuess, hotcity, groupcity } from '../../service/getData'
    import { Icon } from 'vant';
    import { Grid, GridItem } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import { IndexBar } from 'vant';
    import { IndexAnchor } from 'vant';


    export default {
        data() {
            return {
                guessCity: '',   //当前城市
                guessCityid: '', //当前城市id
                hotcity: [],     //热门城市列表
                groupcity: {},   //所有城市列表
                indexList: [],
            }
        },

        mounted() {
            // 获取当前城市
            cityGuess().then(res => {
                this.guessCity = res.name;
                this.guessCityid = res.id;
            })

            //获取热门城市
            hotcity().then(res => {
                this.hotcity = res;
            })

            //获取所有城市
            groupcity().then(res => {
                this.groupcity = res;
                let sortobj = {};
                for (let i = 65; i <= 90; i++) {
                    if (this.groupcity[String.fromCharCode(i)]) {
                        sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                    }
                }
                this.indexList=Object.keys(sortobj);
                this.groupcity = sortobj;
            })
        },

        components: {
            headTop,
            [Icon.name]: Icon,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [IndexBar.name]: IndexBar,
            [IndexAnchor.name]: IndexAnchor
        },

        computed: {
            //将获取的数据按照A-Z字母开头排序
            sortgroupcity() {
                let sortobj = {};
                for (let i = 65; i <= 90; i++) {
                    if (this.groupcity[String.fromCharCode(i)]) {
                        sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                    }
                }
                return sortobj;
            }
        },

        methods: {
            //点击图标刷新页面
            reload() {
                window.location.reload();
            }
        },
    }
</script>