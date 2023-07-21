/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 组件更新: 新旧节点的比较 ========
 *  1. 理解组件更新的机制
 *  2. 组件更新中的优化: Block 程序块(根节点|v-if 条件判断)、静态节点标记
 */

/**
 *
 * @description: 更新 VNode 节点
 * @param {object} n1 旧 VNode 节点
 * @param {object} n2 新 VNode 节点
 * @return {object}
 */
function patch(n1, n2) {
  /** 会优先比较是否为 静态标记节点 ? 跳过 : 继续执行 */
  /** 比较两个节点的标签 */
  if (n1.tag === n2.tag) {
    /** 对真实 DOM 的引用 */
    const el = (n2.el = n1.el);

    /** ======== 处理 props 属性 ======== */
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    /** 检测并设置新的属性或属性值 */
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (oldValue !== newValue) el.setAttribute(key, newValue);
    }
    /** 检测移除的属性并删除 */
    for (const key in oldProps) {
      !(key in newProps) && el.removeAttribute(key);
    }

    /** ======== 处理 children 孩子节点 ======== */
    const oldChildren = n1.children;
    const newChildren = n2.children;

    /** 可能为 string 或 VNode 孩子节点 */
    if (typeof newChildren === 'string') {
      /** 新节点 VNode 为 string */
      if (typeof oldChildren === 'string') {
        /** 值不相等则进行更新内容 */
        if (newChildren !== oldChildren) el.textContext = newChildren;
      } else {
        /** 类型不相等,新的 VNode 节点为字符串则直接更新 */
        el.textContext = newChildren;
      }
    } else {
      /** 新节点为 VNode 孩子节点 */

      if (typeof oldChildren === 'string') {
        /** 旧节点为 string,与新节点类型 VNode 孩子节点不一致,则需要进行清空 el 容器内容 */
        el.innerHTML = '';

        /** 由于新节点类型为 VNode 孩子节点,故需要进行逐个挂载到该 el 容器 */
        newChildren.forEach(cvNode => {
          /** 此处函数详见上一章节 moute.js 函数  */
          mount(cvNode, el);
        });
      } else {
        /** 新旧节点的类型都为 VNode 孩子节点,尤雨溪给出 2 种算法进行处理
         *  方案1: key 模式, 通过唯一标识 key 进行比较,并根据新节点的孩子节点顺序进行更新
         *  方案2: 尤雨溪居然没详细介绍,直接让人去看源码
         */
        /** 此处逻辑,假设没有唯一标识 key 存在;我们通过比较同一索引的两个节点的类型 */
        /** 确定孩子节点相同长度 */
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          /** 使用递归进行比较同一索引的两个节点 */
          patch(oldChildren[i], newChildren[i]);
        }

        /** 比较新旧节点的孩子节点长度 */
        if (newChildren.length > oldChildren.length) {
          /** 新节点的孩子节点 比 旧节点的孩子节点 多,需要添加新增的孩子节点 */
          newChildren
            .slice(oldChildren.length)
            .forEach(child => moute(child, el));
        } else if (newChildren.length < oldChildren.length) {
          /** 新节点的孩子节点 比 旧节点的孩子节点 少,需要删除多余的孩子节点 */
          oldChildren
            .slice(newChildren.length)
            .forEach(child => el.removeChild(child));
        }
      }
    }
  } else {
    /** 直接替换 */
  }
}
