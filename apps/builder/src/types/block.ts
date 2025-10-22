/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 14:05:04
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:13:01
 * @FilePath: \LowCode\apps\builder\src\types\block.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type BaseBlock = {
    id: string,
    type: string,
    label: string,
}
type HeroTitleBlock = BaseBlock & {
  type: 'heroTitle',
  props: {
    align: 'left' | 'center' | 'right',
    content: {
      title: {
        type: string,
        default: string
      }
    }
  }
}
type ImageBlock = BaseBlock & {
  type: 'image',
  props: {
    url: string
  }
}

export type Block = HeroTitleBlock | ImageBlock