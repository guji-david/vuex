<template>
    <div>
        <button @click="add">add</button>
        <button @click="decrease">decrease</button>
        <button @click="oddAdd">oddAdd</button>
        <div>{{count}}</div>
        <div>{{getOdd}}</div>
        <router-link to="dispatch">
            dispatch 调试 到
        </router-link>
    </div>

</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        // 得到计算后的值
        computed:mapGetters(['count','getOdd']),
        // 发生点击事件触发不同函数
        methods:mapActions(['add','decrease','oddAdd'])
    }
</script>

<style>

</style>
