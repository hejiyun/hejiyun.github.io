import {defineStore} from "pinia";
import {GET, POST} from "/utils/api.js";

export const useCatStore = defineStore('category',{
    state: () => {
        return {
            cat_nft:false,
            cat_real:false,
            create_y:false,
            time:0,
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
        //action内定义的是方法函数(methods)
        async getCatList(LOCALE){
            let _nts = new Date().getTime();
            if(this.create_y===false || _nts - this.time > 3600000){
                const res = await POST(`${window.api.api}/web/works/create/prepare`,null,{LOCALE});
                try{
                    if( res.ret_code === 0){
                        this.cat_nft = res.data.category_list_nft;
                        this.cat_real = res.data.category_list_real;
                        this.create_y = res.data.create_y_list;
                        this.time = new Date().getTime();
                    }else{
                        window.toast(res.ret_code)
                    }
                }catch (e){
                    window.toast('Category [ Network Error ]')
                }
            }
        }
    },
    // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: 'ax_category',
                //更改默认存储为localStorage
                storage: sessionStorage,
                // 设置存储key
                // paths: ['list']
            }
        ]
    }
})
