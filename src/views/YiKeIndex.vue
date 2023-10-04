<template>
    <TopBar></TopBar>
    <div class="background-img"></div>
    <img src="@\assets\images\辛德拉.jpg" alt="">
    <router-view></router-view>
    <FooterBar></FooterBar>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue';
import FooterBar from '../components/FooterBar.vue';
</script>

<style lang="less" scoped>
img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    padding: 0px;
    margin: 0px;
    top: 0;
    left: 0;
    z-index: -1;
    filter:blur(1px);
    object-fit: contain;
}

</style>