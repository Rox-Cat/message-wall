<template>
    <div class="yk-node-card" :style="{ width, background: cardColor[noteMessage.color] }">
        <div class="header">
            <p class="time">{{ noteMessage.monment }}</p>
            <p class="tag">{{ tagsType[$route.meta.wallId][noteMessage.label] }}</p>
        </div>
        <div class="main" @click="$emit('showDetail')">
            <p class="message">
                {{ noteMessage.message }}
            </p>
        </div>

        <div class="footer">
            <div class="footer-left">
                <div class="like">
                    <span class="iconfont icon-aixin" :class="{ islike: noteMessage.isLike[0].count > 0 }"
                        @click="addLike"></span>
                    <span>{{ noteMessage.like[0].count }}</span>
                </div>
                <div class="comment">
                    <span class="iconfont icon-B-liuyan"></span>
                    <span>{{ noteMessage.commontCount[0].count }}</span>
                </div>

            </div>

            <div class="footer-right">
                <span>{{ noteMessage.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { tagsType } from '@/utils/wallBasicInfo.js'
import { insertFeedback } from '@/api/index.js'
import { useUserInfoStore } from '../stores/index.js';
const userInfoStore = useUserInfoStore()
const props = defineProps({
    width: {
        default: '100%'
    },
    background: {
        default: 'rgba(252, 175, 162, 0.30)'
    },
    noteMessage: {
        default: {}
    },
})
// const emit = defineEmits(['showDetail'])
const cardColor = [
    "rgba(252,175,162,0.50)",
    "rgba(255,227,148,0.50)",
    "rgba(146,230,245,0.50)",
    "rgba(168,237,138,0.50)",
    "rgba(202,167,247,0.50)"
]

// 添加一条喜欢
const addLike = () => {
    if (props.noteMessage.isLike[0].count === 0) {
        insertFeedback({
            wallId: props.noteMessage.id, // 这里的id是noteMessage.id不是留言墙的id
            userId: userInfoStore.userId,
            type: 0,
            moment: new Date()
        }).then(res => {
            if (res.status === 200) {
                props.noteMessage.like[0].count++
                props.noteMessage.isLike[0].count++
            }
            
        })
    }
}
</script>

<style lang="less" scoped>
.yk-node-card {
    height: 240px;
    padding: 10px 20px;
    box-sizing: border-box;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            font-size: @size-12;
            color: @gray-2;
        }
    }

    .main {
        padding: 19px 0px;

        .message {
            height: 140px;
            font-family: HanziPenSC-W3;
            font-size: 14px;
            color: @gray-0;
            text-align: justify;
            line-height: 22px;
            font-weight: 500;
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;

        span {
            height: 16px;
            font-size: @size-14;
            color: @gray-1;
            text-align: justify;
            line-height: 16px;
            margin-right: 4px;
        }

        .footer-left {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .like {
                padding-right: 10px;

                .icon-aixin {
                    cursor: pointer;
                    transition: @tr;

                    &:hover {
                        color: @like-color;
                    }
                }

                .islike {
                    color: @like-color;
                }
            }

            .comment {
                .icon-B-liuyan {
                    cursor: pointer;
                    transition: @tr;

                    &:hover {
                        color: @primary-color;
                    }
                }
            }
        }




    }
}
</style>