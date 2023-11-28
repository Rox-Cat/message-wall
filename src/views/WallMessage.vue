<template>
    <div class="wall-message">
        <Tips></Tips>

        <!-- 封装成组件 -->
        <p class="title">{{ $route.meta.title }}</p>
        <p class="slogon">{{ $route.meta.slogan }}</p>
        <div class="tags">
            <p class="tag-list" :class="{ 'tag-selected': label === -1 }" @click="changeLabel(-1)">全部</p>
            <p class="tag-list" :class="{ 'tag-selected': label === index }" v-for="(tag, index) of $route.meta.tagsType"
                :key="index" @click="changeLabel(index)">
                {{ tag }}
            </p>
        </div>


        <!-- 卡片是否存在 -->
        <div class="none-msg" v-if="isShowNoneStatus && loading === false">
            <img :src="`src/assets/images/none.svg`">
            <p>还没有留言，快贴上第一张吧</p>
        </div>

        <!-- 卡片容器 -->
        <div class="card" v-if="$route.meta.wallId === 0">
            <NoteCard v-for="(message, index) of allNoteCardMessages" :key="index" :noteMessage="message" class="card-item"
                width="288px" :class="{ 'card-selected': index === selectedCardIndex }" @showDetail="selectCard(index)">
            </NoteCard>
        </div>

        <!-- 图片容器 -->
        <div class="photo" v-if="$route.meta.wallId === 1">
            <PhotoCard :photo="item" class="photo-card" v-for="(item, index) of wallInfoStore.allNoteCardMessages"
                :key="index" @click="selectCard(index)"></PhotoCard>
        </div>

        <!-- 加载状态 -->
        <div class="loading" v-show="loading">
            <div class="" id="lottie"></div>
            <p>加载中</p>
        </div>

        <!-- 到达底部 -->
        <!-- 不能和isShowNoneStatus同时显示 -->
        <div class="bottom-msg" v-if="page === 0 && !isShowNoneStatus">
            <p>没有更多了</p>
        </div>

        <!-- add 按钮 -->
        <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addMessage">
            <span class="iconfont icon-jia"></span>
        </div>

        <!-- 弹出框，实际上是在Flyout组件中控制是否显示，   
             感觉有问题，应该是在该文件中执行Flyout是否显示 
        -->
        <div class="flyout">
            <Flyout :title="flyoutTitle">
                <!-- 
                    这是一个空白的新增的卡片内容
                    我们是把这个内容，放到了Flyout组件中
                    如果Flyout此时需要显示
                        - 如果没有卡片被选择，那么是空白卡片
                        - 如果有卡片被选择，那么是卡片详情
                 -->
                <FlyoutCardBlock v-if="selectedCardIndex === -1"></FlyoutCardBlock>
                <FlyoutCardDetail v-else></FlyoutCardDetail>
            </Flyout>
            <!-- 左侧照片弹出层 -->
            <PhotoViewer :isView="wallInfoStore.openFlyout"></PhotoViewer>
        </div>
    </div>
</template>

<script setup>
/* 组件 */
import NoteCard from '@/components/NoteCard.vue'
import Flyout from '@/components/flyout/Flyout.vue';
import FlyoutCardBlock from '@/components/flyout/FlyoutCardBlock.vue';
import FlyoutCardDetail from '@/components/flyout/FlyoutCardDetail.vue';
import PhotoCard from '@/components/PhotoCard.vue';
import PhotoViewer from '@/components/PhotoViewer.vue';
import Tips from '../components/tips/Tips.vue';
/* 方法 */
import { computed, ref, onMounted, watch, nextTick, onBeforeUpdate } from 'vue'
import { reqFindWallPage, reqUserIp } from '../api/index.js'
import { storeToRefs } from 'pinia'
/* 仓库和路由 */
import { useWallInfoStore, useUserInfoStore } from '@/stores';
import { useRoute } from 'vue-router'
/* 插件 */
import lottie from 'lottie-web';
import * as lottieLoadingJson from '@/assets/animation/loading.json'
/* 用到的仓库 */
const wallInfoStore = useWallInfoStore()
const userInfoStore = useUserInfoStore()
const route = useRoute()


/* label信息 */
const label = ref(-1)
const changeLabel = (index) => {
    label.value = index
    wallInfoStore.allNoteCardMessages = []
    page.value = 1
    getNoteCardmessages()
}

/* 状态信息 和 加载动画 */
const isShowNoneStatus = computed(() => !allNoteCardMessages.value.length)

/* add 按钮 + 弹窗 */
const addBottom = ref(30)       // 按钮下边距控制
const flyoutTitle = ref('留言详情')
// 点击添加按钮
const addMessage = () => {
    flyoutTitle.value = route.meta.wallId === 0 ? '写留言' : "添加照片"
    selectedCardIndex.value = -1
    wallInfoStore.openFlyout = true
}
/* 留言墙信息 */
const { allNoteCardMessages, selectedCardIndex } = storeToRefs(wallInfoStore)  // 获取到的所有留言信息                // 被选中的card
const selectCard = (index) => {
    // 选择卡片的效果 -> 添加一个类
    // 第一次点击
    if (index !== selectedCardIndex.value) {
        selectedCardIndex.value = index
        // 弹出框
        wallInfoStore.openFlyout = true
        
        flyoutTitle.value = route.meta.wallId === 0 ? '留言详情' : "照片详情"
        // 更新当前选中笔记的信息 -> store 中
        wallInfoStore.noteMessage = allNoteCardMessages.value[index]
    } else {
        // 已经点过一次
        selectedCardIndex.value = -1
        wallInfoStore.openFlyout = false
        wallInfoStore.noteMessage = []
    }
}
watch(() => wallInfoStore.selectedCardIndex, () => {
    if (wallInfoStore.selectedCardIndex === -1) {
        wallInfoStore.openFlyout = false
        wallInfoStore.noteMessage = []
    }
})

watch(() => wallInfoStore.wallId, () => {
    if (wallInfoStore.wallId !== route.meta.wallId) {
        label.value = -1
        page.value = 1
        getNoteCardmessages()
    }
    

})

/* 加载框 */
let animation;
const loading = ref(true)
onMounted(() => {
    animation = lottie.loadAnimation({
        container: document.getElementById("lottie"),//当前需要渲染的DOM
        renderer: "svg",//渲染方式，默认为svg,还可以渲染为html和canvas
        loop: true,//循环播放
        autoplay: true,//自动播放
        animationData: lottieLoadingJson.default
    });
    animation.play()
    reqUserIp().then(res => {
        userInfoStore.userId = res.ip
        wallInfoStore.wallId = route.meta.wallId
        getNoteCardmessages()
    })

})

/* 前端请求 */
const page = ref(1)
const getNoteCardmessages = () => {
    if (page.value > 0) {
        const data = {
            type: wallInfoStore.wallId,
            page: page.value,
            pageSize: 10,
            userId: userInfoStore.userId,
            label: label.value
        }

        loading.value = true

        reqFindWallPage(data).then(res => {
            setTimeout(() => {
                loading.value = false
                if (res.message.length) {
                    wallInfoStore.allNoteCardMessages.push(...res.message)
                    page.value++
                } else {
                    page.value = 0
                }
            }, 300)
        })
    }
}
window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (scrollTop + windowHeight == scrollHeight) {
        //写后台加载数据的函数
        getNoteCardmessages()
    }
}
</script>

<style lang="less" scoped>
.wall-message {
    min-height: 700px;
    padding-top: 52px;

    .title {
        padding-top: 48px;
        padding-bottom: @padding-8;
        height: 78px;
        font-size: 56px;
        color: @gray-0;
        letter-spacing: 0;
        text-align: center;
        font-weight: 600;
    }

    .slogon {
        font-size: @size-16;
        color: @gray-1;
        letter-spacing: 0;
        text-align: center;
    }

    .tags {
        display: flex;
        justify-content: center;
        margin-top: 40px;

        .tag-list {
            padding: 0 14px;
            line-height: 29px;
            margin-right: @padding-4;
            color: @gray-1;
            box-sizing: border-box;
        }

        .tag-selected {
            color: @gray-0;
            font-weight: 600;
            // border: 1px solid @gray-0;
            border-radius: 16px;
        }
    }

    .card {
        padding-top: 28px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .card-item {
            margin: 6px;
            cursor: pointer;
        }

        .card-selected {
            border: 1px solid @primary-color;
        }

    }

    .photo {
        width: 88%;
        margin: 0 auto;
        padding-top: 30px;
        columns: 6;
        column-gap: @padding-4;

        .photo-card {
            margin-bottom: @padding-4;
            break-inside: avoid;
        }
    }

    .bottom-msg {
        text-align: center;
        padding-top: 40px;
        color: #949494
    }

    .add {
        width: 56px;
        height: 56px;
        background: @gray-1;
        box-shadow: 0px 4px 8px 0px rgba(142, 137, 137, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: @primary-color;
        }

        .icon-jia {
            font-size: 24px;
            color: @gray-4;
        }


    }

    .none-msg {
        width: 100%;
        text-align: center;
        padding-top: 80px;
        position: absolute;
        top: 280px;

        img {
            display: inline;
            width: 100px;
        }

        p {
            font-family: serif;
            font-weight: 700;
            font-size: 24px;
            color: #949494;
        }


    }

    .loading {
        text-align: center;
        width: 100%;

        #lottie {
            margin-top: 20px;
            height: 200px;
        }

        p {
            font-family: serif;
            font-size: 24px;
            color: black;
        }
    }
}
</style>