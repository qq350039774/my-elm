<template>
    <div>
        <head-top :headTitle="msiteTitle"></head-top>
        <van-swipe class="my-swipe" indicator-color="#39a9ed">
            <van-swipe-item  v-for="(item, index) in foodTypes" :key="index" >
                <van-grid :column-num="4">
                    <van-grid-item v-for="foodItem in item" :key="foodItem.id" 
                    :icon="imgBaseUrl + foodItem.image_url" :text="foodItem.title" />
                    <!-- :icon="imgBaseUrl + foodItem.image_url"   photo-o-->
                </van-grid>
            </van-swipe-item>
        </van-swipe>
        <div style="font-size: 10px;text-align: left;padding:5px 15px;"><van-icon name="location-o" />&nbsp;&nbsp;附近商家</div>
        <shop-list :geohash="geohash" style="margin-bottom: 50px;"></shop-list>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import headTop from '../../components/header/head';
    import footGuide from '../../components/footer/footGuide';
    import { msiteAddress, msiteFoodTypes, cityGuess } from '../../service/getData';
    import { Icon } from 'vant';
    import { Swipe, SwipeItem, Grid, GridItem } from 'vant';
    import shopList from '../../components/common/shoplist';

    export default {
        data() {
            return {
                geohash: '', // city页面传递过来的地址geohash
                msiteTitle: '请选择地址...', // msite页面头部标题
                foodTypes: [], // 食品分类列表
                hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            }
        },
        mounted() {
            //获取导航食品类型列表
            msiteFoodTypes(this.geohash).then(res => {
                let resLength = res.length;
                let resArr = [...res]; // 返回一个新的数组
                let foodArr = [];
                for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                    foodArr[j] = resArr.splice(0, 8);
                }
                this.foodTypes = foodArr;
            });
        },
        async beforeMount() {
            if (!this.$route.query.geohash) {
                const address = await cityGuess();
                this.geohash = address.latitude + ',' + address.longitude;
            } else {
                this.geohash = this.$route.query.geohash
            }
            //保存geohash 到vuex
            this.SAVE_GEOHASH(this.geohash);
            //获取位置信息
            let res = await msiteAddress(this.geohash);
            this.msiteTitle = res.name;
            // 记录当前经度纬度
            this.RECORD_ADDRESS(res);

            this.hasGetData = true;
        },
        components: {
            shopList,
            headTop,
            footGuide,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Icon.name]: Icon,
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS', 'SAVE_GEOHASH'
            ])
        }
    }
</script>
<style>
    .my-swipe .van-swipe-item {
        font-size: 20px;
        line-height: 150px;
        text-align: center;
    }
</style>