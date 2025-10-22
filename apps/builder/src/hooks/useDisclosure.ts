import { ref, type Ref } from "vue";

/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-22 14:51:20
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:53:55
 * @FilePath: \LowCode\apps\builder\src\hooks\useDisclcosure.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
 */

type UseDisclosureReturn = [
  Ref<boolean>,
  {
    open: () => void,
    close: () => void,
    toggle: () => void
  }
]
export const useDisclosure = ( initialValue = false ): UseDisclosureReturn => {
  const flag = ref(initialValue);
  const open = () => {
    flag.value = true;
  }
  const close = () => {
    flag.value = false;
  }
  const toggle = () => {
    flag.value = !flag.value;
  }
  return [
    flag,
    {
      open,
      close,
      toggle
    }
  ]
}