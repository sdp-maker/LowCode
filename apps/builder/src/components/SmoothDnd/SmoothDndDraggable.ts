/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 15:19:24
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 14:55:31
 * @FilePath: \LowCode\apps\builder\src\components\SmoothDnD\SmoothDndDraggable.ts
 * @Description: SmoothDnD 可拖拽元素组件，用于包装可拖拽的内容
 */
import { defineComponent, h } from 'vue'
import { Draggable } from 'vue3-smooth-dnd'

export const SmoothDndDraggable = defineComponent({
  name: 'SmoothDndDraggable',
  props: {
    // 容器标签类型
    tag: {
      type: String,
      default: 'div'
    },
    // 拖拽时添加到元素的 CSS 类
    dragClass: {
      type: String,
      default: undefined
    },
    // 放置前添加到元素的 CSS 类
    dropClass: {
      type: String,
      default: undefined
    },
    // CSS 选择器，用于指定可拖拽区域
    dragHandleSelector: {
      type: String,
      default: undefined
    },
    // CSS 选择器，用于指定不可拖拽区域，优先级高于 dragHandleSelector
    nonDragAreaSelector: {
      type: String,
      default: undefined
    },
    // 拖拽开始延迟时间（毫秒）
    dragBeginDelay: {
      type: Number,
      default: 0
    },
    // 自定义渲染函数
    render: {
      type: Function,
      default: undefined
    },
    // 拖拽开始时的回调函数
    onDragStart: {
      type: Function,
      default: undefined
    },
    // 拖拽结束时的回调函数
    onDragEnd: {
      type: Function,
      default: undefined
    },
    // 鼠标按下时的回调函数
    onMouseDown: {
      type: Function,
      default: undefined
    },
    // 鼠标释放时的回调函数
    onMouseUp: {
      type: Function,
      default: undefined
    },
    // 触摸开始时的回调函数
    onTouchStart: {
      type: Function,
      default: undefined
    },
    // 触摸结束时的回调函数
    onTouchEnd: {
      type: Function,
      default: undefined
    }
  },
  render() {
    const { 
      dragClass, 
      dropClass, 
      dragHandleSelector, 
      nonDragAreaSelector, 
      dragBeginDelay, 
      render,
      onDragStart,
      onDragEnd,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd
    } = this.$props;
    
    const draggableProps = {
      dragClass,
      dropClass,
      dragHandleSelector,
      nonDragAreaSelector,
      dragBeginDelay,
      render,
      onDragStart,
      onDragEnd,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd
    };
    
    return h(Draggable, draggableProps as Record<string, unknown>, this.$slots.default?.())
  }
})