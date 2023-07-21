/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** 副作用函数影响的变量,也是依赖搜集的条件 */
let activeEffect = null;

/** 订阅器模式 */
class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  /** 搜集依赖 */
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  /** 通知更新 */
  notify() {
    this.subscribers.forEach(effect => effect());
  }
}

/** 副作用函数 */
function watchEffect(effect) {
  /** 副作用函数影响变量 activeEffect,使得程序上搜集依赖 */
  activeEffect = effect;
  effect();
  activeEffect = null;
}

/** ======== Vue2 响应式系统 ========
 *  设计原理:
 *    1.遍历数据所有 key,并通过 ES5 Object.defineProperty() 进行数据劫持;
 *    2.通过访问器 get、set 方法进行数据跟踪,在 访问器 get() 方法里添加数据依赖,在访问器 set() 方法里通知数据同步;
 *
 *  设计缺点:
 *    1.数据的响应式系统,简历数据追踪依赖式需要手动处理
 *    2.深层次的数据依赖也需要进行递归添加数据追踪依赖
 */
/** Vue2 响应式原理(Object.defineProperty), raw 是一个 Object 类型值 */
function reactive(raw) {
  /** 遍历数据 raw 的 key 进行依赖追踪 */
  Object.keys(raw).forEach(key => {
    /** 此处构成闭包,并实例化订阅器实例对象 */
    const dep = new Dep();

    /** 获取属性 key 对应的属性值 */
    let value = raw[key];

    /** 通过 Object.defineProperty() 方法在 访问器 get、set 进行添加数据依赖、数据同步更新 */
    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      },
    });
  });

  return raw;
}
