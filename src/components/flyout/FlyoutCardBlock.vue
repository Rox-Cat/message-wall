<template>
    <div class="flyout-card">
        <div class="flyout-wirte-message">

            <!-- 颜色块展示 -->
            <div class="colors" v-if="$route.meta.wallId === 0">
                <div class="color-box" v-for="(color, index) of cardColors" :key="index" :style="{ backgroundColor: color }"
                    :class="{ 'color-selected': index === selectedColorIndex }" @click="selectedColorIndex = index">
                </div>
            </div>

            <!-- 照片 -->
            <div class="add-photo" v-if="$route.meta.wallId === 1">
                <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto">

                <!-- 图片URL不存在，显示添加按钮 -->
                <div class="add-bt" v-show="!imgUrl">
                    <div class="add-img">
                        <span class="iconfont icon-jia"></span>
                    </div>
                    <div class="tips">请添加图片~</div>
                </div>

                <!-- 图片URL存在，显示修改按钮 -->
                <div class="change-bt" v-show="imgUrl">
                    <span class="iconfont icon-shibai"></span>
                </div>

                <div class="photo-div">
                    <img :src="imgUrl">
                </div>
            </div>
            <!-- 写留言区域 -->
            <div class="flyout-message"
                :style="{ background: $route.meta.wallId === 0 ? cardColors[selectedColorIndex] : cardColors[0] }">
                <textarea v-model="message" class="message" placeholder="请留言:" maxlength="96"></textarea>
                <input v-model="name" class="name" placeholder="请签名:">
            </div>

            <!-- 选择标签 -->
            <div class="flyout-tags">
                <p class="title">选择标签</p>
                <div class="tag-list">
                    <span v-for="(tag, index) of $route.meta.tagsType" :key="index" class="tag"
                        :class="{ 'tag-selected': index === tagSelectedIndex }" @click="tagSelectedIndex = index">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <!-- 免责声明 -->
        <div class="flyout-statement">
            <p class="title">免责声明</p>
            <p class="statement">
                一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
                1、反对宪法所确定的基本原则的；<br />
                2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br />
                3、损害国家荣誉和利益的；<br />
                4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
                5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
                6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
                7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
                8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
                9、含有法律、行政法规禁止的其他内容的信息。<br />
            </p>
        </div>

        <!-- 确认取消按钮 -->
        <div class="flyout-button">
            <YKButton size="max" nom="secondary" class="cancel" @click="wallInfoStore.openFlyout = false">
                丢弃</YKButton>
            <YKButton size="max" class="submit" @click="submit">确定</YKButton>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useWallInfoStore, useUserInfoStore } from '@/stores';
import { useRoute } from 'vue-router'
import { reqInsertWall, reqUploadPhoto } from '../../api';
import YKButton from '@/components/YKButton.vue'

/* 公共信息 */
const wallInfoStore = useWallInfoStore()
const userInfoStore = useUserInfoStore()
const route = useRoute()

/* 弹出框共用的变量 */
const tagSelectedIndex = ref(0) // 选中的标签


/* 留言墙的基本信息 */
const selectedColorIndex = ref(0)   // 当前选择的颜色
const cardColors = wallInfoStore.cardColors  // 全局不变的变两个，这样使用行吗？ 应该可以，变的呢？
const message = ref('')  // 具体的留言信息
const name = ref('')     // 用户名称


/* 图片墙相关 */
let imgUrl = ref('')
let imgFile = reactive({})
const showPhoto = (e) => {
    imgFile = e.target.files[0]
    imgUrl.value = window.URL.createObjectURL(imgFile)
}


/* 提交按钮 */
const submit = async () => {
    if (route.meta.wallId === 1) {
        imgUrl.value = import.meta.env.VITE_BASE_URL + await uploadPhoto()
    }

    const data = {
        type: route.meta.wallId, // 存疑
        message: message.value,
        name: name.value,
        userId: userInfoStore.userId,
        moment: new Date(),
        label: tagSelectedIndex.value,
        color: selectedColorIndex.value,
        imgUrl: imgUrl.value,
    }
    if (message.value !== "" && route.meta.wallId === 0) {
        reqInsertWall(data).then(res => {
            // 更新allCardMessages
            wallInfoStore.addNoteMessage(res.message)
            wallInfoStore.showTips('success', '添加留言成功')
        })
    } else if (imgUrl.value !== "" && route.meta.wallId === 1) {
        reqInsertWall(data).then(res => {
            // 更新allCardMessages
            wallInfoStore.addNoteMessage(res.message)
            wallInfoStore.showTips('success', '添加照片成功')
        })
    }
}
const uploadPhoto = async () => {
    const data = new FormData()
    data.append('photo', imgFile)
    return reqUploadPhoto(data).then(res => res.message)
}
</script>

<style lang="less" scoped>
.flyout-card {
    padding: 0 @padding-20 120px @padding-20;

    .title {
        font-size: @size-14;
        color: @gray-0;
        text-align: justify;
        font-weight: 600;
        padding-top: 30px;
    }

    .flyout-wirte-message {

        .colors {
            display: flex;
            align-items: center;

            .color-box {
                width: 24px;
                height: 24px;
                margin-right: 8px;
                cursor: pointer;

            }

            .color-selected {
                border: 1px solid rgba(59, 115, 240, 1);
            }
        }

        .add-photo {
            padding-bottom: 20px;
            position: relative;

            #file {
                position: absolute;
                z-index: 10;
                top: -10px;
                height: 74px;
                width: 64px;
                opacity: 0;
                cursor: pointer;
            }

            .add-bt {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .add-img {
                    width: 64px;
                    height: 64px;
                    border: 1px solid @gray-2;
                    border-radius: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    .icon-jia {
                        font-size: 24px;
                        color: @gray-2;
                    }
                }

                .tips {
                    width: 150px;
                    color: @gray-2;
                }

            }
        }

        .change-bt {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-shibai {
                color: @gray-3;
                font-size: 30px;
            }
        }

        .photo-div {
            max-height: 200px;
            width: 100%;
            background-color: #333;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
        }

        .flyout-message {
            box-sizing: border-box;
            margin-top: 12px;
            padding: @padding-12;
            width: 320px;
            height: 240px;
            transition: @tr; // 动画

            .message {
                box-sizing: border-box;
                padding: @padding-8;
                background: none;
                border: none;
                resize: none;
                height: 172px;
                width: 100%;
                color: gray-1;
            }

            .name {
                box-sizing: border-box;
                height: 36px;
                width: 100%;
                padding: @padding-8;
                background: none;
                border: none;
                resize: none;
                color: @gray-0;
                line-height: 20px;
            }
        }

        .flyout-tags {


            .tag-list {
                display: flex;
                flex-wrap: wrap;
                width: 320;

                .tag {
                    padding: 2px 10px;
                    margin: 16px 4px 0 0;
                    font-size: 14px;
                    cursor: pointer;
                    transition: @tr;
                }

                .tag-selected {
                    background: #EBEBEB;
                    border-radius: 14px;
                    font-weight: 600;
                }
            }
        }
    }

    .flyout-statement {
        .statement {
            padding-top: 10px;
            font-size: 10px;
            color: @gray-2;
            text-align: justify;
            line-height: 18px;
            font-weight: 400;
        }
    }

    .flyout-button {
        padding: @padding-20;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 52px;
        background-color: @gray-3;
        width: 100%;

        .cancel {
            cursor: pointer;
        }

        .submit {
            margin-left: 20px;
            width: 200px;
            cursor: pointer;
        }

    }
}
</style>