export const tabStyles = {
  container: 'flex gap-1 p-1 bg-gray-100 rounded-lg w-full',
  button: 'flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 text-center',
  buttonActive: 'bg-white text-gray-900 shadow-sm',
  buttonInactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',

  // Compact variant
  compact: {
    container: 'flex gap-1 p-1 bg-gray-100 rounded-lg w-fit',
    button: 'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
  },

  // Underline variant
  underline: {
    container: 'flex gap-8 border-b border-gray-200',
    button: 'pb-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px',
    buttonActive: 'border-primary text-primary',
    buttonInactive: 'border-transparent text-gray-600 hover:text-gray-900',
  }
} as const;