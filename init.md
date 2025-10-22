<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:13:34
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 17:13:42
 * @FilePath: \LowCode\init.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE   
-->
# 初始化项目
1. npm init -y
因为是基于monorepo，所以需要安装pnpm
创建文件夹apps， packages
//pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
2.流式布局