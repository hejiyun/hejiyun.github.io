<!-- CREATE by WangXinzhao at 2023/3/6 18:21 -->
<template>
    <a class="social-share" target="_blank" :href="`https://twitter.com/intent/tweet?text=${state.text}&url=${state.urlString}`">
        <slot></slot>
    </a>
</template>
<script setup>
import {ref, onMounted, reactive, watch, toRefs} from 'vue';
const state = reactive({
    // text:encodeURIComponent(
    //     'Like or not? Earn by art! I got $HNX token as a reward for my aesthetics in HeartX. Let’s click below link to participate in HeartX Vote-To-Earn event! '
    //     ).replace(/%20/g,'+'),
    text:encodeURIComponent(props.txt).replace(/%20/g,'+'),
    urlString:'',
    url:new URL(location.origin + '/event/index.html'),
    search:new URLSearchParams(),
});

const props = defineProps({pfid:String,txt:String})
console.log(props.pfid);
const params = new URLSearchParams( location.search );
params.get('version')
    ? state.search.set('version',params.get('version'))
    : state.search.delete('version');

const setSearch = () => {
    props.pfid
        ? state.search.set('invite_pfid',props.pfid)
        : state.search.delete('invite_pfid');
    state.url.search = state.search.toString();
    state.urlString = encodeURIComponent(state.url.href)
}
onMounted(setSearch);
watch(()=>props.pfid, setSearch, {deep:true})
</script>
<style lang="scss" scoped>
</style>
