const hiddenProperty = 'hidden' in document ? 'hidden' :  'webkitHidden' in document ? 'webkitHidden' :  'mozHidden' in document ? 'mozHidden' :  null;
const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
const onVisibilityChange = function(){
    if(!document[hiddenProperty]){
        window.location.reload();
    }
}
export function pluginChangeEvent(){
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}
