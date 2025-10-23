/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 15:19:24
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 15:00:48
 * @FilePath: \LowCode\apps\builder\src\components\SmoothDnd\SmoothDndContainer.ts
 * @Description: SmoothDnD 容器组件，用于包装可拖拽元素
 */
import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { Container } from 'vue3-smooth-dnd'
import type { SmoothDnD } from 'smooth-dnd'

export const SmoothDndContainer = defineComponent({
  name: 'SmoothDndContainer',
  setup() {
    return {container: null as SmoothDnD | null}
  },
  props: {
    // 容器方向，可以是 'horizontal' 或 'vertical'
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical'
    },
    // 拖拽行为，可以是 'move'、'copy'、'drop-zone' 或 'contain'
    behaviour: {
      type: String as PropType<'move' | 'copy' | 'drop-zone' | 'contain'>,
      default: 'move'
    },
    // 容器标签类型
    tag: {
      type: String,
      default: 'div'
    },
    // 分组名称，具有相同分组名称的容器之间可以拖拽元素
    groupName: {
      type: String,
      default: undefined
    },
    // 锁定拖拽移动轴，可以是 'x'、'y' 或 undefined
    lockAxis: {
      type: String as PropType<'x' | 'y' | undefined>,
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
    // 动画持续时间（毫秒）
    animationDuration: {
      type: Number,
      default: 250
    },
    // 是否启用自动滚动
    autoScrollEnabled: {
      type: Boolean,
      default: true
    },
    // 拖拽时添加到幽灵元素的 CSS 类
    dragClass: {
      type: String,
      default: undefined
    },
    // 放置前添加到幽灵元素的 CSS 类
    dropClass: {
      type: String,
      default: undefined
    },
    // 是否在容器外移除元素
    removeOnDropOut: {
      type: Boolean,
      default: undefined
    },
    // 放置占位符选项
    dropPlaceholder: {
      type: [Boolean, Object] as PropType<boolean | {
        className?: string,
        animationDuration?: string,
        showOnTop?: boolean
      }>,
      default: undefined
    },
    // 获取子元素载荷的函数
    getChildPayload: {
      type: Function,
      default: undefined
    },
    // 判断是否接受放置的函数
    shouldAcceptDrop: {
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
    // 放置时的回调函数
    onDrop: {
      type: Function,
      default: undefined
    },
    // 拖拽进入时的回调函数
    onDragEnter: {
      type: Function,
      default: undefined
    },
    // 拖拽离开时的回调函数
    onDragLeave: {
      type: Function,
      default: undefined
    },
    // 拖拽准备就绪时的回调函数
    onDragReady: {
      type: Function,
      default: undefined
    },
    // 拖拽过程中的回调函数
    onDragMove: {
      type: Function,
      default: undefined
    }
  },
  render() {
    const { 
      orientation, 
      behaviour, 
      groupName, 
      lockAxis, 
      dragHandleSelector, 
      nonDragAreaSelector, 
      dragBeginDelay, 
      animationDuration, 
      autoScrollEnabled, 
      dragClass, 
      dropClass, 
      removeOnDropOut, 
      dropPlaceholder, 
      getChildPayload, 
      shouldAcceptDrop, 
      onDragStart, 
      onDragEnd, 
      onDrop, 
      onDragEnter, 
      onDragLeave,
      onDragReady,
      onDragMove
    } = this.$props;
    
    const containerProps = {
      orientation,
      behaviour,
      groupName,
      lockAxis,
      dragHandleSelector,
      nonDragAreaSelector,
      dragBeginDelay,
      animationDuration,
      autoScrollEnabled,
      dragClass,
      dropClass,
      removeOnDropOut,
      dropPlaceholder,
      getChildPayload,
      shouldAcceptDrop,
      onDragStart,
      onDragEnd,
      onDrop,
      onDragEnter,
      onDragLeave,
      onDragReady,
      onDragMove
    };
    
    return h(Container, containerProps as Record<string, unknown>, this.$slots.default?.())
  }
})