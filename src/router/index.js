import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const manage = r => require.ensure([], () => r(require('@/Pages/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/Pages/home')), 'home');
const personManage = r => require.ensure([], () => r(require('@/Pages/personManage')), 'personManage');
const infoRegist = r => require.ensure([], () => r(require('@/Pages/infoRegist')), 'infoRegist');

const vacationApplication = r => require.ensure([], () => r(require('@/Pages/vacationApplication')), 'vacationApplication');


const routes = [
    // {
    // 	path: '/',
    // 	name: 'HelloWorld',
    // 	component: HelloWorld
   	// },
    {
    	path: '/manage',
    	name: 'manage',
    	component: manage,
    	children: [{
    		path: '',
    		component: home,
    		meta: [],
    	},{
    		path: '/personManage',
    		component: personManage,
    		meta: ['人事表单', '人事变动']
    	},{
    		path: '/infoRegist',
    		component: infoRegist,
    		meta: ['人事表单', '信息登记']
    	},{
    		path: '/vacationApplication',
    		component: vacationApplication,
    		meta: ['其他表单', '休假申请']
    	}]
    }
]

export default new Router({
  	routes,
  	strict: process.env.NODE_ENV !== 'production',
})
