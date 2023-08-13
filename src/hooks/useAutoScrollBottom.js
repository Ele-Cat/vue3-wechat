import { onUpdated, onMounted } from "vue";

export default function useAutoScrollBottom(component) {
  onUpdated(() => {
    toBottom();
  });

  onMounted(() => {
    toBottom();
  });

  const toBottom = () => {
    if (!component || !component.value) return;
    component.value.scrollTop = component.value.scrollHeight;
  };
}
