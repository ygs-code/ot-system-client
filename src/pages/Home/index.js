/*
 * @Date: 2022-04-24 11:14:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-07-06 18:58:13
 * @FilePath: /Blogs/BlogsClient/src/pages/home/index.js
 * @Description:
 */

import React, {
    Suspense,
    lazy,
    useState,
    useCallback,
    Children,
    useEffect,
    memo,
} from "react";
import {mapRedux} from "@/redux";   
import "./index.less";
import img from "../../assets/image/react.jpg";
import home from "../../assets/image/home.svg";

// 2234;
// 权限跳转登录页面可以在这控制
const Index = (props) => {
    console.log('props====',props);
    // 阿斯顿发
    return (
        <div className="home">
            HOME页面
            <img src={img} />
            <img src={home} />
            <div className="example"> sadf asdfasdfsdfsdf</div>
        </div>
    );
};

export default mapRedux()(Index);
