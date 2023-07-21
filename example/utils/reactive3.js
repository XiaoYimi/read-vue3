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
    activeEffect && this.subscribers.add(activeEffect);
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

/** 使用系统变量存储所有数据依赖的追踪;
 *  数据依赖是一个对象,因此需用使用 对象来作为键值 key;
 *  使用 WeakMap 的原因,在于当前不被任何程序代码访问时,将会被垃圾回收机制回收;
 * */
const targetMap = new WeakMap();

function getDep(target, key) {
  /** 获取当前键值 key 所依赖 */
  let depMap = targetMap.get(target);

  /** 此处采用 Map 来存储数据依赖集合;
   *  Map 对象的 key 可以是任何字符,但缺点是字符串,不能自动删除关联;
   *  而且它不受垃圾回收机制自动管理;他还可以进行迭代(遍历)映射,这与 WeakMap 是主要区别;
   */
  !depMap && (depMap = new Map()) && targetMap.set(target, depMap);

  let dep = depMap.get(key);

  /** 首次构建数据依赖时,它不存在,需要进行初始化 */
  !dep && (dep = new Dep()) && depMap.set(key, dep);

  return dep;
}

/** 响应式系统-代理对象的访问器 get、set */
const reactiveHandler = {
  get(target, key, receiver) {
    const dep = getDep(target, key);
    dep.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key);

    const bool = Reflect.set(target, key, value, receiver);
    dep.notify();
    return bool;
  },
};

/** Vue3 响应式原理(Proxy), raw 是一个 Object 类型值 */
function reactive(raw) {
  return new Proxy(raw, reactiveHandler);
}
