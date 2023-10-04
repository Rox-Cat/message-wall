<template>
    <div class="top-bar">

        <!-- logo信息 -->
        <div class="logo">
            <img src="@/assets/images/favicon.ico" class="logo-img">
            <p class="logo-name"> Rox7 的留言墙</p>
        </div>

        <!-- 菜单信息 -->
        <div class="menu">
            <YKButton size="small" nom="cprimary" class="menu-message">留言墙</YKButton>
            <YKButton size="small" nom="secondary" class="menu-photo">照片墙</YKButton>
        </div>

        <!-- 用户信息 -->
        <div class="user">
            <div class="user-header"> 用户信息</div>
        </div>
    </div>
</template>

<script setup>
import YKButton from './YKButton.vue'
import { ref } from 'vue'
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
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;

        .logo-img {
            width: 20px;
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
        .menu-message{
            margin-right: 20px;
        }


    }

    // 用户信息
    .user {
        box-sizing: border-box;
        width: 200px;

        .user-head {
            border-radius: 50%;
            height: 36px;
            width: 36px;
        }
    }

}

:deep(.el-radio-button__inner) {
    font-size: 20px;

}
</style>

