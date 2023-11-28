<template>
    <button :class="[size, nom]" class="yk-button">
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    size: {
        default: 'base',
    },
    nom: {
        default: 'primary'
    }
})
</script>

<style lang="less" scoped>
.yk-button {
    text-align: center;  // 文字居中
    border: 0;
    
}

// size 样式，设置按钮的尺寸
.max {
    min-width: 100px;
    height: 48px;
    border-radius: 24px;
    padding: 0 24px;
}

.base {
    min-width: 80px;
    height: 36px;
    border-radius: 24px;
    padding: 0 20px;
}

.small {
    min-width: 72px;
    height: 32px;
    border-radius: 24px;
    padding: 0 20px;
}

// 按钮的样式：背景 + 字体
// 黑白配，primary: 被选中， secondary: 未选中
.primary{
    background: @gray-0;
    color: @gray-4;
}

.secondary{
    background: @gray-4;
    color: @gray-0;
    border: 1px solid @gray-0;
}

// 蓝白配 cprimary: 被选中， csecondary: 未选中
.cprimary {
    background: @primary-color;
    color: @gray-4;
    font-weight: 600;
}

.csecondary {
    background: @gray-4;
    color: @gray-1;
} 
.notAllowed {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>