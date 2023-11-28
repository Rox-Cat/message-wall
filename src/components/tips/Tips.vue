<template>
    <transition name="down">
        <div class="tips" v-show="isShowTips">
            <div class="tips-content">
                <i class="iconfont" :class="style[tipsType].icon"></i>
                <span class="text">{{ tipsContent }}</span>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWallInfoStore } from '../../stores/index.js'
const wallInfoStore = useWallInfoStore()
const { isShowTips, tipsType, tipsContent } = storeToRefs(wallInfoStore)

const style = {
    warning: {
        icon: "icon-warning"
    },
    error: {
        icon: "icon-error"
    },
    success: {
        icon: "icon-success"
    }
}


</script>

<style lang="less" scoped>
.down {
    &-enter {
        &-from {
            transform: translateY(-30px);
            opacity: 0;
        }

        &-active {
            transition: all 0.3s;
        }

        &-to {
            transform: translateY(0px);
            opacity: 1;
        }
    }

    &-leave {
        &-form {
            transform: translateY(0px);
            opacity: 1;
        }

        &-active {
            transition: all 0.3s;
        }

        &-to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
}

// 提示框的样式
.tips {
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;

    .tips-content {
        padding: 0px 20px;
        border-radius: 6px;
        background-color: @gray-3;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        .iconfont {
            margin-right: 6px;
            vertical-align: middle;
        }

        .text {
            vertical-align: middle;
        }
    }


}

// icon颜色
.icon-success {
    color: @primary-color;

}

.icon-warning {
    color: @warning-color;
}

.icon-error {
    color: @error-color;
}
</style>