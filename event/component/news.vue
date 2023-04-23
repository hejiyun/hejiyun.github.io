<template>
    <div class="news" >
        <a
            :class="`airBubble${index}`"
            v-for="(item, index) in state.newsList"
            :key="index"
            :href="item.url"
            target="_blank"
            :ref="setRef"
            @mouseover.stop="item.progress > .06 && item.progress < 0.94 && (state.isMouseOver = true)"
            @mouseout.stop="item.progress > .06 && item.progress < 0.94 && (state.isMouseOver = false)"
            @mouseenter.stop="item.progress > .06 && item.progress < 0.94 && (state.isMouseOver = true)"
            @mouseleave.stop="item.progress > .06 && item.progress < 0.94 && (state.isMouseOver = false)"
        >{{item.title}}</a>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import {ref, reactive, toRefs, onMounted, onBeforeMount, onUnmounted, watch, onUpdated,} from 'vue'
import {useEvent} from "../store/event.js"
const useEventStore = useEvent()
const {eventData} = storeToRefs(useEventStore);
const airBubbleList = [];
const setRef = (el)=> {
    airBubbleList.push(el)
};
    const state = reactive({
    setting:{
        size:{//最大尺寸
            x:40,
            y:180
        },
        unit:"rem",//size的尺寸单位
        duration:3000,//单个item动画时长,单位ms
        step:1000,//两个item 间的时间间隔,单位ms,
        fps:25, // 刷新速度，值越小，视觉效果越好，性能消耗越大，值越大，视觉效果越差，性能消耗越小，单位ms
    },
    isMouseOver:false,
    newsList:[],
    tapIndex:0, //龙头序号
});

const props = defineProps(['setting'])
const setStyle = (index, _progress) => {
    // console.log()
    let _style='';
    if(_progress!==0){
        //设置透明度
        let opacity = parseFloat(((_progress > 0.5 ? 1 - _progress :_progress) / 0.3).toFixed(2));
        opacity > 1 && (opacity = 1);
        //设置纵坐标
        let Y = parseFloat((-_progress * state.setting.size.y).toFixed(6)) + state.setting.unit;
        //设置横坐标
        let X = parseFloat((Math.sin(Math.PI * _progress) * state.setting.size.x).toFixed(6)) + state.setting.unit;
        _style = `opacity:${opacity};transform:translate(${X},${Y});`
    }
    airBubbleList[index].setAttribute('style',`z-index:${index};${_style}`)
}

const setProgress = (_progress) => {//设置进度值 0-1
    _progress = ((_progress===undefined ? 0 : _progress) + state.setting.fps / state.setting.duration);
    _progress >= 1 && (_progress = 0);
    return _progress;
}

const setItemsProgress = () => {
    for(let i=0;i<state.newsList.length;i++){
        //从龙头开始设置进度
        let _index = ( state.tapIndex+i ) % state.newsList.length;
        state.newsList[_index].progress = setProgress(state.newsList[_index].progress);
        setStyle(_index, state.newsList[_index].progress);//设置样式

        if(state.newsList[_index].progress < state.setting.step / state.setting.duration){
            break;
        }
    }
    if(state.newsList[state.tapIndex].progress===0){//重设龙头ID
        state.tapIndex = (state.tapIndex+1) % state.newsList.length;
    }
}

window.newsPlayID=0;window.newsPreFrameTimer=0;
const play = () => {
    cancelAnimationFrame(window.newsPlayID);
    if(!state.isMouseOver){
        let _t = Date.now();
        if(_t - window.newsPreFrameTimer >= state.setting.fps ){
            window.newsPreFrameTimer = _t;
            setItemsProgress();
        }
    }
    window.newsPlayID = requestAnimationFrame(play)
}
onUpdated(()=>{
    console.log(123451)
})
watch(()=>props.setting,(n,o)=>{
    state.setting = n
},{ deep: true })

onBeforeMount(()=>{
    if(!!props.setting){state.setting = props.setting;}
    window.newsPlayID && cancelAnimationFrame(window.newsPlayID);

    if(eventData.value.news.length>2){
        //解决新闻条数不够，时间间隔过长问题
        let loop = ~~(7/eventData.value.news.length);

        for(let i=0;i<loop;i++){
            state.newsList = state.newsList.concat(JSON.parse(JSON.stringify(eventData.value.news)))
        }
    } else {
        state.newsList = eventData.value.news
    }

    
})
onMounted(()=>{
    // cancelAnimationFrame();
    // console.log(state.tapIndex)
    play();
})
onUnmounted(()=>{
    window.newsPlayID && cancelAnimationFrame(window.newsPlayID);
})

</script>

<style lang="scss">
@keyframes fadein {
    0%{
        transform: translate(0rem, 0rem);
        opacity: 0;
    }

    50%{
        transform: translate(40rem, -50rem);
        opacity: 1;
    }

    100%{
        transform: translate(0rem, -100rem);
        opacity: 0;
    }

}


.news{
    position: absolute;
    left: 10rem;
    bottom: 10%;

    a{
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 0 10rem;
        min-width: 200rem;
        max-width: 268rem;
        z-index: 1;
        height: 50rem;
        line-height: 50rem;
        color: rgba(255, 255, 255, 0.75);
        text-align: center;
        font-size: 15rem;
        border-radius: 30rem;
        border: 1rem solid transparent;
        background-clip: padding-box, border-box !important;
        background-origin: padding-box, border-box !important;
        background-image: linear-gradient(to right, #000, #000), linear-gradient(90deg, #F365AC, #3BDECD) !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        opacity: 0;
    }
}

@media only screen and (max-width: 1600px) {
    .news{
    
        a{
            min-width: 180rem;
            max-width: 215rem;
            z-index: 1;
            height: 45rem;
            line-height: 45rem;
            font-size: 12rem;
        }
    }
}

 </style>
