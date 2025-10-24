import type { Component } from 'vue'
import type { Block } from './types/block'

// 导入其他物料组件
import NotesBlock from './blocks/NotesBlock.vue'
import ViewBlock from './blocks/ViewBlock.vue'
import FormBlock from './blocks/FormBlock.vue'
import QuoteBlock from './blocks/QuoteBlock.vue'
import TextBlock from './blocks/TextBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import ButtonBlock from './blocks/ButtonBlock.vue'
import ChartBlock from './blocks/ChartBlock.vue'
import CardBlock from './blocks/CardBlock.vue'
import ListBlock from './blocks/ListBlock.vue'
import ContainerBlock from './blocks/ContainerBlock.vue'
import SeparatorBlock from './blocks/SeparatorBlock.vue'

// 块定义接口
export interface BlockDefinition {
  type: string
  name: string
  description?: string
  icon?: string
  category?: string
  material: Component | (() => Component)
  props?: Record<string, unknown>
  defaultProps?: Record<string, unknown>
}

// 插件接口
export interface BlockPlugin {
  name: string
  version: string
  blocks: BlockDefinition[]
  install?: (blockSuite: BlockSuite) => void
  uninstall?: (blockSuite: BlockSuite) => void
}

// 基础块定义
const baseBlocks: BlockDefinition[] = [
  // 标题分类
  {
    type: 'simpleTitle',
    name: '简单标题',
    icon: 'T',
    category: '标题',
    material: TextBlock,
    defaultProps: { content: '简单标题', fontSize: 22, align: 'left' },
  },
  {
    type: 'imageTitle',
    name: '图片标题',
    icon: '🏞️',
    category: '标题',
    material: ViewBlock, // 使用 ViewBlock 组合图片和文字
    defaultProps: { content: '图片标题' },
  },
  // 系列分类
  {
    type: 'card',
    name: '卡片',
    icon: '💳',
    category: '系列',
    material: CardBlock,
    defaultProps: {
      title: '卡片标题',
      description: '这是卡片的描述内容，可以包含详细信息。',
      showImage: false,
      showButton: true,
      buttonText: '了解更多',
      buttonType: 'primary',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      padding: 16,
      shadow: true
    },
  },
  {
    type: 'list',
    name: '列表',
    icon: '📄',
    category: '系列',
    material: ListBlock,
    defaultProps: {
      title: '列表标题',
      items: ['列表项 1', '列表项 2', '列表项 3'],
      listType: 'unordered',
      showIcon: true,
      icon: '•',
      itemSpacing: 8,
      textColor: '#374151',
      padding: 16
    },
  },
  // 移除旧的、通用的图表和数据网格
  // 布局分类
  {
    type: 'container',
    name: '容器',
    icon: '⬜',
    category: '布局',
    material: ContainerBlock,
    defaultProps: {
      title: '容器',
      placeholder: '拖拽组件到这里',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 8,
      padding: 16,
      minHeight: 120,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 8
    },
  },
  {
    type: 'separator',
    name: '分隔符',
    icon: '⎯',
    category: '布局',
    material: SeparatorBlock,
    defaultProps: {
      separatorType: 'line',
      color: '#e5e7eb',
      thickness: 1,
      width: 100,
      style: 'solid',
      marginTop: 16,
      marginBottom: 16
    },
  },
  // 其他组件
  {
    type: 'quote',
    name: '引言',
    icon: '"',
    category: '内容',
    material: QuoteBlock,
    defaultProps: {
      content: '这是一段引言内容，用于突出显示重要的文字或观点。',
      author: '作者姓名',
      source: '来源',
      authorPrefix: '—',
      showIcon: true,
      icon: '"',
      quoteStyle: 'default',
      backgroundColor: '#f9fafb',
      borderColor: '#6b7280',
      textColor: '#374151',
      fontSize: 16,
      padding: 16,
      borderWidth: 4,
      italic: true
    }
  },
  {
    type: 'image',
    name: '图片',
    icon: '🖼️',
    category: '内容',
    material: ImageBlock,
    defaultProps: { src: 'https://picsum.photos/200/300' }
  },
  {
    type: 'notes',
    name: '笔记',
    icon: '📝',
    category: '内容',
    material: NotesBlock,
    defaultProps: {
      title: '笔记标题',
      content: '这是一条笔记内容。你可以在这里记录重要信息、想法或提醒事项。',
      icon: '📝',
      showHeader: true,
      showTimestamp: false,
      noteType: 'note',
      borderRadius: 8,
      padding: 16,
      fontSize: 14
    }
  },
  {
    type: 'button',
    name: '按钮',
    icon: '🔘',
    category: '操作',
    material: ButtonBlock,
    defaultProps: {
      buttonText: 'Click me',
      buttonType: 'primary',
    }
  },
  {
    type: 'form',
    name: '表单',
    icon: '📋',
    category: '操作',
    material: FormBlock,
    defaultProps: {}
  },
  // 新增具体的图表类型
  {
    type: 'lineChart',
    name: '折线图',
    icon: '📈',
    category: '图表',
    material: ChartBlock,
    defaultProps: {
      chartType: 'line',
      chartData: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  {
    type: 'pieChart',
    name: '饼图',
    icon: '🥧',
    category: '图表',
    material: ChartBlock,
    defaultProps: {
      chartType: 'pie',
      chartData: {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
    }
  },
  {
    type: 'barChart',
    name: '条形图',
    icon: '📊',
    category: '图表',
    material: ChartBlock,
    defaultProps: {
      chartType: 'bar',
      chartData: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      }
    }
  },
  {
    type: 'radialChart',
    name: '径向图',
    icon: '🎯',
    category: '图表',
    material: ChartBlock,
    defaultProps: {
      chartType: 'radial',
      chartData: {
        title: {
          text: '径向图'
        },
        polar: {},
        angleAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu'],
          z: 10
        },
        radiusAxis: {},
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
        }]
      }
    }
  }
]

/**
 * 块管理器类
 * 负责管理所有可用的块定义
 */
export class BlockSuite {
  private blocks: BlockDefinition[] = [...baseBlocks]
  private plugins: Map<string, BlockPlugin> = new Map()

  constructor() {
    // 初始化时加载默认块
  }

  /**
   * 获取所有块的映射表
   */
  getBlocksMap(): Record<string, BlockDefinition> {
    return Object.fromEntries(this.blocks.map(block => [block.type, block]))
  }

  /**
   * 获取所有块定义
   */
  getBlocks(): BlockDefinition[] {
    return [...this.blocks]
  }

  /**
   * 根据类型获取块定义
   */
  getBlock(type: string): BlockDefinition | undefined {
    return this.blocks.find(block => block.type === type)
  }

  /**
   * 根据分类获取块
   */
  getBlocksByCategory(category: string): BlockDefinition[] {
    return this.blocks.filter(block => block.category === category)
  }

  /**
   * 获取所有分类
   */
  getCategories(): string[] {
    const categories = new Set(this.blocks.map(block => block.category).filter((cat): cat is string => Boolean(cat)))
    return Array.from(categories)
  }

  /**
   * 添加新块
   */
  addBlock(block: BlockDefinition): void {
    if (this.hasBlock(block.type)) {
      console.warn(`Block type "${block.type}" already exists. Use updateBlock to modify it.`)
      return
    }
    this.blocks.push(block)
  }

  /**
   * 移除块
   */
  removeBlock(type: string): boolean {
    const index = this.blocks.findIndex(block => block.type === type)
    if (index === -1) return false
    
    this.blocks.splice(index, 1)
    return true
  }

  /**
   * 更新块定义
   */
  updateBlock(type: string, block: BlockDefinition): boolean {
    const index = this.blocks.findIndex(b => b.type === type)
    if (index === -1) return false
    
    this.blocks[index] = { ...this.blocks[index], ...block }
    return true
  }

  /**
   * 检查是否存在指定类型的块
   */
  hasBlock(type: string): boolean {
    return this.blocks.some(block => block.type === type)
  }

  /**
   * 安装插件
   */
  installPlugin(plugin: BlockPlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already installed`)
      return
    }

    // 添加插件提供的块
    plugin.blocks.forEach(block => {
      this.addBlock(block)
    })

    // 执行插件的安装钩子
    if (plugin.install) {
      plugin.install(this)
    }

    this.plugins.set(plugin.name, plugin)
    console.log(`Plugin "${plugin.name}" installed successfully`)
  }

  /**
   * 卸载插件
   */
  uninstallPlugin(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName)
    if (!plugin) return false

    // 移除插件提供的块
    plugin.blocks.forEach(block => {
      this.removeBlock(block.type)
    })

    // 执行插件的卸载钩子
    if (plugin.uninstall) {
      plugin.uninstall(this)
    }

    this.plugins.delete(pluginName)
    console.log(`Plugin "${pluginName}" uninstalled successfully`)
    return true
  }

  /**
   * 获取已安装的插件列表
   */
  getInstalledPlugins(): BlockPlugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 创建块实例
   */
  createBlock(type: string, props?: Record<string, unknown>): Block | null {
    const blockDef = this.getBlock(type)
    if (!blockDef) return null

    return {
      id: `${type}_${Date.now()}`,
      type: blockDef.type,
      label: blockDef.name,
      props: { ...blockDef.defaultProps, ...props } as Record<string, unknown>
    }
  }

  /**
   * 验证块定义
   */
  validateBlock(block: BlockDefinition): string[] {
    const errors: string[] = []
    
    if (!block.type) errors.push('Block type is required')
    if (!block.name) errors.push('Block name is required')
    if (!block.material) errors.push('Block material is required')
    
    return errors
  }
}

// 创建全局块管理器实例
export const blockSuite = new BlockSuite()

// 导出常用方法
export const getBlocks = () => blockSuite.getBlocks()
export const getBlock = (type: string) => blockSuite.getBlock(type)
export const createBlock = (type: string, props?: Record<string, unknown>) => blockSuite.createBlock(type, props)
export const installPlugin = (plugin: BlockPlugin) => blockSuite.installPlugin(plugin)
export const uninstallPlugin = (pluginName: string) => blockSuite.uninstallPlugin(pluginName)

// 插件化机制示例
export const createCustomPlugin = (name: string, blocks: BlockDefinition[]): BlockPlugin => ({
  name,
  version: '1.0.0',
  blocks,
  install: () => {
    console.log(`Installing custom plugin: ${name}`)
  },
  uninstall: () => {
    console.log(`Uninstalling custom plugin: ${name}`)
  }
})