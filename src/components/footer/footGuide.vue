<template>
    <div>
        <van-goods-action>
            <van-goods-action-icon  icon="chat-o" text="Icon1" style="width:25%;"  />
            <van-goods-action-icon icon="cart-o" text="Icon2" style="width:25%;" />
            <van-goods-action-icon icon="shop-o" text="Icon3"  style="width:25%;" />
            <van-goods-action-icon icon="shop-o" text="Icon4"  style="width:25%;" />
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