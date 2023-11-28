<template>
    <div class="yk-photo-card">
        <img :src="photo.imgUrl" class="photo-img">

        <!-- 背景层 -->
        <div class="photo-bg">

        </div>
        <div class="photo-like">
            <span class="iconfont icon-aixin" :class="{ islike: photo.isLike[0].count > 0 }"
                @click.stop="addLike"></span>
            <span class="like-data">{{ photo.like[0].count }}</span>
        </div>
    </div>
</template>

<script setup>
import { insertFeedback } from '@/api/index.js'
import { useUserInfoStore } from '../stores/index.js';
const userInfoStore = useUserInfoStore()
// 这里的photo其实就是noteMessage
const props = defineProps(['photo'])
const addLike = () => {
    if (props.photo.isLike[0].count === 0) {
        insertFeedback({
            wallId: props.photo.id, // 这里的id是photo.id不是留言墙的id
            userId: userInfoStore.userId,
            type: 0,
            moment: new Date().toLocaleString()
        }).then(res => {
            if (res.status === 200) {
                props.photo.like[0].count++
                props.photo.isLike[0].count++
            }

        })
    }
}
</script>

<style lang="less" scoped>
.yk-photo-card {
    position: relative;

    .photo-img {
        width: 100%;
        transition: all 0.3s;
    }

    .photo-like {
        position: absolute;
        left: @padding-8;
        top: @padding-8;
        background-color: @gray-3;
        border-radius: 20px;
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: @tr;

        .icon-aixin {
            color: @gray-1;
            padding-right: 4px;
            cursor: pointer;

            &:hover {
                color: red;
            }

        }

        .islike {
            color: @like-color;
        }

        .like-data {
            color: @gray-1;
        }
    }

    &:hover {
        .photo-img {
            transform: scale(1.02);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
        }

    }
}</style>