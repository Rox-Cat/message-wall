<template>
    <div class="wall-message">
        <p class="title">{{ wallType[wallId].title }}</p>
        <p class="slogon">{{ wallType[wallId].slogan }}</p>
        <div class="tags">
            <p class="tag-list" :class="{ 'tag-selected': tagId === -1 }" @click="changeTag(-1)">全部</p>
            <p class="tag-list" :class="{ 'tag-selected': tagId === index }" v-for="(tag, index) of tagType[wallId]"
                :key="index" @click="changeTag(index)">
                {{ tag }}
            </p>
        </div>

        <!-- 卡片容器 -->
        <div class="card">
            <NodeCard></NodeCard>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import NodeCard from '@/components/NodeCard.vue'

const wallType = reactive([
    {
        title: '留言墙',
        slogan: '很多事情值得记录，当然也值得回味。'
    },
    {
        title: '照片墙',
        slogan: '很多事情值得记录，当然也值得回味。'
    }
])
const tagType = reactive([
    ['留言', '目标', '理想', '过去', '未来', '爱情', '亲情', '友情', '秘密', '信条', '无题'],
    ['我', 'ta', '喜欢的', '有意义的', '值得纪念的', '母校', '生活', '天空', '我在的城市', '大海', '无题']
])
const wallId = ref(0)
const tagId = ref(-1)
const changeTag = (index) => {
    tagId.value = index
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
}
</style>