<template>
    <div>
        <van-goods-action>
            <van-goods-action-icon icon="shop-o" text="外卖" style="width:25%;"  />
            <van-goods-action-icon icon="search" text="搜索" style="width:25%;" />
            <van-goods-action-icon icon="records" text="订单"  style="width:25%;" />
            <van-goods-action-icon icon="contact" text="我的"  style="width:25%;" />
          </van-goods-action>
    </div>
</template>
<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Icon } from 'vant';
import { Col, Row } from 'vant';

export default{
    components:{
        [GoodsAction.name]:GoodsAction,
        [GoodsActionIcon.name]:GoodsActionIcon,
        [GoodsActionButton.name]:GoodsActionButton,
        [Icon.name]:Icon,
        [Col.name]:Col,
        [Row.name]:Row
    }
}
</script>