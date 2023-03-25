import lodash from 'lodash'
// 节流函数
export const throttle = (() => {
  let startTime = null
  return (time, callback) =>
    new Promise((resolve, reject) => {
      let nowTime = new Date().getTime()
      if (!startTime || nowTime - startTime > time) {
        startTime = nowTime
        callback && callback instanceof Function && callback()
        resolve()
        // callback&&callback()
      }
    })
})()

// 防抖函数
export const stabilization = (() => {
  let timer = null
  return (time, callback) => {
    return new Promise((resolve, reject) => {
      window.clearTimeout(timer)
      timer = setTimeout(() => {
        callback && callback instanceof Function && callback()
        resolve()
      }, time)
    })
  }
})()

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (func, wait, immediate) => {
  let timeout
  return function () {
    const context = this
    const args = [...arguments]
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 因为状态拦截需要传递的是地址，所以只能传对象参数
export const statusThrottle = (() => {
  let objParameter = {
    status: true,
  }
  return (callback) => {
    return new Promise((resolve, reject) => {
      if (!lodash.isObject(objParameter)) {
       
        reject()
        return
      }
      
      if (objParameter.status === false) {
        reject()
        return
      }
      objParameter.status = false
      callback && callback instanceof Function && callback(objParameter)
      resolve(objParameter)
    })
    // callback && callback(objParameter)
  }
})()
