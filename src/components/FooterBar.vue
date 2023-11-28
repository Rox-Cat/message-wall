<template>
    <div class="footer-bar">
        <div class="infomation">
            <div class="logo">
                <img src="@/assets/images/favicon.ico" alt="">
                <span>Rox7的留言墙</span>
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
            <div class="money-img">
                <div class="wechat">
                    <img src="src/assets/images/wechat.webp">
                    <p>微信</p>
                </div>

                <div class="alipay">
                    <img src="src/assets/images/alipay.webp">
                    <p>支付宝</p>
                </div>
            </div>
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
    margin-top: 40px;

    .infomation {
        .logo {
            color: @gray-4;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 24px;

            img {
                height: 25px;
            }

            span {
                margin-left: 10px;
                font-size: @size-20;
                font-weight: 600;
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
                // opacity: 0.5;  // 这里使用opacity会有bug，可能是和css中filter的效果有冲突
                font-size: @size-12;
                color: @gray-2;
                letter-spacing: 0;
                text-align: justify;
                font-weight: 400;
                margin-right: 20px;
            }

        }

    }

    .money {
        width: 300px;
        color: @gray-2;

        .title {
            font-size: @size-16;
            color: @gray-4;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .money-img {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 120px;
            }

            p {
                font-size: @size-16;
                display: inline-block;
                vertical-align: middle;

            }
        }
    }
}
</style>