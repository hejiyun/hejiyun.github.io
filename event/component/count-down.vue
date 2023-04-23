<template>
  <div class="countdown">
    <div>
      <span class="days" v-if="days>0">{{ days }} Days</span>
      <span v-if="days>0"> : </span>
      <span>{{ hours }}</span>
      <span> : </span>
      <span>{{ minutes }}</span>
      <span> : </span>
      <span>{{ seconds }}</span>
      <span> : </span>
      <span>{{ milliseconds }}</span>
    </div>
  </div>
</template>

<script>
import { ref,onBeforeUnmount } from 'vue';

export default {
  props: {
    timestamp: {
      type: Number,
      required: true
    },
    onFinish: {
      type: Function
    }
  },
  setup(props) {
    const days = ref('0');
    const hours = ref('00');
    const minutes = ref('00');
    const seconds = ref('00');
    const milliseconds = ref('00');
    let distance = props.timestamp * 1000 - 1000;
    let endTime = Date.now() + distance;

    const countdown = () => {
      let _distance = endTime - Date.now();
      if(Math.abs(_distance - distance)>200000){
        location.reload();
      }
      distance = endTime - Date.now();

      if (distance > 0) {
        distance = distance - 25;


        // hours.value = (~~((distance / (1000 * 60 * 60)))).toString().padStart(2, '0');
        // days.value = (~~(distance / (1000 * 60 * 60 * 24))).toString().padStart(2, '0');
        days.value = (~~(distance / (1000 * 60 * 60 * 24)));
        hours.value = (~~((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
        minutes.value = (~~((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
        seconds.value = (~~((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
        milliseconds.value = (~~((distance % 1000) / 10)).toString().padStart(2, '0');
      } else {
        clearInterval(interval);
        // props.onFinish(distance);
        location.reload();
      }
    };

    const interval = setInterval(countdown, 25);
    
    onBeforeUnmount(() => {
      clearInterval(interval)
    })
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }
};
</script>

<style lang="scss" scoped>
.countdown{
    display: inline-block;
    margin:0 auto;
    font-weight: 700;
    // height: 77rem;
    font-size: 64rem;
    line-height: 120%;
    >div{
      background: linear-gradient(90deg, #F365AC 9.19%, #3BDECD 87.87%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      display: flex;
      justify-content: center;
      span{
          display: block;
          width:30rem;
          &:nth-of-type(odd){
                width:120rem;
          }
          &.days{
              width:auto;
              padding-right:25rem;
          }
      }
    }
    
}
@media only screen and (max-width: 1600px) {
  .countdown{
    font-size: 52rem;
    span{
      &:nth-of-type(odd){
          width:85rem;
       }
       &.days{
          width:auto;
          padding-right: 15rem;
       }
    }
  }
}

</style>