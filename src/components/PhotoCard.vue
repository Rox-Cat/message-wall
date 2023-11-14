<template>
    <div class="yk-photo-card">
        <img :src="'src/assets/images/photoWall/' + photo.imgUrl + '.jpg'" class="photo-img">

        <!-- 背景层 -->
        <div class="photo-bg">

        </div>
        <div class="photo-like">
            <span class="iconfont icon-aixin"></span>
            <span class="like-data">{{ photo.like }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['photo'])
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

        .like-data {
            color: @gray-1;
        }
    }

    &:hover {
        .photo-img{
            transform: scale(1.02);
            box-shadow:0 0 10px 0 rgba(0,0,0,.5);
        }

    }
}
</style>