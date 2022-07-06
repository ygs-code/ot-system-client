/*
 * @Date: 2021-01-11 09:53:46
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-06 17:44:17
 * @FilePath: /react-ssr-need-load-webpack5/src/app/router/index.js
 * @Description:
 */
// import React from 'react'
// 路由
// import {Route, Switch } from 'react-router-dom';
// redux
import { ConnectedRouter } from 'react-router-redux'

import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 路由配置
import routesConfig from './routes'

// console.log()
const Home = () => 'Home'
const About = () => 'About'
// <Route path="/" element={<Home />} />
//     <Route path="/about" element={<About />} />
const Routers = (props) => (
  <Router {...props}>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      {
        routesConfig.map(route=>(
          <Route key={route.path} exact={route.exact} path={route.path} element={route.component}  thunk={route.thunk}  />
        ))
      }
      </Routes>
    </Suspense>
  </Router>

  /*
    <ConnectedRouter history={history}>
    <div>
      {
        routesConfig.map(route=>(
          <Route key={route.path} exact={route.exact} path={route.path} component={route.component}  thunk={route.thunk}  />
        ))
      }
    </div>
  </ConnectedRouter>
  */
)

export default Routers
