export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-danger text-white hover:bg-danger-dark focus:ring-danger',
    success: 'bg-success text-white hover:bg-success-dark focus:ring-success',
    warning: 'bg-warning text-white hover:bg-warning-dark focus:ring-warning',
  },

  sizes: {
    small: 'text-sm px-3 py-1.5 rounded-md',
    medium: 'text-base px-4 py-2 rounded-lg',
    large: 'text-lg px-6 py-3 rounded-lg',
  },

  fullWidth: 'w-full',

  loading: 'relative text-transparent pointer-events-none',
} as const;

export type ButtonVariant = keyof typeof buttonStyles.variants;
export type ButtonSize = keyof typeof buttonStyles.sizes;