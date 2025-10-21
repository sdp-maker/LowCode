/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 18:35:21
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 18:35:48
 * @FilePath: \LowCode\commitlint.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    // 类型枚举，git提交type必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复
        'docs',     // 文档变更
        'style',    // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不是增加feature，也不是修复bug)
        'perf',     // 性能优化
        'test',     // 增加测试
        'chore',    // 构建过程或辅助工具的变动
        'revert',   // 回滚
        'build',    // 打包
        'ci',       // CI配置
        'release',  // 发布
        'workflow', // 工作流
        'wip',      // 开发中
        'types',    // 类型定义文件更改
        'conf',     // 配置文件更改
        'init',     // 初始化
        'deps',     // 依赖更新
        'remove',   // 删除文件/代码
        'temp',     // 临时提交
      ],
    ],
    // subject大小写不做校验
    'subject-case': [0],
    // subject不能为空
    'subject-empty': [2, 'never'],
    // subject以.结尾
    'subject-full-stop': [2, 'never', '.'],
    // type不能为空
    'type-empty': [2, 'never'],
    // scope不能为空
    'scope-empty': [0],
    // scope格式
    'scope-enum': [2, 'always', ['*', 'ui', 'ux', 'api', 'db', 'perf', 'style', 'refactor', 'test', 'docs', 'chore', 'build', 'ci', 'release', 'deps']],
    // 最大行长度100
    'header-max-length': [2, 'always', 100],
    // body换行长度限制
    'body-max-line-length': [2, 'always', 100],
    // footer换行长度限制
    'footer-max-line-length': [2, 'always', 100],
  },
  // 自定义解析器
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
    },
  },
  // 提示信息
  prompt: {
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个提交范围 (可选):',
      subject: '写一个简短的变化描述 (必填):',
      body: '写一个详细的变更描述 (可选). 使用 "|" 换行:\n',
      breaking: '列出任何BREAKING CHANGES (可选). 使用 "|" 换行:\n',
      footer: '关联关闭的issue 例如: #31, #34 (可选). 使用 "|" 换行:\n',
    },
    questions: {
      type: {
        description: '选择你要提交的类型:',
        enum: [
          {
            value: 'feat',
            name: 'feat:     新功能',
            emoji: '✨',
          },
          {
            value: 'fix',
            name: 'fix:      修复',
            emoji: '🐛',
          },
          {
            value: 'docs',
            name: 'docs:     文档变更',
            emoji: '📝',
          },
          {
            value: 'style',
            name: 'style:    代码格式(不影响代码运行的变动)',
            emoji: '💄',
          },
          {
            value: 'refactor',
            name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
            emoji: '♻️',
          },
          {
            value: 'perf',
            name: 'perf:     性能优化',
            emoji: '⚡️',
          },
          {
            value: 'test',
            name: 'test:     增加测试',
            emoji: '✅',
          },
          {
            value: 'chore',
            name: 'chore:    构建过程或辅助工具的变动',
            emoji: '🔧',
          },
          {
            value: 'revert',
            name: 'revert:   回滚',
            emoji: '⏪️',
          },
          {
            value: 'build',
            name: 'build:    打包',
            emoji: '📦️',
          },
          {
            value: 'ci',
            name: 'ci:       CI配置',
            emoji: '👷',
          },
          {
            value: 'release',
            name: 'release:  发布',
            emoji: '🎉',
          },
          {
            value: 'workflow',
            name: 'workflow: 工作流',
            emoji: '🔄',
          },
          {
            value: 'wip',
            name: 'wip:      开发中',
            emoji: '🚧',
          },
          {
            value: 'types',
            name: 'types:    类型定义文件更改',
            emoji: '🏷️',
          },
          {
            value: 'conf',
            name: 'conf:     配置文件更改',
            emoji: '🔧',
          },
          {
            value: 'init',
            name: 'init:     初始化',
            emoji: '🎬',
          },
          {
            value: 'deps',
            name: 'deps:     依赖更新',
            emoji: '➕',
          },
          {
            value: 'remove',
            name: 'remove:   删除文件/代码',
            emoji: '🗑️',
          },
          {
            value: 'temp',
            name: 'temp:     临时提交',
            emoji: '🔥',
          },
        ],
      },
    },
  },
}