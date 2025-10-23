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
  {
    type: 'heroTitle',
    name: 'Title',
    icon: 'H',
    category: 'Layout',
    material: TextBlock, // 复用 TextBlock
    defaultProps: { 
      content: 'Hero Title',
      align: 'center',
      fontSize: 24,
      color: '#000000',
      backgroundColor: '#ffffff'
    }
  },
  {
    type: 'quote',
    name: 'Quote',
    icon: '“',
    category: 'Content',
    material: QuoteBlock,
    defaultProps: {}
  },
  {
    type: 'chart',
    name: 'Charts',
    icon: '📊',
    category: 'Data',
    material: ChartBlock,
    defaultProps: {}
  },
  {
    type: 'image',
    name: 'Image',
    icon: '🖼️',
    category: 'Media',
    material: ImageBlock,
    defaultProps: { src: 'https://picsum.photos/200/300' }
  },
  {
    type: 'notes',
    name: 'Notes',
    icon: '📝',
    category: 'Content',
    material: NotesBlock,
    defaultProps: {}
  },
  {
    type: 'view',
    name: 'View',
    icon: '🖼️',
    category: 'Layout',
    material: ViewBlock,
    defaultProps: {}
  },
  {
    type: 'button',
    name: 'Button',
    icon: '🔘',
    category: 'Action',
    material: ButtonBlock,
    defaultProps: { 
      buttonText: 'Click me',
      buttonType: 'primary',
      width: 120,
      height: 40,
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    }
  },
  {
    type: 'form',
    name: 'Form',
    icon: '📋',
    category: 'Action',
    material: FormBlock,
    defaultProps: {}
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