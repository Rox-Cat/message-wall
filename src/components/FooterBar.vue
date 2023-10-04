<template>
    <div class="footer-bar">
        <div class="infomation">
            <div class="logo">
                <img src="@/assets/images/favicon.ico" alt="">
                <span>一刻时光</span>
            </div>

            <div class="logo-info">
                <p>一刻时光是本人独自开发的，为便于与用户交流的留言平台.</p>
                <p>用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录. </p>
            </div>

            <div class="statement">
                <p>声明</p>
                <p>备案/许可证</p>
                <p>网站备案/许可证</p>
            </div>
        </div>

        <div class="link">
            <p class="link-title">链接</p>
            <div class="link-location">
                <p>友情链接</p>
                <p>友情链接</p>
            </div>

        </div>

        <div class="money">
            <p class="title">打赏</p>
            <div class="money-img"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.footer-bar {
    width: 100%;
    height: 200px;
    background: @gray-0;
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
    .infomation {
        .logo {
            color: @gray-4;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 24px;

            span {
                font-size: @size-20;
            }
        }

        .logo-info {
            max-width: 300px;
            color: @gray-2;
            font-size: @size-12;
            margin-bottom: 30px;
            white-space: pre-wrap;
        }

        .statement {
            display: flex;
            justify-content: flex-start;
            color: @gray-2;

            p {
                font-size: @size-12;
                margin-right: 20px;
            }
        }
    }

    .link {
        min-width: 200px;
        .link-title {
            width: 32px;
            height: 22px;
            opacity: 0.5;
            font-size: @size-16;
            color: @gray-4;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .link-location {
            display: flex;

            p {
                width: 48px;
                height: 17px;
                opacity: 0.5;
                font-size: @size-12;
                color: @gray-4;
                letter-spacing: 0;
                text-align: justify;
                font-weight: 400;
                margin-right: 20px;
            }

        }

    }

    .money{
        width: 300px;

        .title{
            font-size: @size-16;
            color: @gray-2;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
            margin-bottom: 10px;
        }
    }
}
</style>