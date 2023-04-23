import { defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import plugins from './config/plugins.js'
import {resolve} from "path";

// const path = require('path');

export default defineConfig(({mode,command}) => {
    return {
        plugins: [
            vue(),
            plugins()
        ],
        base:'/',
        envDir:'./env',
        envPrefix:'ARTEX_',
        build:{
            outDir:'dist',
            assetsDir:'statics',
            assetsInlineLimit:5120,
            target:'es2015',//
            minify:'esbuild',//压缩类型
            emptyOutDir:true,//hook 中执行清理目录操作
            brotliSize:false,//压缩报告
            chunkSizeWarningLimit:1024,
            cssCodeSplit:true,
            cssTarget:'chrome61',
            sourcemap:false,
            manifest:true,
            rollupOptions:{
                input:{
                    main:resolve(__dirname,'./index.html'),
                    event:resolve(__dirname,'./event/index.html'),
                },
                output:{
                    event:'event.html',
                    manualChunks(id) {
                        if(id.includes('node_modules')){
                            /*const arr = (id.toString().split('node_modules/').pop()).split('/');
                            arr[0]=arr[0].replace('@','')
                            //提取大文件单独打包
                            switch(arr[0]) {
                                case 'ant-design':
                                case 'ant-design-vue':
                                    return arr[0];
                                default :
                                    return 'vendor';
                            }*/
                            return 'vendor';
                        }
                    },
                    chunkFileNames: 'statics/js/[name]-[hash].js',
                    entryFileNames: 'statics/js/[name]-[hash].js',
                    /*assetFileNames(assetfile){
                        let folder='[ext]'
                        do{
                            if(/\.(png|apng|jpe?g|gif|webp|svg)$/i.test(assetfile.name)){
                                folder='img';break;
                            }
                            if(/\.(avi|flv|mid|m[ko]v|mp[34]|mpe?g|ogg|wav|wm[va])$/i.test(assetfile.name)){
                                folder='media';break;
                            }
                            if(/\.(eot|font?|otf|tt[fc]|woff2?)$/i.test(assetfile.name)){
                                folder='fonts';break;
                            }
                            if(/\.(css|stylus|scss|sass|less|style)$/i.test(assetfile.name)){
                                folder='css';break;
                            }
                        }while(false);
                        // console.log(assetfile.name,`statics/${folder}/[name]-[hash].[ext]`)
                        return `statics/${folder}/[name]-[hash].[ext]`;
                    },*/
                }
            }
        },
        css:{
            preprocessorOptions:{
                scss:{
                    charset:false,
                }
            }
        },
        resolve:{
            alias:{
                '@':resolve(__dirname,'src'),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            }
        },
        server: {
            host:'localhost',
            port: 8000,
            hmr:true,
            cors: true,
            proxy:{}
        }
    }
})

