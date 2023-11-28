<template>
    <transition name="view">
        <div class="yk-viewer" v-if="isView && $route.meta.wallId === 1 && wallInfoStore.selectedCardIndex !== -1">
            <!-- 背景 -->
            <div class="bg">

            </div>
            <!-- 图片显示区域 -->
            <div class="viewer-photo">
                <img :src="wallInfoStore.noteMessage.imgUrl" alt="">
            </div>

            <!-- 图片切换的按钮 -->
            <div class="switch switch-left">
                <span class="iconfont icon-xiangzuo" @click="switchToLeft"></span>
            </div>
            <div class="switch switch-right">
                <span class="iconfont icon-xiangyou" @click="switchToright"></span>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useWallInfoStore } from '@/stores';
const wallInfoStore = useWallInfoStore()

const props = defineProps({
    isView: {
        default: false
    }
})

const switchToLeft = () => {
    wallInfoStore.selectedCardIndex--
    if (wallInfoStore.selectedCardIndex === -1) {
        wallInfoStore.openFlyout = false
    }
    else {
        wallInfoStore.noteMessage = wallInfoStore.allNoteCardMessages[wallInfoStore.selectedCardIndex]
    }
}

const switchToright = () => {
    wallInfoStore.selectedCardIndex++
    if (wallInfoStore.selectedCardIndex === wallInfoStore.allNoteCardMessages.length) {
        wallInfoStore.openFlyout = false
        wallInfoStore.selectedCardIndex === -1 // selectedCardIndex 等于 -1 表示未选择图片
    } else {
        wallInfoStore.noteMessage = wallInfoStore.allNoteCardMessages[wallInfoStore.selectedCardIndex]
    }
}
</script>

<style lang="less" scoped>
.view {
    &-enter {
        &-from {
            opacity: 0;
        }

        &-active {
            transition: @tr;
        }

        &-to {
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            opacity: 1;
        }

        &-active {
            transition: @tr;
        }

        &-to {

            opacity: 0;
        }
    }
}

.yk-viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 360px);
    height: 100%;
    border: 1px solid red;

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(30px);
        height: 100%;
        width: 100%;
    }

    .viewer-photo {
        position: absolute;
        padding: 82px 30px 0px 96px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        justify-content: center;

        img {
            max-width: 100%;
        }
    }

    .switch {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        color: @gray-4;
        position: absolute;
        background: #949494;
        top: 0px;
        bottom: 0px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        transition: @tr;
        cursor: pointer;

        .iconfont {
            position: relative;
            top: -14px;
            width: 30px;
            height: 30px;
            font-size: 40px;
            color: #fff;

            &.icon-xiangyou {
                left: -3px;
            }

            &.icon-xiangzuo {
                left: -3px;
            }
        }

        &:hover {
            opacity: 1;
        }

    }

    .switch-left {
        left: 20px;
    }

    .switch-right {
        right: 20px;
    }
}
</style>