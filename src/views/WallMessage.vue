<template>
    <div class="wall-message">
        <p class="title">{{ wallType[wallInfoStore.wallId].title }}</p>
        <p class="slogon">{{ wallType[wallInfoStore.wallId].slogan }}</p>
        <div class="tags">
            <p class="tag-list" :class="{ 'tag-selected': tagId === -1 }" @click="changeTag(-1)">全部</p>
            <p class="tag-list" :class="{ 'tag-selected': tagId === index }"
                v-for="(tag, index) of tagsType[wallInfoStore.wallId]" :key="index" @click="changeTag(index)">
                {{ tag }}
            </p>
        </div>

        <!-- 卡片容器 -->
        <div class="card">
            <NoteCard v-for="(message, index) of messages" :tagsType="tagsType" :key="index" :noteMessage="message"
                :wallId="wallInfoStore.wallId" class="card-item" width="288px">
            </NoteCard>
        </div>

        <!-- add 按钮 -->
        <div class="add" :style="{ bottom: addBottom + 'px' }" @click="wallInfoStore.openFlyout = true">
            <span class="iconfont icon-jia"></span>
        </div>

        <!-- 弹出框 -->
        <div class="flyout">
            <Flyout :title="wallType[wallInfoStore.wallId].title" :isFlyout="isFlyout">
                <slot>
                    <FlyoutCard></FlyoutCard>
                </slot>
            </Flyout>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import Flyout from '@/components/flyout/Flyout.vue';
import { note } from '../../mock/index.js'
import FlyoutCard from '@/components/flyout/FlyoutCard.vue';
import { useWallInfoStore } from '@/stores';
import { wallType, tagsType } from '@/utils/wallBasicInfo'


const wallInfoStore = useWallInfoStore()

const tagId = ref(-1)
const changeTag = (index) => {
    tagId.value = index
}


/* 留言墙数据 */
const messages = reactive(note.data)

/* add 按钮 + 弹窗 */
const addBottom = ref(30)
const isFlyout = ref(true)
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