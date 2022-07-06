/*
 * @Date: 2021-01-11 09:53:46
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-06 18:08:27
 * @FilePath: /Blogs/BlogsClient/src/router/routes.js
 * @Description: 
 */
// 按需加载插件
import Loadable from 'react-loadable';
import React, { Suspense, lazy } from 'react';
// redux actions
// import {homeThunk} from '../../store/actions/thunk';
//Loading组件提示
const Loading=(props)=>{
  console.log(props)
  return <div>Loading...</div>
}
// 路由组件引入
const LoadableHome = Loadable({
  loader: () =>import(/* webpackChunkName: 'Home' */'../pages/Home'),
  loading: Loading,
});
const LoadableUser = Loadable({
  loader: () =>import(/* webpackChunkName: 'User' */'../pages/User'),
  loading: Loading,
});


 
// 路由配置
const routesConfig=[{
  path: '/',
  exact: true,
  component: <LoadableHome/>,
  // thunk: homeThunk,
}, 
{
  path: '/user',
  component: <LoadableUser/>,
  // thunk: ()=>{},
}];

export default routesConfig;




