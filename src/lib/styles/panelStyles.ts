export const panelStyles = {
  base: 'bg-white border border-gray-200 rounded-lg shadow-sm',
  padded: 'p-6',
  header: 'border-b border-gray-200 px-6 py-4',
  title: 'text-lg font-semibold text-gray-900',
  body: 'p-6',
  footer: 'border-t border-gray-200 px-6 py-4 bg-gray-50',

  // Variants
  elevated: 'shadow-lg hover:shadow-xl transition-shadow',
  flat: 'shadow-none border-0',
  outline: 'bg-transparent shadow-none',

  // Colors
  primary: 'border-primary bg-primary-light',
  secondary: 'border-secondary bg-secondary-light',
  success: 'border-success bg-success-light',
  warning: 'border-warning bg-warning-light',
  danger: 'border-danger bg-danger-light',
} as const;

export const cardStyles = {
  base: 'bg-white rounded-xl overflow-hidden transition-all duration-300',
  interactive: 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
  padded: 'p-6',
  image: 'w-full h-48 object-cover',
  title: 'text-xl font-semibold text-gray-900 mb-2',
  description: 'text-gray-600 line-height-relaxed',
} as const;