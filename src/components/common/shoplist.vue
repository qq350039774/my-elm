<template>
    <div>
        <van-loading v-if="showLoading" type="spinner" color="#1989fa" />

        <van-list finished-text="Finished" @load="loaderMore">
            <van-cell v-for="item in shopListArr" :key="item.id" :to="{path: 'shop', query:{geohash, id: item.id}}">
                <van-row type="flex" justify="space-between">
                    <van-col span="16">
                        <van-row>
                            <van-col span="7">
                                <img  v-lazy="imgBaseUrl + item.image_path" style="display:block;width:100%;height:65px;">
                            </van-col>
                            <van-col span="17">
                                <div style="margin-left: 5px;">
                                    <div>
                                        <span
                                            style="line-height:8px;border-radius: 2px;background-color: #FFD61A;padding: 2px;font-size: 8px;">
                                            品牌
                                        </span>
                                        <span style="margin-left: 5px;font-weight:bold;">{{item.name}}</span>
                                    </div>
                                    <div style="font-size: 8px;">
                                        <span v-for="num in 5" :key="num">
                                            <svg t="1603345287972" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="1118" width="10" height="10">
                                                <path
                                                    d="M511.12619691 5.02052637L631.33966109 392.68886414 1020.36090994 392.68886414 705.63682077 632.28215751 825.85028494 1019.95165923 511.12619691 780.35720192 196.40094379 1019.95165923 316.61557191 632.28215751 1.89148387 392.68886414 390.91156765 392.68886414Z"
                                                    fill="#FFD61A" p-id="1119"></path>
                                            </svg>
                                        </span>
                                        <span style="color:#FFD61A;margin-left: 10px;">{{item.rating}}</span>
                                        <span style="margin-left: 10px;color:#A8A8A8;">
                                            月售{{item.recent_order_num}}单
                                        </span>
                                    </div>
                                    <div style="font-size: 10px;">
                                        <span>¥{{item.float_minimum_order_amount}}起送</span>
                                        <span style="margin-left:10px;">{{item.piecewise_agent_fee.tips}}</span>
                                    </div>
                                </div>

                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8" align="right" style="font-size:10px;">
                        <div style="color:#A8A8A8;">
                            <!-- 保准票 -->
                            <span
                                style="font-size:8px;padding:1px;margin-left:5px;border:1px solid rgb(226, 229, 231);border-radius: 2px;"
                                v-for="item in item.supports" :key="item.id">{{item.icon_name}}</span>
                        </div>
                        <div>
                            <span v-if="item.delivery_mode"
                                style="border-radius: 2px;border:1px solid #2D90E3;background-color: #2D90E3;padding: 1px 2px;font-size: 8px;color:white;">
                                {{item.delivery_mode.text}}
                            </span>
                            <span
                                style="margin-left:5px;border-radius: 2px;border:1px solid #2D90E3;padding:1px 2px;font-size: 8px;color:#2D90E3;">
                                准时达
                            </span>
                        </div>
                        <div>
                            {{item.distance}}/<span style="color:#2D90E3;">{{item.order_lead_time}}</span>
                        </div>
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { List } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import { shopList } from '../../service/getData'
    import { imgBaseUrl } from '../../config/env'
    import { Col, Row } from 'vant';
    import { Loading } from 'vant';

    export default {
        data() {
            return {
                shopListArr: [],
                imgBaseUrl,
                showLoading: true,
                preventRepeatReuqest: false,
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                touchend: false//没有更多
            }
        },
        props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
        computed: {
            ...mapState([
                'latitude', 'longitude'
            ]),
        },
        components: {
            [List.name]: List,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Col.name]: Col,
            [Row.name]: Row,
            [Loading.name]: Loading
        },
        mounted() {
            //this.initData();
        },
        methods: {
            // async initData() {
            //     //获取数据
            //     let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
            //     this.shopListArr = [...res];
            //     if (res.length < 20) {
            //         this.touchend = true;
            //     }
            //     this.hideLoading();
            //     // //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            //     // showBack(status => {
            //     //     this.showBackStatus = status;
            //     // });
            // },
            //到达底部加载更多数据
            async loaderMore() {
                if (this.touchend) {
                    return;
                }
                //防止重复请求
                if (this.preventRepeatReuqest) {
                    return;
                }
                this.showLoading = true;
                this.preventRepeatReuqest = true;

                //数据的定位加20位
                this.offset += 20;
                console.log(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
                let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
                this.hideLoading();
                this.shopListArr = [...this.shopListArr, ...res];
                //当获取数据小于20，说明没有更多数据，不需要再次请求数据
                if (res.length < 20) {
                    this.touchend = true;
                    return;
                }
                this.preventRepeatReuqest = false;
            },
            //loading
            hideLoading() {
                this.showLoading = false;
            }
        }

    }
</script>