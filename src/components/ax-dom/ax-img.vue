<!-- CREATE by WangXinzhao at 2022/7/11 15:18 -->
<script setup>
/*
* props:
* src:img url
* initHeight: 初始高度
* */
import {ref, onMounted,getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance()
const showImg = ref(false);
const showLoading = ref(true);
// const imgBox = ref();
const imgObj = ref();
const props = defineProps({
  src:{
    type:String,
  },
  initHeight:{
    type:String,
    default:'100%'
  },
  callback:false,
});
const imgHeight = ref(0)
const loadImg = ()=>{
  if(!props.src){return false;}
  let imgSize=(imgObj.value).getBoundingClientRect()
  proxy.$emit('callback',{
    width:imgSize.width,
    height: imgSize.height
  })
  imgHeight.value = imgSize.height+'px'
  setTimeout(()=>{
    showImg.value = true;
    setTimeout(()=>{
      showLoading.value = false;
    },150)
  },50)
}
onMounted(() => {
  imgHeight.value = props.initHeight;
  // console.log(imgBox.value.getBoundingClientRect())
  // console.log(imgBox.value)
})
</script>


<template>
  <div class="ax-img" ref="imgBox" :class="{loading:showLoading===true}" :style="{height:imgHeight}">
    <img :src="src" ref="imgObj" :class="{show:showImg===true}" @load="loadImg">
  </div>
</template>

<style lang="scss" scoped>
.ax-img {
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    display: block;
    padding: 0;
    margin: 0;
    height: initial;
    position: relative;
    z-index: 3;
    opacity: .01;
    &.show{
      opacity: 1;
      transition: opacity 200ms linear;
    }
  }

  &::before,&::after{
    display: none;
  }
  &.loading{
    transition: none;
    &::before,&::after{
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left:0;
      top:0;
    }
    &::before{
      z-index: 1;
      background: rgba(0,0,0,.5);
    }
    &::after{
      width: 3rem;
      height: 120%;
      z-index: 2;
      transform: rotate(10deg) translateX(0);
      background: linear-gradient(to right,transparent 0,rgba(255,255,255,.1) 50%,transparent 100%);
      top:-10%;
      left:calc(50% - 1.5rem);
      animation: loadLight 2000ms steps(60) infinite;
      @keyframes loadLight {
        0%{
          transform: rotate(10deg) translateX(-10rem);
        }
        100%{
          transform: rotate(10deg) translateX(10rem);
        }
      }
    }
  }

}
</style>
