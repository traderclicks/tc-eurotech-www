export const alertStyles = {
  base: 'alert-base',

  variants: {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    danger: 'alert-danger',
  },

  icon: 'alert-icon',
  title: 'alert-title',
  message: 'alert-message',
  close: 'alert-close',
} as const;

export const badgeStyles = {
  base: 'badge-base',

  variants: {
    default: 'badge-default',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
  },

  sizes: {
    small: 'badge-small',
    medium: 'badge-medium',
    large: 'badge-large',
  },
} as const;