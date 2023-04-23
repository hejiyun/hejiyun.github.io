<script setup>
import { ref,onMounted} from 'vue'
const btnRad = ref(0),
  strokeWidth=ref(''),
  btn=ref({}),
  btnWH=ref(false);
const fixNumber = (oriNum)=>{
  return parseFloat(oriNum.toFixed(6))
}
const calceSize = ()=>{
  var pageWidth = document.querySelector('#app').getBoundingClientRect().width;
  btnWH.value = btn.value.getBoundingClientRect();
  btnRad.value= fixNumber(pageWidth * .02133333) + 'px';
  strokeWidth.value =fixNumber(pageWidth * .006) + 'px';
}
window.addEventListener('resize',calceSize);
onMounted(()=>{
  calceSize()
})
</script>
<template>
  <button ref="btn">
    <span><slot></slot></span>
    <svg v-if="btnWH" width="100%" height="100%" :viewBox="`0 0 ${btnWH.width} ${btnWH.height}`" fill="none">
      <defs>
        <linearGradient id="MyGradient">
          <stop offset="0%"  stop-color="#F365AC"/>
          <stop offset="100%" stop-color="#3BDECD"/>
        </linearGradient>
      </defs>
      <rect :rx="btnRad" :ry="btnRad" width="100%" height="100%" stroke="url(#MyGradient)" :stroke-width="strokeWidth"></rect>
    </svg>
  </button>
</template>
<style lang="scss" scoped>
button{
  margin:0;
  position: relative;
  width: 100%;
  padding:0 40px;
  height: 80px;
  font-size: 32px;
  font-weight: 800;
  white-space: nowrap;
  border:0;
  border-radius: 16px;
  background: linear-gradient(284.5deg, #3BDECD 14.8%, #F365AC 89.72%);;
  overflow: hidden;
  svg{
    display: none;
    position: absolute;
    left:0;
    top:0;
    z-index: 1;
  }
  span{
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 48px;
    color: #FFF;
    >*{
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
  &.big,&.large{
    height: 92px;
    font-size: 36px;
    span{
      line-height: 48px;
    }
  }
  &.small,&.s{
    height: 66px;
    font-size: 28px;
    span{
      line-height: 44px;
    }
  }
  &.min,&.xs{
    height: 60px;
    font-size: 24px;
    span{
      line-height: 44px;
    }
  }
  &.xxs{
    height: 52px;
    font-size: 24px;
    span{
      line-height: 44px;
    }
  }

  &.gray,&.grey{
    background: #C4C4C4;
  }
  &.line-border,&.line-border.gray,&.line-border.grey{
    font-weight: 500;
    background: none;
    span{
      color: rgba(0,0,0,.75);
    }
    svg{
      display: block;
    }
  }
  &.line-border.gray,&.line-border.grey{
    svg{
      border:3px solid rgba(219,219,219,.8);
      border-radius: 0.213333rem;
      rect{
        display: none;
      }
    }
  }
  &.nopadding{
    padding: 0;
  }
  &.no-border{
    svg{
      display: none;
    }
  }
  &.circle{
    border-radius:1rem !important;
  }
}
</style>
