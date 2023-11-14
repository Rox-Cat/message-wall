<template>
    <transition name="flyout">
        <div class="yk-flyout" v-if="wallInfoStore.openFlyout">

            <!-- 头部信息 -->
            <div class="yk-flyout-header">
                <p class="yk-flyout-title">{{ title }}</p>
                <span class="iconfont icon-guanbixiao" @click="wallInfoStore.closeFlyout()"></span>
            </div>

            <!-- 核心区域 -->
            <div class="yk-flyout-main">
                <div class="slot"></div>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useWallInfoStore } from '@/stores';


const wallInfoStore = useWallInfoStore()
const props = defineProps({
    title: {
        default: '写留言',
    }
})

</script>

<style lang="less" scoped>
.flyout {
    &-enter {
        &-from {
            transform: translateX(360px);
        }

        &-active {
            transition: @tr;
        }

        &-to {
            transform: translateX(0px);
        }
    }

    &-leave {
        &-from {
            transform: translateX(0px);
        }

        &-active {
            transition: @tr;
        }

        &-to {

            transform: translateX(360px);
        }
    }
}

.yk-flyout {
    box-sizing: border-box;
    width: 360px;
    height: 100%;
    position: fixed;
    top: 52px;
    right: 0px;
    
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);

    .yk-flyout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @padding-20;
        box-sizing: border-box;
        .yk-flyout-title {
            font-size: @size-16;
            color: @gray-0;
            font-weight: bold;
            text-align: justify;

        }

        .icon-guanbixiao {
            font-size: @size-16;
            color: @gray-0;
            cursor: pointer;
        }
    }

    .yk-flyout-main {
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 116px;
        margin: 2px;
        
        .slot {
            // height: 1200px;
            // border: 2px solid red;
            // background-color: antiquewhite;
        }


    }
}
</style>