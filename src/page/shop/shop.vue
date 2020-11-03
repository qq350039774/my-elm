<template>
    <div>
        <head-top></head-top>
        shop.vue
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import headTop from '../../components/header/head';
    import footGuide from '../../components/footer/footGuide';

    export default{
        data(){
            return {

            }
        },
        components:{
            headTop,
            footGuide
        }
    }
</script>