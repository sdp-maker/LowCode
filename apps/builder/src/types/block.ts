/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 14:05:04
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:13:01
 * @FilePath: \LowCode\apps\builder\src\types\block.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 基础块类型
export type BaseBlock = {
  id: string
  type: string
  label: string
  props: Record<string, unknown>
}

// 具体的块类型定义
export type HeroTitleBlock = BaseBlock & {
  type: 'heroTitle'
  props: {
    align: 'left' | 'center' | 'right'
    content: {
      title: {
        type: string
        default: string
      }
    }
  }
}

export type ImageBlock = BaseBlock & {
  type: 'image'
  props: {
    url: string
  }
}

export type QuoteBlock = BaseBlock & {
  type: 'quote'
  props: {
    content: string
    author?: string
    style?: string
  }
}

export type TextBlock = BaseBlock & {
  type: 'text'
  props: {
    content: string
    fontSize?: number
    color?: string
  }
}

export type ButtonBlock = BaseBlock & {
  type: 'button'
  props: {
    text: string
    type?: 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium' | 'large'
  }
}

// 联合类型，支持所有块类型
export type Block = HeroTitleBlock | ImageBlock | QuoteBlock | TextBlock | ButtonBlock | BaseBlock