/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:00:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\Nodes\Initial-elements.ts
 * @Description: 初始工作流元素配置
 */

import type { Node, Edge } from '@vue-flow/core'
import { Position } from '@vue-flow/core'

// 初始节点
export const initialNodes: Node[] = [
  {
    id: 'input-1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: {
      label: 'Items row',
      type: 'data-source',
      value: 'App interaction',
      description: '应用交互数据源'
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'process-1',
    type: 'process',
    position: { x: 400, y: 200 },
    data: {
      label: 'Shuffle order',
      operation: 'transform',
      description: '随机排序处理',
      transformRule: 'shuffle(items)'
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'output-1',
    type: 'output',
    position: { x: 700, y: 100 },
    data: {
      label: 'Result',
      destination: 'result',
      format: 'json',
      description: '输出处理结果'
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }
]

// 初始连线
export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'input-1',
    target: 'process-1',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: '#3b82f6', 
      strokeWidth: 2 
    }
  },
  {
    id: 'e2-3',
    source: 'process-1',
    target: 'output-1',
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: '#10b981', 
      strokeWidth: 2 
    }
  }
]

// 导出所有初始元素
export const initialElements = [...initialNodes, ...initialEdges]

// 节点类型定义
export const nodeTypes = {
  input: 'input',
  process: 'process', 
  output: 'output'
}

// 边类型定义
export const edgeTypes = {
  default: 'default',
  smoothstep: 'smoothstep',
  step: 'step',
  straight: 'straight'
}

// 工作流模板
export const workflowTemplates = {
  dataProcessing: {
    name: '数据处理流程',
    description: '标准的数据输入-处理-输出流程',
    nodes: [
      {
        id: 'input-template',
        type: 'input',
        position: { x: 50, y: 100 },
        data: {
          label: '数据输入',
          type: 'data-source'
        }
      },
      {
        id: 'process-template',
        type: 'process',
        position: { x: 300, y: 100 },
        data: {
          label: '数据处理',
          operation: 'transform'
        }
      },
      {
        id: 'output-template',
        type: 'output',
        position: { x: 550, y: 100 },
        data: {
          label: '结果输出',
          destination: 'result'
        }
      }
    ],
    edges: [
      {
        id: 'e-template-1',
        source: 'input-template',
        target: 'process-template'
      },
      {
        id: 'e-template-2',
        source: 'process-template',
        target: 'output-template'
      }
    ]
  },
  
  apiWorkflow: {
    name: 'API数据流程',
    description: 'API数据获取和处理流程',
    nodes: [
      {
        id: 'api-input',
        type: 'input',
        position: { x: 50, y: 50 },
        data: {
          label: 'API数据源',
          type: 'api',
          apiUrl: 'https://api.example.com/data'
        }
      },
      {
        id: 'filter-process',
        type: 'process',
        position: { x: 300, y: 50 },
        data: {
          label: '数据过滤',
          operation: 'filter'
        }
      },
      {
        id: 'transform-process',
        type: 'process',
        position: { x: 300, y: 200 },
        data: {
          label: '数据转换',
          operation: 'transform'
        }
      },
      {
        id: 'file-output',
        type: 'output',
        position: { x: 550, y: 125 },
        data: {
          label: '文件导出',
          destination: 'file',
          format: 'json'
        }
      }
    ],
    edges: [
      {
        id: 'e-api-1',
        source: 'api-input',
        target: 'filter-process'
      },
      {
        id: 'e-api-2',
        source: 'filter-process',
        target: 'transform-process'
      },
      {
        id: 'e-api-3',
        source: 'transform-process',
        target: 'file-output'
      }
    ]
  }
}
