<template>
    <van-list
    finished-text="Finished"
    >
    <van-cell v-for="item in 20" :key="item" :title="item" />
    
    </van-list>
</template>
<script>
    import { List } from 'vant';
    import { Cell, CellGroup } from 'vant';

    export default {
        components: {
            [List.name]: List,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup
        }
    }
</script>