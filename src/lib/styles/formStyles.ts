export const formStyles = {
  group: 'mb-4',
  label: 'block text-sm font-medium text-gray-700 mb-1',
  labelRequired: 'after:content-["*"] after:ml-0.5 after:text-danger',

  input: {
    base: 'block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200',
    error: 'border-danger focus:ring-danger',
    success: 'border-success focus:ring-success',
    disabled: 'bg-gray-100 cursor-not-allowed opacity-60',
  },

  textarea: {
    base: 'block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-all duration-200',
    error: 'border-danger focus:ring-danger',
  },

  select: {
    base: 'block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200',
    error: 'border-danger focus:ring-danger',
  },

  checkbox: {
    wrapper: 'flex items-start',
    input: 'mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary',
    label: 'ml-2 text-sm text-gray-700',
  },

  radio: {
    wrapper: 'flex items-center',
    input: 'h-4 w-4 text-primary border-gray-300 focus:ring-primary',
    label: 'ml-2 text-sm text-gray-700',
  },

  error: 'mt-1 text-sm text-danger',
  hint: 'mt-1 text-sm text-gray-500',
} as const;