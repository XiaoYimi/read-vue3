/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/**
 * @description: 元素挂载
 * @param {*} vnode VNode 元素节点
 * @param {*} container VNode 挂载的容器
 * @return {*}
 */
function mount(vnode, container) {
  /** 创建真实 DOM 节点 */
  const el = document.createElement(vnode.tag);

  /** 为真实 DOM 节点添加相关属性 (attribute, property) */
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      el.setAttribute(key, value);
    }
  }

  /** 判断 VNode 孩子元素类型 === 'string' ? 内容 : 孩子节点;
   *  条件式设置VNode 元素内容
   * */
  const isStringContent = typeof vnode.children === 'string';

  if (isStringContent) {
    el.textContent = vnode.children;
  } else {
    vnode.children.forEach(cvNode => {
      /** 使用递归 */
      mount(cvNode, el);
    });
  }

  container.appendChild(el);
}
