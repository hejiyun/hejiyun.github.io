<template>
    <div class="title">
        {{props.text}}
    </div>
</template>
<script setup>
const props = defineProps({
    text: String
})
</script>
<style lang="scss" scoped>
.title {
    font-style: italic;
    font-weight: 900;
    font-size: 45px;
    line-height: 57px;
    color: rgba(0, 0, 0, 0.75);
    text-align: center;
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
        font-size: 39px;
        /* line-height: 40px; */
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .title {
        font-size: 33px;
        /* line-height: 45px; */
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .title {
        font-size: 32px;
        line-height: 37px;
        text-fill-color: transparent;
    }
}
</style>
