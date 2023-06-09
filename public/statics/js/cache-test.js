//H5版本检测源代码，依赖md5插件，加密后放入 index.html
//JS加密工具：http://tool.mkblog.cn/jsobfuscator/，使用默认配置即可
if(window.location.hostname.replace(/(^localhost$|^[\d.]+$)/i,'') !== ''){
    try {
        window.goNewVersionPage=function(version){
            var _s=location.search.replace(/(&)*version=[a-z0-9]+/g,'');
            (_s==='?') && (_s='');
            _s += ((_s?'&':'?') + paramKey+'='+version);
            location.replace(location.pathname+_s+location.hash)
        }
        var storageKey = md5(location.pathname),
            storageVal=window.localStorage.getItem(storageKey),
            paramKey = 'version',
            pageKey = 'data-version',
            pageVersion = document.querySelector('html').getAttribute(pageKey);
        if(storageVal && pageVersion && pageVersion !== storageVal){
            window.localStorage.removeItem(storageKey)
            goNewVersionPage(storageVal);
        }
        setTimeout(function(){
            var xhr = new XMLHttpRequest(),_ts = ~~(new Date().getTime()/300000);
            xhr.onload = function(){
                var newVersion=this.responseXML.documentElement.getAttribute(pageKey);
                newVersion && window.localStorage.setItem(storageKey,newVersion);
            }
            xhr.responseType = "document";
            xhr.open('GET', '?t='+_ts, true);
            xhr.send();
        },200)
    }catch (e){}
}
