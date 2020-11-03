import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');
//const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');
const footer = r => require.ensure([], () => r(require('../components/footer/footGuide')), 'footer');
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop');
const msite = ()=>import("@/page/msite/msite")


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home,
            meta: { keepAlive: true },//当前的.vue文件需要缓存
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        //城市查询地址
        {
            path: '/city/:cityid',
            component: city
        },
        //所有商铺列表页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true },
        },
        {
            path: '/footer',
            component: footer,
        },
        {
            path: '/shop',
            component: shop,
        },
    ]
}]
