<template>
    <div>
        <head-top headTitle="msite1"></head-top>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
    import headTop from '../../components/header/head';
    import footGuide from '../../components/footer/footGuide';

    export default {
        data() {
            return {
               
            }
        },
        components:{
            headTop,
            footGuide
        }
    }
</script>