<template>
    <div class="top-bar">

        <!-- logo信息 -->
        <div class="logo">
            <img src="@/assets/images/favicon.ico" class="logo-img">
            <p class="logo-name"> Rox7的留言墙</p>
        </div>

        <!-- 菜单信息 -->
        <div class="menu">
            <YKButton size="small" :nom="$route.meta.wallId === 0 ? 'cprimary' : 'secondary'" class="menu-message"
                @click="skipRoute(0)">
                留言墙
            </YKButton>
            <YKButton size="small" :nom="$route.meta.wallId === 1 ? 'cprimary' : 'secondary'" class="menu-photo"
                @click="skipRoute(1)">
                照片墙
            </YKButton>
        </div>

        <!-- 用户信息 -->
        <div class="user">
            <p class="user-header"> 用户信息</p>
            <img src="src/assets/images/avatar.webp">
        </div>
    </div>
</template>

<script setup>
import YKButton from './YKButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { useWallInfoStore } from '../stores';

const router = useRouter()
const route = useRoute()
const wallInfoStore = useWallInfoStore()
const skipRoute = (wallId) => {
    // 切换时，关闭弹出框
    wallInfoStore.closeFlyout()
    // 清空当前墙的数据
    wallInfoStore.$reset()
    if (wallId === 0) {
        router.push({ path: '/messageWall' })
        wallInfoStore.wallId = 0
    } else {
        router.push({ path: '/photoWall' })
        wallInfoStore.wallId = 1
    }

}
</script>

<style lang="less" scoped>
.top-bar {
    // 宽高设置
    width: 100%;
    height: 52px;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);

    // 定位设置
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    // 子元素的布局设置
    display: flex;
    justify-content: space-between;
    align-items: center;

    // logo 信息
    .logo {
        box-sizing: border-box;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 20px;

        .logo-img {
            height: 25px;
            margin-right: 10px;
        }

        .logo-name {
            font-family: PingFangSC-Semibold;
            font-size: @size-20;
            color: @gray-0;
            text-align: justify;
            font-weight: 600;
            // padding-left: 10px;
        }
    }

    .menu {
        box-sizing: border-box;

        .menu-message {
            margin-right: 20px;
        }


    }

    // 用户信息
    .user {
        box-sizing: border-box;
        width: 200px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .user-header {
            text-align: center;
            border-radius: 50%;
            font-weight: 700;
            // height: 36px;
        }

        img {
            height: 36px;
            width: 36px;
            border-radius: 20%;
        }
    }

}

:deep(.el-radio-button__inner) {
    font-size: 20px;

}
</style>

