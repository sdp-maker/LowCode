/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 14:19:35
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:23:19
 * @FilePath: \LowCode\apps\builder\mock\blocks.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  {type Block } from "@/types/block"



export const blocks: Block[] = [
  {
    id: '1',
    type: 'heroTitle',
    label: '标题',
    props: {
      align: 'left',
      content: {
        title: {
          type: 'string',
          default: '标题'
        }
      }
    }
  },
  {
    id: '2',
    type: 'image',
    label: '图片',
    props: {
      url: 'https://picsum.photos/200/300'
    }
  }
]