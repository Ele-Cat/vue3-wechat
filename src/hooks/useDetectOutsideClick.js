import { onBeforeUnmount, onMounted } from "vue";

/**
 * 监听点击了盒子外部
 * @param {ref} component ref绑定的dom
 * @param {function} callback 回调
 * @returns 
 */
export default function useDetectOutsideClick(component, callback) {
  if (!component) return;
  const listener = (event) => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value)
    ) {
      return;
    }
    if (typeof callback === "function") {
      callback();
    }
  };
  onMounted(() => {
    window.addEventListener("click", listener);
    window.addEventListener("contextmenu", listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
    window.removeEventListener("contextmenu", listener);
  });

  return { listener };
}
