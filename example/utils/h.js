/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/**
 * @description: 创建 VNode 节点
 * @param {*} tag VNode 元素标签
 * @param {*} props VNode 相关属性(attribute, property)
 * @param {*} children VNode 孩子元素
 * @return {object} {tag, props, children}
 */
function h(tag, props = {}, children = []) {
  /** 本质上将 template 模板内容转换为渲染函数 render() 返回描述 VNode 的 JavaScript 对象 */
  /** 该章节涉及编译器过程原理(parse, transfrom, generate),详细直接访问源码 vue/core */

  const el = document.createElement(tag);

  return { tag, props, children, el };
}
