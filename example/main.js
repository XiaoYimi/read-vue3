/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

const vnode1 = h('div', { class: 'red' }, [h('span', null, 'hello')]);
const vnode2 = h('div', { class: 'green' }, [h('span', null, 'change')]);
/** 函数 h() 创建 VNode 时,将会分配与真实 DOM 相映射的属性 el */

mount(vnode1, document.querySelector('#app'));

patch(vnode1, vnode2);
