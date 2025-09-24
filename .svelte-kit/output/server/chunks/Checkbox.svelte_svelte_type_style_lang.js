import { d as derived, w as writable } from "./index.js";
function createModalStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    open: (modal2) => {
      const id = Math.random().toString(36).substring(7);
      update((modals2) => [...modals2, { ...modal2, id }]);
      return id;
    },
    close: (id) => {
      update((modals2) => {
        if (id) {
          return modals2.filter((m) => m.id !== id);
        }
        return modals2.slice(0, -1);
      });
    },
    closeAll: () => set([])
  };
}
const modals = createModalStore();
derived(modals, ($modals) => $modals.length > 0);
const modal = {
  form: (props) => {
    return modals.open({
      type: "form",
      title: props?.title || "Contact Us",
      props
    });
  },
  image: (src, alt) => {
    return modals.open({
      type: "image",
      content: { src, alt }
    });
  },
  video: (url, title) => {
    return modals.open({
      type: "video",
      title,
      content: { url }
    });
  },
  confirm: (title, message, onConfirm, onCancel) => {
    return modals.open({
      type: "confirm",
      title,
      content: message,
      onConfirm,
      onCancel
    });
  },
  alert: (title, message, autoDismiss = false) => {
    const id = modals.open({
      type: "alert",
      title,
      content: message
    });
    if (autoDismiss) {
      setTimeout(() => modals.close(id), 3e3);
    }
    return id;
  }
};
export {
  modal as a,
  modals as m
};
