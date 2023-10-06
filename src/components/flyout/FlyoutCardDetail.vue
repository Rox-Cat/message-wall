<template>
    <div class="yk-card-detail">

        <!-- 卡片信息 -->
        <div class="main">
            <NoteCard :noteMessage="wallInfoStore.noteMessage"></NoteCard>
        </div>

        <!-- 书写评论 -->
        <div class="form">
            <textarea placeholder="请输入评论..." class="message" maxlength="96"></textarea>
            <div class="name-comment">
                <input type="text" placeholder="签名..." class="name">
                <YKButton>评论</YKButton>
            </div>
        </div>

        <!-- 展示评论 -->

        <div class="comment">
            <div class="title">评论 {{ wallInfoStore.noteMessage.comment }}</div>
            <div class="comment-item" v-for="(item, index) of cardComment.data" :key="index">
                <div class="item-left user-avatar" 
                    :style="{background: availableColors[item.imgUrl]}">
                </div>
                <div class="item-right">
                    <div class="username-time">
                        <p class="username">{{ item.name }}</p>
                        <p class="time">{{ item.monment }}</p>
                    </div>
                    <div class="comment-context">
                        {{ item.message }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import NoteCard from '../NoteCard.vue'
import YKButton from '@/components/YKButton.vue'
import { useWallInfoStore } from '@/stores';
import { availableColors } from '@/utils/wallBasicInfo.js'
import { cardComment } from '../../../mock/index.js'
const wallInfoStore = useWallInfoStore()


</script>

<style lang="less" scoped>
.yk-card-detail {
    padding: 0 @padding-20;

    .form {
        margin-top: 12px;

        .message {
            box-sizing: border-box;
            height: 56px;
            width: 100%;
            padding: @padding-8;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            color: gray-1;
        }

        .name-comment {
            display: flex;
            justify-content: space-between;
            padding-top: @padding-8;

            .name {
                box-sizing: border-box;
                width: 200px;
                height: 36px;
                padding: @padding-8;
                background: none;
                border: 1px solid rgba(148, 148, 148, 1);
                resize: none;
                color: @gray-0;
                line-height: 20px;
            }
        }


    }

    .comment {
        margin-top: 30px;
        .title {
            width: 56px;
            height: 20px;
            font-size: 14px;
            color: #202020;
            text-align: justify;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .comment-item {
            display: flex;
            justify-content: space-between;
            padding-bottom: 30px;
            .user-avatar {
                flex: none;
                width: 28px;
                height: 28px;
                border-radius: 20px;
                overflow: hidden;
            }

            .item-right {
                padding-left: @padding-20;

                .username-time {
                    display: flex;
                    align-items: center;

                    .username {
                        font-size: @size-16;
                        color: @gray-0;
                        letter-spacing: 0;
                        text-align: justify;
                        font-weight: 600;
                    }

                    .time {
                        font-size: @size-12;
                        padding-left: @padding-8;
                        color: @gray-2
                    }
                }

                .comment-context {
                    padding-top: @padding-4;
                    font-size: 14px;
                    color: #202020;
                    letter-spacing: 0;
                    text-align: justify;
                    line-height: 22px;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>