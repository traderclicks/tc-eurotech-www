export const tableStyles = {
  wrapper: 'border border-gray-200 rounded-lg overflow-hidden',
  table: 'min-w-full divide-y divide-gray-200',
  thead: 'bg-gray-50',
  tbody: 'bg-white divide-y divide-gray-200',
  th: 'text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
  td: 'px-6 py-4 text-gray-700 whitespace-nowrap',
  tr: 'hover:bg-gray-50 transition-colors',

  // Compact variant
  compact: {
    th: 'text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider',
    td: 'px-4 py-2 text-sm text-gray-700',
  },

  // Striped variant
  striped: {
    evenRow: 'bg-gray-50',
    oddRow: 'bg-white',
  },
} as const;

export const filterStyles = {
  container: 'flex gap-1 p-1 bg-gray-100 rounded-lg w-fit',
  button: 'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
  buttonActive: 'bg-gray-900 text-white',
  buttonInactive: 'text-gray-700 hover:bg-gray-200',
} as const;