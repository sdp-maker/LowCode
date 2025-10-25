<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:30:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\FlowEditor.vue
 * @Description: 简单的工作流画布
-->
<template>
    <div class="flow-editor">
        <div class="flow-container" @click="closeAllMenus">
            <VueFlow v-model="elements" class="basic-flow" :default-viewport="{ zoom: 1 }" :min-zoom="0.2" :max-zoom="4"
                @connect="onConnect">

                <!-- 自定义输入节点 -->
                <template #node-input="{ data, id }">
                    <div class="custom-node input-node">
                        <div class="node-header">
                            {{ data.label }}
                            <div class="node-menu" @click.stop="toggleNodeMenu(id, $event)">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                                <!-- 菜单将通过 Teleport 渲染到外部 -->
                            </div>
                        </div>
                        <div class="node-content">
                            <input v-if="data.nodeType === 'number-input'" type="number" :value="data.value"
                                @input="updateNodeValue(id, 'value', Number(($event.target as HTMLInputElement).value))"
                                class="node-input-field" />
                        </div>
                    </div>
                </template>

                <!-- 自定义处理节点 -->
                <template #node-default="{ data, id }">
                    <div class="custom-node process-node">
                        <div class="node-header">
                            {{ data.label }}
                            <div class="node-menu" @click.stop="toggleNodeMenu(id, $event)">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                                <!-- 菜单将通过 Teleport 渲染到外部 -->
                            </div>
                        </div>
                        <div class="node-content" v-if="data.nodeType === 'math'">
                            <select :value="data.operation"
                                @change="updateNodeValue(id, 'operation', ($event.target as HTMLSelectElement).value)"
                                class="node-select">
                                <option value="+">加法 (+)</option>
                                <option value="-">减法 (-)</option>
                                <option value="*">乘法 (×)</option>
                                <option value="/">除法 (÷)</option>
                            </select>
                            <div class="result-display">结果: {{ data.result || 0 }}</div>
                        </div>
                    </div>
                </template>

                <!-- 自定义输出节点 -->
                <template #node-output="{ data, id }">
                    <div class="custom-node output-node">
                        <div class="node-header">
                            {{ data.label }}
                            <div class="node-menu" @click.stop="toggleNodeMenu(id, $event)">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                                <!-- 菜单将通过 Teleport 渲染到外部 -->
                            </div>
                        </div>
                        <div class="node-content">
                            <div class="result-value">{{ data.value || 0 }}</div>
                        </div>
                    </div>
                </template>

                <!-- 节点选择面板 -->
                <div class="node-panel" :class="{ 'panel-open': showNodePanel }">
                    <button class="panel-toggle" @click="toggleNodePanel">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>

                    <div v-if="showNodePanel" class="node-options">
                        <div class="node-option" @click="addSpecificNode('input')" title="添加输入节点">
                            <div class="node-icon input-icon">📥</div>
                            <span>输入</span>
                        </div>
                        <div class="node-option" @click="addSpecificNode('math')" title="添加数学运算节点">
                            <div class="node-icon math-icon">🔢</div>
                            <span>运算</span>
                        </div>
                        <div class="node-option" @click="addSpecificNode('condition')" title="添加条件判断节点">
                            <div class="node-icon condition-icon">❓</div>
                            <span>条件</span>
                        </div>
                        <div class="node-option" @click="addSpecificNode('output')" title="添加输出节点">
                            <div class="node-icon output-icon">📤</div>
                            <span>输出</span>
                        </div>
                        <div class="divider"></div>
                        <div class="node-option" @click="autoLayoutNodes" title="自动排列节点">
                            <div class="node-icon layout-icon">🎯</div>
                            <span>自动布局</span>
                        </div>
                    </div>
                </div>
            </VueFlow>
        </div>

        <!-- 节点操作菜单 - 使用 Teleport 渲染到外部 -->
        <Teleport to="body">
            <div v-if="activeNodeMenu" class="node-context-menu" :style="menuPosition" @click.stop>
                <div class="menu-item" @click="runNode(activeNodeMenu)">
                    <span class="menu-icon">▶️</span>
                    运行此节点
                </div>
                <div class="menu-item" @click="editNode(activeNodeMenu)">
                    <span class="menu-icon">✏️</span>
                    更改节点
                </div>
                <div class="menu-item" @click="copyNode(activeNodeMenu)">
                    <span class="menu-icon">📋</span>
                    复制节点
                </div>
                <div v-if="isOutputNode(activeNodeMenu)" class="menu-item" @click="exportResult(activeNodeMenu)">
                    <span class="menu-icon">📤</span>
                    导出结果
                </div>
                <div class="menu-divider"></div>
                <div class="menu-item danger" @click="deleteNode(activeNodeMenu)">
                    <span class="menu-icon">🗑️</span>
                    删除节点
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import type { Node, Edge, Connection } from '@vue-flow/core'
import dagre from '@dagrejs/dagre'
import { ElMessage, ElMessageBox } from 'element-plus'

// 初始节点和边
const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: {
            label: '输入A',
            value: 10,
            nodeType: 'number-input'
        },
    },
    {
        id: '2',
        type: 'input',
        position: { x: 100, y: 300 },
        data: {
            label: '输入B',
            value: 5,
            nodeType: 'number-input'
        },
    },
    {
        id: '3',
        type: 'default',
        position: { x: 400, y: 225 },
        data: {
            label: '数学运算',
            operation: '+',
            result: 0,
            nodeType: 'math'
        },
    },
    {
        id: '4',
        type: 'output',
        position: { x: 700, y: 225 },
        data: {
            label: '结果',
            value: 0,
            nodeType: 'result'
        },
    }
]

const initialEdges: Edge[] = [
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        animated: true,
    },
    {
        id: 'e2-3',
        source: '2',
        target: '3',
        animated: true,
    },
    {
        id: 'e3-4',
        source: '3',
        target: '4',
        animated: true,
    }
]

// 流程元素
const elements = ref([...initialNodes, ...initialEdges])

// 节点面板状态
const showNodePanel = ref(false)

// 节点菜单状态
const activeNodeMenu = ref<string | null>(null)
const menuPosition = ref({ top: '0px', left: '0px' })

// Vue Flow 实例
const { addNodes, addEdges } = useVueFlow()

// 连接处理
const onConnect = (params: Connection) => {
    addEdges([{
        id: `e${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        animated: true,
    }])
}

// 节点类型列表
const nodeTypes = [
    { type: 'input', label: '输入节点' },
    { type: 'default', label: '数学运算' },
    { type: 'default', label: '条件判断' },
    { type: 'default', label: '数据处理' },
    { type: 'default', label: '字符串处理' },
    { type: 'default', label: '循环操作' },
    { type: 'default', label: 'API调用' },
    { type: 'output', label: '输出节点' }
]

let nodeCounter = 5 // 从5开始，因为已有4个初始节点

// 切换节点面板
const toggleNodePanel = () => {
    showNodePanel.value = !showNodePanel.value
    activeNodeMenu.value = null // 关闭任何打开的节点菜单
}

// 切换节点菜单
const toggleNodeMenu = (nodeId: string, event?: Event) => {
    if (activeNodeMenu.value === nodeId) {
        activeNodeMenu.value = null
    } else {
        activeNodeMenu.value = nodeId

        // 计算菜单位置
        if (event) {
            const target = event.currentTarget as HTMLElement
            const rect = target.getBoundingClientRect()
            menuPosition.value = {
                top: `${rect.bottom + 5}px`,
                left: `${rect.right - 140}px`
            }
        }
    }
    showNodePanel.value = false // 关闭节点面板
}

// 判断是否为输出节点
const isOutputNode = (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    return node && (node.type === 'output' || node.data.nodeType === 'result')
}

// 关闭所有菜单
const closeAllMenus = () => {
    activeNodeMenu.value = null
    showNodePanel.value = false
}

// 运行单个节点
const runNode = (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    if (node) {
        console.log(`运行节点: ${node.data.label}`)

        // 添加运行动画效果
        const nodeElement = document.querySelector(`[data-id="${nodeId}"]`)
        if (nodeElement) {
            nodeElement.classList.add('node-running')
            setTimeout(() => {
                nodeElement.classList.remove('node-running')
            }, 1000)
        }

        // 如果是数学节点，重新计算
        if (node.data.nodeType === 'math') {
            calculateMathResult(nodeId)
        }

        ElMessage.success(`节点 "${node.data.label}" 运行完成！`)
    }
    activeNodeMenu.value = null
}

// 编辑节点
const editNode = async (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    if (node) {
        try {
            const { value } = await ElMessageBox.prompt('请输入新的节点名称:', '编辑节点', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: node.data.label
            })
            if (value && value.trim()) {
                node.data.label = value.trim()
                ElMessage.success('节点名称已更新')
            }
        } catch {
            // 用户取消了操作
        }
    }
    activeNodeMenu.value = null
}

// 复制节点
const copyNode = (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    if (node) {
        const newId = `node-${Date.now()}`
        const newNode: Node = {
            ...node,
            id: newId,
            position: {
                x: node.position.x + 50,
                y: node.position.y + 50
            },
            data: {
                ...node.data,
                label: `${node.data.label} (副本)`
            }
        }
        addNodes([newNode])
        ElMessage.success(`已复制节点: ${node.data.label}`)
    }
    activeNodeMenu.value = null
}

// 删除节点
const deleteNode = async (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    if (node) {
        try {
            await ElMessageBox.confirm(
                `确定要删除节点 "${node.data.label}" 吗？此操作不可撤销。`,
                '删除节点',
                {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning',
                    confirmButtonClass: 'el-button--danger'
                }
            )

            // 删除节点和相关的边
            elements.value = elements.value.filter(el => {
                if ('data' in el) {
                    return el.id !== nodeId
                } else {
                    const edge = el as Edge
                    return edge.source !== nodeId && edge.target !== nodeId
                }
            })
            ElMessage.success(`已删除节点: ${node.data.label}`)
        } catch {
            // 用户取消了删除操作
        }
    }
    activeNodeMenu.value = null
}

// 导出结果
const exportResult = (nodeId: string) => {
    const node = elements.value.find(el => el.id === nodeId && 'data' in el) as Node
    if (node) {
        const result = {
            nodeId,
            label: node.data.label,
            value: node.data.value,
            timestamp: new Date().toISOString()
        }

        // 创建下载链接
        const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${node.data.label}_result.json`
        a.click()
        URL.revokeObjectURL(url)

        ElMessage.success(`结果已导出: ${node.data.label}_result.json`)
    }
    activeNodeMenu.value = null
}

// 添加特定类型的节点
const addSpecificNode = (nodeType: string) => {
    const id = `node-${nodeCounter++}`
    let newNode: Node

    switch (nodeType) {
        case 'input':
            newNode = {
                id,
                type: 'input',
                position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
                data: {
                    label: '输入节点',
                    value: 0,
                    nodeType: 'number-input'
                },
            }
            break
        case 'math':
            newNode = {
                id,
                type: 'default',
                position: { x: Math.random() * 400 + 300, y: Math.random() * 300 + 150 },
                data: {
                    label: '数学运算',
                    operation: '+',
                    result: 0,
                    nodeType: 'math'
                },
            }
            break
        case 'condition':
            newNode = {
                id,
                type: 'default',
                position: { x: Math.random() * 400 + 300, y: Math.random() * 300 + 150 },
                data: {
                    label: '条件判断',
                    condition: '>',
                    threshold: 0,
                    nodeType: 'condition'
                },
            }
            break
        case 'output':
            newNode = {
                id,
                type: 'output',
                position: { x: Math.random() * 400 + 500, y: Math.random() * 300 + 100 },
                data: {
                    label: '输出节点',
                    value: 0,
                    nodeType: 'result'
                },
            }
            break
        default:
            return
    }

    addNodes([newNode])
    showNodePanel.value = false // 添加后关闭面板
}

// 使用 dagre 进行自动布局
const autoLayoutNodes = () => {
    const g = new dagre.graphlib.Graph()
    g.setDefaultEdgeLabel(() => ({}))
    g.setGraph({ rankdir: 'LR', ranksep: 200, nodesep: 100 })

    const nodes = elements.value.filter(el => 'data' in el) as Node[]
    const edges = elements.value.filter(el => 'source' in el) as Edge[]

    // 添加节点到 dagre 图
    nodes.forEach(node => {
        g.setNode(node.id, { width: 140, height: 80 })
    })

    // 添加边到 dagre 图
    edges.forEach(edge => {
        g.setEdge(edge.source, edge.target)
    })

    // 计算布局
    dagre.layout(g)

    // 应用新位置并添加动画
    nodes.forEach(node => {
        const nodeWithPosition = g.node(node.id)
        if (nodeWithPosition && nodeWithPosition.x !== undefined && nodeWithPosition.y !== undefined) {
            animateNodeToPosition(node, nodeWithPosition.x - 70, nodeWithPosition.y - 40)
        }
    })

    showNodePanel.value = false // 布局后关闭面板
}

// 节点位置动画
const animateNodeToPosition = (node: Node, targetX: number, targetY: number) => {
    const startX = node.position.x
    const startY = node.position.y
    const duration = 1000 // 动画持续时间
    const startTime = Date.now()

    const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutCubic 缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        node.position.x = startX + (targetX - startX) * easeProgress
        node.position.y = startY + (targetY - startY) * easeProgress

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

// 更新节点值
const updateNodeValue = (nodeId: string, key: string, value: any) => {
    const nodeIndex = elements.value.findIndex(el => el.id === nodeId && 'data' in el)
    if (nodeIndex !== -1) {
        const node = elements.value[nodeIndex] as Node
        node.data = { ...node.data, [key]: value }

        // 如果是数学运算节点，自动计算结果
        if (node.data.nodeType === 'math') {
            calculateMathResult(nodeId)
        }
    }
}

// 计算数学运算结果
const calculateMathResult = (mathNodeId: string) => {
    const mathNode = elements.value.find(el => el.id === mathNodeId && 'data' in el) as Node
    if (!mathNode) return

    // 找到连接到这个数学节点的输入节点
    const inputEdges = elements.value.filter(el =>
        'target' in el && el.target === mathNodeId
    ) as Edge[]

    const inputValues: number[] = []
    inputEdges.forEach(edge => {
        const inputNode = elements.value.find(el => el.id === edge.source && 'data' in el) as Node
        if (inputNode && inputNode.data.nodeType === 'number-input') {
            inputValues.push(Number(inputNode.data.value) || 0)
        }
    })

    if (inputValues.length >= 2) {
        let result = 0
        const operation = mathNode.data.operation
        const a = inputValues[0] || 0
        const b = inputValues[1] || 0

        switch (operation) {
            case '+':
                result = a + b
                break
            case '-':
                result = a - b
                break
            case '*':
                result = a * b
                break
            case '/':
                result = b !== 0 ? a / b : 0
                break
        }

        // 更新数学节点的结果
        mathNode.data.result = result

        // 更新连接到数学节点的输出节点
        const outputEdges = elements.value.filter(el =>
            'source' in el && el.source === mathNodeId
        ) as Edge[]

        outputEdges.forEach(edge => {
            const outputNode = elements.value.find(el => el.id === edge.target && 'data' in el) as Node
            if (outputNode && outputNode.data.nodeType === 'result') {
                outputNode.data.value = result
            }
        })
    }
}

// 添加节点
const addNode = () => {
    const randomType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)]
    const id = `node-${nodeCounter++}`

    let nodeData = { label: randomType.label }

    // 根据节点类型设置不同的数据
    if (randomType.type === 'input') {
        nodeData = {
            ...nodeData,
            value: 0,
            nodeType: 'number-input'
        }
    } else if (randomType.label === '数学运算') {
        nodeData = {
            ...nodeData,
            operation: '+',
            result: 0,
            nodeType: 'math'
        }
    } else if (randomType.type === 'output') {
        nodeData = {
            ...nodeData,
            value: 0,
            nodeType: 'result'
        }
    }

    const newNode: Node = {
        id,
        type: randomType.type,
        position: { x: Math.random() * 600 + 100, y: Math.random() * 400 + 100 },
        data: nodeData,
    }
    addNodes([newNode])
}

// 初始化时计算结果
onMounted(() => {
    // 延迟一点执行，确保 DOM 已渲染
    setTimeout(() => {
        calculateMathResult('3')
    }, 100)
})

// 监听输入节点值变化，自动重新计算
watch(elements, () => {
    // 当任何输入节点值变化时，重新计算所有数学节点
    const mathNodes = elements.value.filter(el =>
        'data' in el && el.data.nodeType === 'math'
    ) as Node[]

    mathNodes.forEach(node => {
        calculateMathResult(node.id)
    })
}, { deep: true })
</script>

<style scoped>
.flow-editor {
    @apply h-full w-full bg-gray-50;
    height: 100vh;
    width: 100vw;
}

.flow-container {
    @apply relative;
    height: calc(100vh - 0px);
    width: 100%;
}

.basic-flow {
    @apply w-full h-full;
    height: 100%;
    width: 100%;
}

/* 节点选择面板 */
.node-panel {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

.panel-toggle {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    color: white;
}

.panel-toggle:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 20px 35px -5px rgba(59, 130, 246, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.panel-open .panel-toggle {
    transform: rotate(45deg);
}

.node-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.node-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 100px;
}

.node-option:hover {
    background: #f1f5f9;
    transform: translateX(-2px);
}

.node-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 14px;
}

.input-icon {
    background: #eff6ff;
    color: #1d4ed8;
}

.math-icon {
    background: #fffbeb;
    color: #d97706;
}

.condition-icon {
    background: #fef2f2;
    color: #dc2626;
}

.output-icon {
    background: #f0fdf4;
    color: #059669;
}

.layout-icon {
    background: #f3f4f6;
    color: #6b7280;
}

.divider {
    height: 1px;
    background: #e2e8f0;
    margin: 4px 0;
}

.node-option span {
    font-size: 13px;
    font-weight: 500;
    color: #374151;
}

/* Vue Flow 基础样式 - 参考官方示例 */
:deep(.vue-flow__background) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

:deep(.vue-flow__edge) {
    stroke: #64748b;
    stroke-width: 3;
    opacity: 0.8;
}

:deep(.vue-flow__edge.animated) {
    stroke: #3b82f6;
    stroke-width: 3;
    stroke-dasharray: 8, 4;
    animation: dashdraw 1s linear infinite;
    opacity: 1;
}

:deep(.vue-flow__edge:hover) {
    stroke: #1d4ed8;
    stroke-width: 4;
    opacity: 1;
}

:deep(.vue-flow__handle) {
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

:deep(.vue-flow__handle:hover) {
    transform: scale(1.2);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

:deep(.vue-flow__handle-source) {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

:deep(.vue-flow__handle-target) {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

/* 选中状态样式 */
:deep(.vue-flow__node.selected) {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
}

@keyframes dashdraw {
    to {
        stroke-dashoffset: -12;
    }
}

/* 优化拖拽性能和流畅度 */
:deep(.vue-flow__node) {
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    will-change: transform;
}

:deep(.vue-flow__node:hover) {
    transform: translateY(-1px);
}

:deep(.vue-flow__node.dragging) {
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 1000;
    transition: none;
    /* 拖拽时禁用过渡动画 */
}

/* 拖拽时的光标 */
:deep(.vue-flow__node.dragging) {
    cursor: grabbing !important;
}

:deep(.vue-flow__node) {
    cursor: grab;
}

/* 连接点脉冲动画 */
@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }

    50% {
        box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
    }
}

:deep(.vue-flow__handle.connecting) {
    animation: pulse 1s infinite;
}

/* 节点运行动画 */
:deep(.node-running) {
    animation: nodeRunning 1s ease-in-out;
    border-color: #10b981 !important;
}

@keyframes nodeRunning {

    0%,
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }

    25% {
        transform: scale(1.05);
        box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.4);
    }

    50% {
        transform: scale(1.1);
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.2);
    }

    75% {
        transform: scale(1.05);
        box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.1);
    }
}

/* 自定义节点样式 - 参考 Vue Flow 官方示例 */
.custom-node {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    min-width: 140px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.custom-node:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
}

.input-node {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
}

.input-node .node-header {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
}

.process-node {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.process-node .node-header {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.output-node {
    border-color: #10b981;
    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.output-node .node-header {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.node-header {
    padding: 12px 16px;
    font-weight: 600;
    font-size: 13px;
    text-align: center;
    color: #374151;
    margin: 0;
    border-bottom: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* 节点菜单样式 */
.node-menu {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.6;
}

.node-menu:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
}

/* 外部节点上下文菜单 */
.node-context-menu {
    position: fixed;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    min-width: 140px;
    z-index: 9999;
    animation: menuSlideIn 0.2s ease-out;
    overflow: hidden;
}

.menu-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 4px 0;
}

@keyframes menuSlideIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 12px;
    color: #374151;
}

.menu-item:hover {
    background: #f8fafc;
}

.menu-item.danger {
    color: #dc2626;
}

.menu-item.danger:hover {
    background: #fef2f2;
}

.menu-icon {
    font-size: 12px;
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.node-content {
    padding: 16px;
}

.node-input-field {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    background: #f8fafc;
    transition: all 0.2s ease;
}

.node-input-field:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.node-select {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    background: #f8fafc;
    transition: all 0.2s ease;
}

.node-select:focus {
    outline: none;
    border-color: #f59e0b;
    background: white;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.result-display {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #d97706;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #f59e0b;
}

.result-value {
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    color: #059669;
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #10b981;
    letter-spacing: 0.5px;
}
</style>