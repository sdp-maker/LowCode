/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 18:17:21
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 18:21:09
 * @FilePath: \LowCode\stylelint.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss'
    ],
    overrides: [
        {
            files: ['**/*.vue'],
            extends: [
                'stylelint-config-standard',
                'stylelint-config-standard-vue',
                'stylelint-config-standard-scss'
            ],
            rules: {
                // 允许 Vue 单文件组件中的特定语法
                'selector-pseudo-class-no-unknown': [
                    true,
                    {
                        ignorePseudoClasses: ['deep', 'global']
                    }
                ]
            }
        }
    ]
}