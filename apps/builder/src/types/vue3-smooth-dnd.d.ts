/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 23:13:05
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 14:47:22
 * @FilePath: \LowCode\apps\builder\src\types\vue3-smooth-dnd.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { DefineComponent } from 'vue'

// Container 组件的属性接口
export interface ContainerProps {
  orientation?: 'vertical' | 'horizontal'
  behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain'
  groupName?: string
  dragHandleSelector?: string
  nonDragAreaSelector?: string
  dragBeginDelay?: number
  animationDuration?: number
  autoScrollEnabled?: boolean
  lockAxis?: 'x' | 'y'
  dragClass?: string
  dropClass?: string
  removeOnDropOut?: boolean
  dropPlaceholder?: {
    className?: string
    animationDuration?: number
    showOnTop?: boolean
  }
  onDragStart?: (params: { isSource: boolean; payload: unknown; willAcceptDrop: boolean }) => void
  onDragEnd?: (params: { isSource: boolean; payload: unknown; willAcceptDrop: boolean }) => void
  onDragEnter?: () => void
  onDragLeave?: () => void
  onDrop?: (result: { removedIndex: number | null; addedIndex: number | null; payload?: unknown; element?: HTMLElement }) => void
  onDropReady?: (result: { removedIndex: number | null; addedIndex: number | null; payload?: unknown; element?: HTMLElement }) => void
  getChildPayload?: (index: number) => unknown
  shouldAnimateDrop?: (sourceContainerOptions: ContainerOptions, payload: unknown) => boolean
  shouldAcceptDrop?: (sourceContainerOptions: ContainerOptions, payload: unknown) => boolean
  getGhostParent?: () => HTMLElement
}

// Draggable 组件的属性接口
export interface DraggableProps {
  tag?: string
  key?: string | number
  style?: Record<string, string | number>
  class?: string | Record<string, boolean> | Array<string>
  dragClass?: string
  dropClass?: string
  locked?: boolean
  dragData?: unknown
  dragBeginDelay?: number
  onDragStart?: (params: { isSource: boolean; payload: unknown; willAcceptDrop: boolean }) => void
  onDragEnd?: (params: { isSource: boolean; payload: unknown; willAcceptDrop: boolean }) => void
}

// Container 选项接口，用于 shouldAnimateDrop 和 shouldAcceptDrop 函数
export interface ContainerOptions {
  behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain'
  groupName?: string
  orientation?: 'vertical' | 'horizontal'
  dragHandleSelector?: string
  nonDragAreaSelector?: string
  dragBeginDelay?: number
  animationDuration?: number
  autoScrollEnabled?: boolean
  lockAxis?: 'x' | 'y'
  dragClass?: string
  dropClass?: string
  removeOnDropOut?: boolean
  dropPlaceholder?: {
    className?: string
    animationDuration?: number
    showOnTop?: boolean
  }
}

declare module 'vue3-smooth-dnd' {
  export const Container: DefineComponent<ContainerProps>
  export const Draggable: DefineComponent<DraggableProps>
}


