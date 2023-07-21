/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 响应式系统 ========
 *  响应式,很多人认为它是特定的范例;
 *  但尤雨溪已特别说明,它只是个自动更新的思想,自动化保持同步;
 *
 *  尤雨溪举例子:
 *  1. excel 表格数据通过 f(x) = a * 10,实现了 b 随 a 的变动值保持同步为 a * 10
 *  2. 变量值的更新,通过函数调用进行处理,实现数据同步更新;本质上是通过命令式或指令式方式来实现;
 *  3. 通过以上实例进行思想延伸,采用声明式通过编译器进行实现数据同步()
 *
 *  本章节难点
 *  1.理解订阅者模式,搜集依赖和通知更新方法
 *  2.使用副作用函数实现数据同步更新
 *  3.通过 get、set 访问器进行数据劫持,进行搜集依赖和通知更新
 *
 *  响应式系统的好处,解决了数据状态的更新基准(谁改变显示谁),也解决了在合适时机渲染(数据同步更新)
 *
 *  本章节设计思路非常巧妙,体现在 副作用函数以及访问器这一方面,应多加强深入理解;
 */

let activeEffect = null;
class Dep {
  constructor(value) {
    this.subscribers = new Set();
    this._value = value;
  }

  /** 使用访问器劫持数据;
   *  保证在数据访问时收集依赖,数据更新完毕后进行通知数据同步 */
  get value() {
    /** 数据访问时就收集依赖 */
    this.depend();
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    /** 数据更新完毕后通知数据保持同步 */
    this.notify();
  }

  /** 进行数据依赖收集 */
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  /** 通知数据同步更新 */
  notify() {
    this.subscribers.forEach(effect => {
      effect();
    });
  }
}

/** 副作用函数: 影响全局变量 activeEffect,并建立依赖收集;
 *  当依赖收集完毕,需手动清理映射关系 */
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const msg = new Dep('msg');
const info = new Dep('info');

watchEffect(() => {
  console.log(msg.value);
});

msg.value = 123;
console.log(msg.value);
