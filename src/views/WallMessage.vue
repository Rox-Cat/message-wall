<template>
    <div class="wall-message">
        <!-- 封装成组件 -->
        <p class="title">{{ $route.meta.title }}</p>
        <p class="slogon">{{ $route.meta.slogan }}</p>
        <div class="tags">
            <p class="tag-list" :class="{ 'tag-selected': tagId === -1 }" @click="changeTag(-1)">全部</p>
            <p class="tag-list" :class="{ 'tag-selected': tagId === index }" v-for="(tag, index) of $route.meta.tagsType"
                :key="index" @click="changeTag(index)">
                {{ tag }}
            </p>
        </div>

        <!-- 卡片容器 -->
        <div class="card" v-show="$route.meta.wallId === 0">
            <NoteCard v-for="(message, index) of messages" :key="index" :tagsType="$route.meta.tagsType"
                :noteMessage="message" class="card-item" width="288px" :class="{ 'card-selected': index === cardSelected }"
                @click="selectCard(index)">
            </NoteCard>
        </div>

        <!-- 图片容器 -->
        <div class="photo" v-show="$route.meta.wallId === 1">
            <PhotoCard :photo="item" class="photo-card" v-for="(item, index) of photos" :key="index"
                @click="selectPhotoCard(index)"></PhotoCard>
        </div>
        <!-- add 按钮 -->
        <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addMessage">
            <span class="iconfont icon-jia"></span>
        </div>

        <!-- 弹出框 -->
        <div class="flyout">

            <Flyout :title="flyoutTitle">

                <!-- 
                    这是一个空白的新增的卡片内容
                    我们是把这个内容，放到了Flyout组件中
                 -->
                <FlyoutCard v-if="cardSelected === -1 &&wallInfoStore.wallId"></FlyoutCard>
                <FlyoutCardDetail v-else></FlyoutCardDetail>
            </Flyout>
            <!-- 照片弹出层 -->
            <PhotoViewer :isView="wallInfoStore.openFlyout" :photos="photos"></PhotoViewer>
        </div>


    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import Flyout from '@/components/flyout/Flyout.vue';
import { note, photo } from '../../mock/index.js'
import FlyoutCard from '@/components/flyout/FlyoutCard.vue';
import FlyoutCardDetail from '@/components/flyout/FlyoutCardDetail.vue';
import PhotoCard from '../components/PhotoCard.vue';
import { useWallInfoStore } from '@/stores';
import PhotoViewer from '../components/PhotoViewer.vue';

let photos = reactive(photo.data)
const wallInfoStore = useWallInfoStore()
const tagId = ref(-1)
const changeTag = (index) => {
    tagId.value = index
}


/* 留言墙信息 */
const messages = reactive(note.data)    // 获取到的留言信息
const cardSelected = ref(0)             // 被选中的card
wallInfoStore.noteMessage = messages[0] // 先给个默认值
const selectCard = (index) => {

    // 选择卡片的效果 -> 添加一个类
    // 第一次点击
    if (index !== cardSelected.value) {
        cardSelected.value = index
        // 弹出框
        wallInfoStore.openFlyout = true
        flyoutTitle.value = '留言详情'

        // 更新当前选中笔记的信息 -> store 中
        wallInfoStore.noteMessage = messages[index]
    } else {
        // 已经点过一次
        cardSelected.value = -1
        wallInfoStore.openFlyout = false
    }
}

/* 照片墙信息 */
const selectPhotoCard = (index) => {
    console.log(photos)

    if (index !== wallInfoStore.photoIndex) {
        wallInfoStore.openFlyout = true
        flyoutTitle.value = '照片详情'
        // 更新当前选中的照片
        wallInfoStore.photoIndex = index
        wallInfoStore.nodeMessage = photos[index]
    } else {
        wallInfoStore.openFlyout = false
    }
}

/* add 按钮 + 弹窗 */
const addBottom = ref(30)       // 按钮下边距控制
const flyoutTitle = ref('留言详情')
// wallInfoStore.openFlyout      // 弹出框的状态
// 点击添加按钮
const addMessage = () => {
    flyoutTitle.value = '写留言'
    cardSelected.value = -1
    wallInfoStore.openFlyout = true
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

    .add {
        width: 56px;
        height: 56px;
        background: @gray-0;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-jia {
            font-size: 24px;
            color: @gray-4;
        }
    }
}
</style>