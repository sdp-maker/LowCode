/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:46:31
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 18:14:28
 * @FilePath: \LowCode\eslint.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import pluginImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'



export default [
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-console": "off"
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            globals: globals.browser
        },
        plugins: {
            '@typescript-eslint': tseslint
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "no-console": "off"
        }
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: parserVue,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            globals: {...globals.browser, 
                computed: 'readonly',
                reactive: 'readonly',
                ref: 'readonly',
                onMounted: 'readonly',
                onUpdated: 'readonly',
                onUnmounted: 'readonly',
                onBeforeMount: 'readonly',
                onBeforeUpdate: 'readonly',
                onAfterUpdate: 'readonly',
                onBeforeUnmount: 'readonly',
                onActivated: 'readonly',
                onDeactivated: 'readonly',
                onErrorCaptured: 'readonly',
                defineExpose: 'readonly',
                watch: 'readonly',
                watchEffect: 'readonly',
            }
            
        },
        plugins: {
            vue: pluginVue,
            'simple-import-sort': pluginImportSort
        },
        rules: {
            ...pluginVue.configs['flat/recommended'].rules,
            "no-console": "off"
        }
    }
]
