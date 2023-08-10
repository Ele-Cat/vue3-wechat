import { onUpdated, onMounted } from "vue";

export default function useAutoScrollBottom(component) {
  if (!component) return;

  onUpdated(() => {
    toBottom();
  });

  onMounted(() => {
    toBottom();
  });

  const toBottom = () => {
    component.value.scrollTop = component.value.scrollHeight;
  };
}
