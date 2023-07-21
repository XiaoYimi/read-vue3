/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

const vnode1 = h('div', { class: 'red' }, [h('span', null, 'hello')]);
const vnode2 = h('div', { class: 'green' }, [h('span', null, 'change')]);
/** 函数 h() 创建 VNode 时,将会分配与真实 DOM 相映射的属性 el */

const container = document.querySelector('#app');
mount(vnode1, container);

/** ======== Simple reactive ======== */
// const msg = new Dep('msg');
// const info = new Dep('info');
// watchEffect(() => {
//   console.log(msg.value);
// });
// msg.value = 123;
// console.log(msg.value);

/** ======== Vue2 reactive2 ======== */
// const instance = reactive({
//   state: 0,
// });
// watchEffect(() => {
//   console.log(instance.state);
// });
// instance.state++;

/** ======== VUe3 reactive3 ======== */
const info = reactive({ state: 0 });
watchEffect(() => {
  console.log(info.state);
});

info.state++;
