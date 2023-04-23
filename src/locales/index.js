import {createI18n} from 'vue-i18n'
import zhTW from './language/zh-TW.js'
import enUS from './language/en-US.js'
const messages = {
  'zh-TW':zhTW,
  'en-US':enUS
}
const alias = {
  'zh-TW':'zh-TW',
  'zh-CN':'zh-TW',
  'en':'en-US',
  'zh':'zh-TW'
}
const params = new URLSearchParams(window.location.search);

window.localStorage.removeItem('caches')

if(params.get('lang') && alias[params.get('lang')]){
  window.localStorage.setItem('SITE_LANG', alias[params.get('lang')])
}

if(!window.localStorage.getItem('SITE_LANG')){
  let _lang = window.navigator.language;
  if(alias[_lang]){
    _lang = alias[_lang]
  }
  window.localStorage.setItem('SITE_LANG',
    messages[_lang]
      ? _lang
      : 'en-US'
  )
}

const _LANG_ = 'en-US'||(alias[params.get('lang')] || window.localStorage.getItem('SITE_LANG'))

document.querySelector('body').setAttribute('class',_LANG_)
const i18n = createI18n({
  legacy: false,
  locale: _LANG_,
  fallbackLocale:'en-US',
  globalInjection: true,
  messages
})
export default i18n
