<template>
    <div class="title">
        {{props.firstLine}}
        <template v-if="props.secondLine">
            <br class="pc-only">{{props.secondLine}}
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    firstLine: String, // 一行文字
    secondLine: String // 第二行文字
})
</script>
<style lang="scss" scoped>
.title {
    font-style: italic;
    font-weight: 900;
    font-size: 75px;
    line-height: 75px;
    text-align: center;
    background: linear-gradient(180deg, #000000 0%, #757575 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 8px 0;
}
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
}
@media only screen and (max-width: 1024px) {
    // md
    .title {
        font-size: 65px;
        line-height: 65px;
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .pc-only {
        display: none;
    }
    .title {
        font-size: 55px;
        line-height: 55px;
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .title {
        font-size: 32px;
        line-height: 37px;
    }
}
</style>
