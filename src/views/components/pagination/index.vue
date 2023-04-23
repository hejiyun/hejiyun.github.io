<template>
    <div class="my-pagination">
        <div class="icon-box noMargin" :class="{ disabled: currentPage === 1 }" @click="changePage(false)">
            <ax-icon class="icon-arrow-left"></ax-icon>
        </div>
        <div v-if="currentPage > 5">...</div>
        <div href="javascript:;" v-for="item in list" :key="item" :class="{ active: currentPage === item }" @click="changePage(item)">{{ item }}</div>
        <div v-if="(currentPage < pages - 2) && (list.length!=pages)">...</div>
        <div href="javascript:;" v-if="(currentPage+2 < pages) && (list.length!=pages)" @click="changePage(pages)">{{ pages }}</div>
        <div class="icon-box" :class="{ disabled: currentPage === pages }" @click="changePage(true)">
            <ax-icon class="icon-arrow-right"></ax-icon>
        </div>
    </div>
</template>
<script>
import { computed, ref } from 'vue'
import AxIcon from '@/components/ax-dom/ax-icon.vue'

export default {
    components: { AxIcon },
    name: 'MyPagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        pagesize: {
            type: Number,
            default: 10
        }
    },
    setup(props, { emit, attrs }) {
        // 当前页
        const currentPage = ref(attrs.currentPage)
        // 计算总页数
        const pages = computed(() => Math.ceil(props.total / props.pagesize))
        // 页码显示组合
        const list = computed(() => {
            const result = []
            // 总页数小于等于5页的时候
            if (pages.value <= 5) {
                for (let i = 1; i <= pages.value; i++) {
                    result.push(i)
                }
            } else {
                // 总页数大于5页的时候
                // 控制两个极端那边的省略号的有无，页码的显示个数与选中页码居中
                if (currentPage.value <= 2) {
                    for (let i = 1; i <= 5; i++) {
                        result.push(i)
                    }
                } else if (
                    currentPage.value >= 3 &&
                    currentPage.value <= pages.value - 2
                ) {
                    for (
                        let i = currentPage.value - 2;
                        i <= currentPage.value + 2;
                        i++
                    ) {
                        result.push(i)
                    }
                } else if (currentPage.value > pages.value - 2) {
                    for (let i = pages.value - 4; i <= pages.value; i++) {
                        result.push(i)
                    }
                }
            }
            return result
        })
        // 点击上一页下一页页码改变页码
        const changePage = (type) => {
            // 点击上一页按钮
            if (type === false) {
                if (currentPage.value <= 1) return
                currentPage.value -= 1
            } else if (type === true) {
                // 点击下一页按钮
                if (currentPage.value >= pages.value) return
                currentPage.value += 1
            } else {
                // 点击页码
                currentPage.value = type
            }
            // 传给父组件当前页码，可以在该事件中做相关操作
            emit('change-page', {
                curPage: currentPage.value,
                total: pages.value
            })
            document.querySelector('#swiperTop').scrollIntoView()
        }
        return { currentPage, pages, list, changePage }
    }
}
</script>
<style scoped lang="scss">
.my-pagination {
    max-width: 520px;
    display: flex;
    justify-content: center;
    justify-content: center;
    margin: 120px auto 0;
    > div {
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.5);
        margin-left: 55px;
        &.active {
            color: #000000;
        }
        &.disabled {
            cursor: not-allowed;
            opacity: 0.4;
        }
        &.noMargin {
            margin-left: 0;
        }
    }
    .icon-box {
        color: #000000;
    }
}

@media only screen and (min-width: 2001px) {
    // xxxl
    .my-pagination {
        > div {
            padding: 14px;
            font-size: 24px;
        }
        .icon-box {
            line-height: initial;
        }
    }
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
    .my-pagination {
        margin: 100px auto 0;
        > div {
            margin-left: 50px;
        }
    }
}
@media only screen and (max-width: 1024px) {
    // md
    .my-pagination {
        margin: 100px auto 0;
        > div {
            margin-left: 40px;
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .my-pagination {
        margin: 80px auto 0;
        max-width: 278px;
        > div {
            margin-left: 35px;
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .my-pagination {
        margin: 63px auto 0;
        > div {
            margin-left: 30px;
        }
    }
}
</style>
