<template>
    <div class="form" :class="locale">
        <div class="work-type-tabs flex">
            <label v-if="false">
                <i class="check-box" :class="{active:state.data.type===1}"></i>
                <p>{{$t('form.entityWork')}}</p>
            </label>
            <label>
                <i class="check-box" :class="{active:state.data.type===2}"></i>
                <p>{{$t('form.digitalWork')}}</p>
            </label>
            <label>
                <i class="check-box" :class="{active:state.data.type===3}"></i>
                <p>{{$t('form.nftWork')}}</p>
            </label>
        </div>
    </div>
</template>
<script setup>
import {
    ref,
    onMounted,
    reactive,
    toRefs,
    onBeforeMount,
    nextTick,
    watch
} from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const state = reactive({
    data: {
        type: 1
    }
})
const props = defineProps({})
</script>
<style lang="scss" scoped>
.form {
    width: 778px;
    margin: 73px auto 0;
    > * {
        width: 100%;
    }
    .work-type-tabs {
        font-weight: 700;
        font-size: 20rem;
        line-height: 120%;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.75);
        padding-bottom: 40rem;
        label {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            p {
                margin-left: 8rem;
            }
            &:nth-child(n + 2) {
                margin-left: 40rem;
            }
        }
    }
    .check-box {
        display: block;
        width: 1em;
        height: 1em;
        border: 2rem solid #c4c4c4;
        border-radius: 0.5em;
        transition: border-color 200ms linear, border-width 200ms linear;
        &.active {
            border-width: 0.34em;
            border-color: #1a1a1a;
        }
    }
}
</style>
