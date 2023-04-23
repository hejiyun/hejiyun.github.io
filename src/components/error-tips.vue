<!-- CREATE by WangXinzhao at 2022/9/20 11:45 -->
<template>
  <div class="error-tips">
    <div><i></i><p><slot></slot></p></div>
  </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'

onMounted(() => {
})
</script>
<style lang="scss" scoped>
.error-tips{
  position: relative;
  font-size: 14px;
  color: #EA415A;
  line-height: 120%;
  >div{
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    left:0;
    top:8px;
  }
  p{
    flex-shrink: 0;
    flex-grow: 1;
  }
  i{
    flex-shrink: 0;
    flex-grow: 1;
    display: block;
    width: 1em;
    height: 1em;
    margin-right: 4px;
    position: relative;
    border-radius: .5em;
    background: currentColor;
    &::before,&::after{
      content: "";
      display: block;
      position: absolute;
      left:.45em;
      width: .1em;
      background: #FFF;
      border-radius: .1em;
    }
    &::before{
      top: .2em;
      height: .375em;
    }
    &::after{
      top: .6642857em;
      height: .1em;
    }
  }
}
</style>
