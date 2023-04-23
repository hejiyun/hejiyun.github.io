<template>
    <div>
        <div class="select-box" @click="show = true">
            <span>{{year}} 年</span><span>{{month}} 月</span><span>{{day}} 日</span>
        </div>
        <div v-if="show" class="fixd-box">
            <div class="select-time-box">
                <div class="select-box-content">
                    <div class="select-box-content-header">
                        <div @click="cancel">取消</div>
                        <div @click="conform">確認</div>
                    </div>
                    <div class="select-box-content-scroll">
                        <div class="year-box">
                            <ul>
                                <!-- 添加上下两个空白区域 -->
                                <li></li>
                                <li @click="chickYear = o" :id="chickYear == o ? 'year' : ''" :class="{active: chickYear == o}" v-for="o in yearList" :key="o">{{o}}</li>
                                <li></li>
                            </ul>
                        </div>
                        <div class="month-box">
                            <ul>
                                <li></li>
                                <li @click="chickMonth = o" :id="chickMonth == o ? 'month' : ''" :class="{active: chickMonth == o}" v-for="o in monthList" :key="o">{{o}}</li>
                                <li></li>
                            </ul>
                        </div>
                        <div class="day-box">
                            <ul>
                                <li></li>
                                <li @click="chickDay = o" :id="chickDay == o ? 'day' : ''" :class="{active: chickDay == o }" v-for="o in dayArry" :key="o">{{o}}</li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div class="tips-box">
                        <h1>点选需要的日期!</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            year: '',
            month:'',
            day:'',
            chickDay:null,
            chickMonth: null,
            chickYear:null,
            yearList:[],
            monthList: [1,2,3,4,5,6,7,8,9,10,11,12]
        }
    },
      watch:{
        show: { // 深度监听
            handler(val, oldVal){
                if (val) {
                    this.$nextTick(() => {
                        //初始化滚动到正中间
                        document.getElementById('year').scrollIntoView({block: 'center'})
                        document.getElementById('month').scrollIntoView({block: 'center'})
                        document.getElementById('day').scrollIntoView({block: 'center'})
                    })
                    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
                } else {
                    document.getElementsByTagName('body')[0].style.overflow = 'auto'
                }
            },
            deep:true,
            // 第一次也执行
            immediate: true,
        }
    },
    computed:{
        // 为userInfo设置默认值
        dayArry(){ 
            return this.mGetDate(this.chickYear, this.chickMonth)
        }
    },
    created() {
        // 设置当前年月日为默认时间
        const date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()
        this.chickYear = date.getFullYear()
        this.chickMonth = date.getMonth() + 1
        this.chickDay = date.getDate()
        this.GetYearL()
    },
    methods:{
        conform() {
            // 设置展示年月日
            this.year = this.chickYear
            this.month = this.chickMonth
            this.day = this.chickDay
            this.$emit('getTime', [this.year, this.month, this.time])
            this.show = false
        },
        cancel() {
            this.chickYear  = this.year
            this.chickMonth =  this.month
            this.chickDay = this.day 
            this.show = false
        },
        // 通过当前年月获取对应天数
        mGetDate(year, month){
            var d = new Date(year, month, 0);
            // 如果当前选择大于当前总天数, 则自动跳转到第一天.
            if(this.chickDay > d.getDate()) {
                this.chickDay = 1
            }
            return d.getDate();
        },
        //获取年份数组
        GetYearL(){
            const date = new Date()
            for (let index = 1970; index <= date.getFullYear(); index++) {
                this.yearList.push(index)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.select-box{
    position: relative;
    border:1px solid black;
    background: white;
    padding-right: 40px;
    &::after{
        content: '▼';
        position: absolute;
        right:0;
        top:0;
        height: 100%;
        width: 40px;
        background: red;
    }
}
.fixd-box{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top:0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index:3;
    .select-time-box{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .select-box-content{
        position: absolute;
        bottom: 0;
        left: 0;
        background: white;
        width: 100%;
        height:8rem;
    }
    .select-box-content-header{
        border-bottom: 1px solid #999;
        display: flex;
        justify-content: space-between;
        >div{
            width: 2rem;
            line-height: 1.5rem;
            font-size: .6rem;
            height: 1.5rem;
            color:slateblue;
        }
    }
    .select-box-content-scroll{
        height:4.5rem;
        display: flex;
        justify-content: space-between;
        .year-box,.month-box,.day-box{
            width: 33%;
            text-align: center;
            ul{
                height: 4.5rem;
                padding:.3rem 0;
                overflow-x: hidden;
                overflow-y:auto;
                li{
                    color:#999;
                    height: 1rem;
                    font-size: .5rem;
                    line-height: 1rem;
                }
                li.active{
                    color:slateblue;
                    font-size: .6rem;
                }
            }
        }
    }
    .tips-box{
        border-top:1px solid #999;
        width: 100%;
        height: 2rem;
        text-align: center;
        h1{
            line-height:1rem;
        }
    }
}
</style>
