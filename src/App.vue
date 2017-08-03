<template>
    <div id="app">
        <div id="main-body">
            <div id="z-drager"></div>
            <div class="main-content" id="main-content">
                <keep-alive>
                    <transition name="bounce">
                        <router-view></router-view>
                    </transition>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import {clacScrollHeight} from './assets/js/tools.js'
    export default {
        name: 'app',
        components: {
        },
        computed: {

        },
        mounted () {
            clacScrollHeight('main-content', 70)
        }
    }
</script>

<style scoped lang="less">
    @import "App.less";
</style>
