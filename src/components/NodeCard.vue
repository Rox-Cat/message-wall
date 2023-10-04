<template>
    <div class="yk-node-card" :style="{ width, background }">
        <div class="header">
            <p class="time">2022-7-12</p>
            <p class="label">留言</p>
        </div>
        <div class="main">
            <p class="message">
                这是一段暖心的话，它或许不长，但是它是我现在最想说的。放在这里就留一个纪念吧，不用回头看，应为现在才是当下最好的。这是一段暖心的话，它或许不长，但是它是我现在最想说的。放在这里就留一个纪念吧。
            </p>
        </div>

        <div class="footer">
            <div class="footer-left">
                <div class="like">
                    <span class="iconfont icon-aixin"></span>
                    <span>12</span>
                </div>
                <div class="comment">
                    <span class="iconfont icon-B-liuyan"></span>
                    <span>12</span>
                </div>

            </div>

            <div class="footer-right">
                <span>我是魏文涛</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    width: {
        default: '288px'
    },
    background: {
        default: 'rgba(252, 175, 162, 0.30)'
    }
})
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
            font-weight: 400;
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
}</style>