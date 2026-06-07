import { writable, derived } from 'svelte/store';
import { site } from '$lib/config/site';

export type ModalType = 'form' | 'image' | 'video' | 'confirm' | 'alert' | 'custom' | 'insurance' | 'cognito';

interface Modal {
  id: string;
  type: ModalType;
  title?: string;
  content?: any;
  props?: Record<string, any>;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function createModalStore() {
  const { subscribe, set, update } = writable<Modal[]>([]);

  return {
    subscribe,
    open: (modal: Omit<Modal, 'id'>) => {
      const id = Math.random().toString(36).substring(7);
      update((modals) => [...modals, { ...modal, id }]);
      return id;
    },
    close: (id?: string) => {
      update((modals) => {
        if (id) {
          return modals.filter((m) => m.id !== id);
        }
        // Close the last modal if no id provided
        return modals.slice(0, -1);
      });
    },
    closeAll: () => set([]),
  };
}

export const modals = createModalStore();

// Derived store to check if any modal is open
export const isModalOpen = derived(modals, ($modals) => $modals.length > 0);

// Helper functions for common modal types
export const modal = {
  form: (props?: Record<string, any>) => {
    return modals.open({
      type: 'form',
      title: props?.title || 'Contact Us',
      props
    });
  },

  image: (src: string, alt?: string) => {
    return modals.open({
      type: 'image',
      content: { src, alt }
    });
  },

  video: (url: string, title?: string) => {
    return modals.open({
      type: 'video',
      title,
      content: { url }
    });
  },

  confirm: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
    return modals.open({
      type: 'confirm',
      title,
      content: message,
      onConfirm,
      onCancel
    });
  },

  alert: (title: string, message: string, autoDismiss = false) => {
    const id = modals.open({
      type: 'alert',
      title,
      content: message
    });

    if (autoDismiss) {
      setTimeout(() => modals.close(id), 3000);
    }

    return id;
  },

  insurance: () => {
    return modals.open({
      type: 'insurance',
      title: 'Insurance Contacts'
    });
  },

  cognito: (formId?: string, title?: string) => {
    return modals.open({
      type: 'cognito',
      title: title || 'Repair Quote Request Form',
      content: { formId: formId || site.cognitoFormId }
    });
  }
};