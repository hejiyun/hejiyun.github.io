<!-- CREATE by HeJiYun at 2023/4/23 10:29 -->
<template>
    <div class="google-recaptcha">
        <div class="g-recaptcha" 
            data-sitekey="6LeHja0lAAAAAJc3HvsjEQ_1b4swyyXiWDjjEOA3" 
            data-callback='onSubmit' 
            data-action='submit'
            @click="onClick">
        </div>
        <slot></slot>
    </div>
</template>
<script ></script>
<script setup>
    import {ref, onMounted, reactive, onBeforeUnmount} from 'vue'
    import {POST} from "/utils/api.js";
    // 子组件传出调用方法
    const emit = defineEmits(["result"]);
    const script = ref(null)
   
    onMounted(() => {
        // 在组件创建的时候，创建一个script标签挂载到body里，避免不使用该组件的页面也会重复加载
        script.value = document.createElement('script');
        script.value.type = 'text/javascript';
        script.value.className = 'clearScript'
        script.value.src="https://www.recaptcha.net/recaptcha/api.js?render=6LeHja0lAAAAAJc3HvsjEQ_1b4swyyXiWDjjEOA3"
        document.body.appendChild(script.value);
    })
    //调用人机验证服务测试token
    const onClick = () => {
        grecaptcha.ready(() => {
            grecaptcha.execute('6LeHja0lAAAAAJc3HvsjEQ_1b4swyyXiWDjjEOA3', {action: 'submit'}).then(async (token) => {
                console.log(token, '拿到了token')
                // 拿到token后调用后端接口，后端获取到score之后， 再返回给客户端，
                const response = await test(token)
                // 如果验证通过， 则把分数返回出去， 如果验证不通过， 则直接在当前组件终止点击事件继续执行
                if (!response) return
                // 验证通过后， 使用emit将值传出去
                emit('result', response)
                
            });
        });
    }
    // 模拟服务端掉用接口得到分数值的处理
    const test = async (token) => {
        if (!ReturnToken.value) return
        const res =  await POST(`https://www.google.com/recaptcha/api/siteverify?secret=6LeHja0lAAAAABZ9EFuo6yiKuoU4N7psErKF4MW1&response=${token}`,null)
        return res.success == 'false' ? res.score : false
    }
    onBeforeUnmount(() => {
        // 在组件销毁的时候，删除掉人机验证的引入， 并且释放script变量的内存占用
        const target =  document.querySelector('.clearScript')
        document.body.removeChild(target)
        script = null
    })
    
</script>
<style lang="scss" scoped>
 .google-recaptcha{
    // width: 100%;
    height: auto;
 }
 .g-recaptcha{
    position: fixed;
    bottom: 0;
    right: 0;
 }
</style>
  