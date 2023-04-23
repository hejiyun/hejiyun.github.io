import { loadEnv } from 'vite';
const HashKey = new Date().getTime().toString(36);
let _APIJSCODE_={};
const proxyList = (command,proxyStr)=>{
    let proxy = proxyStr.split(','),PROXYS={};
    for(let v of proxy){
        v = v.split('=');
        let _reg=new RegExp('^'+v[0].replace(/\//g,'\/'));
        PROXYS['^'+v[0]] = {
            target: v[1],
            changeOrigin: true,
            rewrite(ProxyPath){
                ProxyPath = ProxyPath.replace(_reg, '/')
                return ProxyPath;
            }
        };
        _APIJSCODE_[v[0].replace(/\//g,'')]=v[command==='serve'?0:1].replace(/\/+$/,'');
    }
    return PROXYS;
}
const customPlugins = () => {
    let _command,_env;
    return {
        name: 'custom-plugins',
        config(config, {mode,command}) {
            // console.log(config.debug)
            [_command,_env] = [command,loadEnv(mode,config.envDir,config.envPrefix)];//保存配置副本
            let _proxy = proxyList(_command,_env.ARTEX_PROXYS);
            if(_command === 'serve'){
                Object.assign(config.server.proxy, _proxy)
            }
        },
        transformIndexHtml(html){
            html = html.replace(/\{\{version}}/g, HashKey||'');
            html = html.replace(/\s*\n+\s*/g,'');//压缩代码至一行
            if(_APIJSCODE_!==''){
                html = html.replace('{{API-JS-CODE}}',`api=${JSON.stringify(_APIJSCODE_)}`);
                html = html.replace(/\{\{domain}}/g,_env.ARTEX_H5_DOMAIN);
            }
            return html;
        },
        closeBundle(){
            if(_command==='build'){
                console.log('! BUILD COMPLETE !')
            }
        }
    }
}
export default customPlugins
