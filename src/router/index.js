import { createRouter, createWebHashHistory } from "vue-router";
import i18n from "@/locales/index.js";
const t = i18n.global.t;
/*import store from "@/store/index.js"
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore(store);*/
// import {getActivePinia} from "pinia";

// const startup = () => import('@/views/page/startup.vue');
// const walletConnect = () => import('@/views/components/wallet/indexmodal.vue')
const home = () => import("@/views/page/home/Index.vue");
const preRegist = () => import("@/views/page/pre-regist/Index.vue");
const explore = () => import("@/views/page/explore/Index.vue");
const creation = () => import("@/views/page/creation/Index.vue");
const invitation = () => import("@/views/page/invitation/Index.vue");
const App = () => import("@/views/page/app/index.vue");
const test = () => import("@/views/page/test/index.vue");
const news = () => import("@/views/page/news/index.vue");
const newsDetial = () => import("@/views/page/newsDetial/index.vue");
const userFrame = () => import("@/views/page/user/user-frame.vue");
const userSetting = ()=> import('@/views/page/user/user-setting.vue')
const userAssets = ()=> import('@/views/page/user/user-assets.vue')
const nav = ()=> import('@/views/components/main-nav.vue')
// const nav = ()=> import('@/views/components/main-nav-bak.vue')
// const login = () => import('@/views/login.vue');
// const aboutIndex = () => import('@/views/about/index.vue');
// const userAgreement = () => import('@/views/about/user-agreement.vue');
// const privacyPolicy = () => import('@/views/about/privacy-policy.vue');

// const settingIndex = () => import('@/views/setting/index.vue');
// const accountCancellation = () => import('@/views/setting/accountCancellation.vue');
// const reminder = () => import('@/views/setting/reminder.vue');
// const reason = () => import('@/views/setting/reason.vue');
// const workDetail = () => import('@/views/work/detail.vue')
// const faq = () => import('@/views/faq/index.vue');
const err404 = () => import("@/views/page/error/404.vue");

// console.log(i18n.locale)

const routes = [
    /*{
        path: '/startup',
        component: startup,
        meta:{title:'Router List'}
    },*/
    {
        path: "/",
        components:{
            nav:nav,
            default:App
        },
    },
    {
        path: "/home",
        components:{
            nav:nav,
            default:home
        },
        meta: {
            title: 'Home',
            navName: "Home",
            showInMainNav: true,
        },
    },
    {
        path: "/explore",
        components:{
            nav:nav,
            default:explore
        },
        meta: {
            title: 'Explore',
            navName: "Explore",
            showInMainNav: true,
        },
    },
    {
        path: "/creation",
        components:{
            nav:nav,
            default:creation
        },
        meta: {
            title: 'Creation',
            navName: "Creation",
            showInMainNav: true,
            needLogin:true,
        },
        children:[
            {
                path: 'add',
                meta:{
                    title:'Add Work',
                    navName: "Add Work",
                    showInMainNav: false,
                    needLogin:true,
                }
            }
        ]
    },
    {
        path: "/whitePaper",
        components:{
            nav:nav,
            default:home
        },
        meta: {
            title: 'White Paper',
            navName: "White Paper",
            showInMainNav: true,
            needLogin:false,
        },
        beforeEnter(to,from,next) {
            next(false);
            window.open("https://heartx.gitbook.io/heartx-whitepaper/overview/heartx-overview ",'_blank');
        }
    },
    {
        path: "/App",
        components:{
            nav:nav,
            default:App
        },
        meta: {
            title: 'App',
            navName: "App",
            showInMainNav: true,
            needLogin:false,
        }
    },
    {
        path: "/news",
        components:{
            nav:nav,
            default:news
        },
        meta: {
            title: 'News',
            navName: "News",
            showInMainNav: true,
            needLogin:false,
        }
    },
    {
        path: "/test",
        components:{
            nav:nav,
            default:test
        },
        meta: {
            title: t("pageTitles.home"),
            navName: "test",
            showInMainNav: false,
        },
    },
    {
        path: '/newsDetial/:id',
        meta:{
            title:'newsDetial',
            navName: "newsDetial",
            showInMainNav: false,
            needLogin:false,
        },
        props:true,
        components:{
            nav:nav,
            default:newsDetial
        },
    },
    {
        path: "/user",
        components:{
            nav:nav,
            default:userFrame
        },
        meta: {
            title: t("pageTitles.home"),
            navName: "user",
            showInMainNav: false,
        },
        redirect:{
            path:'/user/setting'
        },
        children:[
            {
                path: 'setting',
                meta:{
                    title:'Setting',
                    navName: "user",
                    showInMainNav: false,
                    needLogin:true,
                },
                component: userSetting
            },
            {
                path: 'assets',
                meta:{
                    title:'My Assets',
                    navName: "My Assets",
                    showInMainNav: false,
                    needLogin:true,
                },
                component: userAssets
            },
            {
                path: "invitation",
                component: invitation,
                meta: {
                    title: 'Invitation Code',
                    navName: "invitation",
                    showInMainNav: false,
                    needLogin:true,
                },
            },
        ]
    },
    {
        path: "/invitation",

        components:{default: invitation, nav:nav},
        meta: {
            title: t("pageTitles.home"),
            navName: "invitation",
            showInMainNav: false,
            needLogin:true,
        },
    },
    /*{
        path: '/home',
        component: home,
        meta:{title:t('pageTitles.home')}
    },*/
    {
        path: "/pre-regist",
        // component: preRegist,
        redirect:{
            path:'/'
        },
        meta: {
            title: t("pageTitles.home"),
            navName: "Regist",
            showInMainNav: false,
        },
    },
    /*{
      path: '/login',
      component: login,
      meta:{title:'login'}
    },
    {
      path: '/faq',
      component: faq,
      meta:{title:'faq'}
    },
    {
      path: '/account',
      component: settingIndex,
      meta:{title:'account.index'},
      children:[
        {
          path: 'account-cancellation',
          meta:{title:'account.accountCancellation'},
          component: accountCancellation
        },
        {
          path: 'reminder',
          meta:{title:'account.reminder'},
          component: reminder
        },
        {
          path: 'reason',
          meta:{title:'account.reason'},
          component: reason
        },
      ]
    },
    {
      path: '/about',
      component: aboutIndex,
      meta:{title:'about.index'},
      children:[
        {
          path: 'user-agreement',
          meta:{title:'about.userAgreement'},
          component: userAgreement
        },
        {
          path: 'privacy-policy',
          meta:{title:'about.privacyPolicy'},
          component: privacyPolicy
        },
      ]
    },
    {
      path:'/work/detail/:workID',
      meta:{title:'workDetail'},
      component: workDetail,
      // props:{workID:false}
      props:true
    },*/
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: err404,
        meta: {
            title: "404",
            showInMainNav: false,
        },
    },

    /*
        {
            path:'/work/detail/:id',

            redirect: to => {
                // 方法接收目标路由作为参数
                // return 重定向的字符串路径/路径对象
                return { path: '/other', query: { q: to.params.queryString } }
            },
        },*/
];

// console.log($i18n.t('common.ok'))
const router = createRouter({
    history: createWebHashHistory(), // hash路由模式
    // history: createWebHistory(),  // history路由模式
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "current",
});
const siteTitle='HeartX-Join us to start your art investment!'
router.beforeEach((to, from) => {
    if(from.path!==to.path){
        document.scrollingElement.scrollTop = 0;

        to.meta.title && (
            document.title =(
                to.path ==='/'
                    ? siteTitle
                    : to.meta.title + ' | '+siteTitle
            )
        ); // 设置标题
    }
});
export default router;
