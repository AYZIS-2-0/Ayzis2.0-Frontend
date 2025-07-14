export default function Button({ children, icon, onClick, variant = 'primary', disabled = false }) {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md w-full`}
    >
      <div className={
        `flex items-center justify-between px-2 py-2 rounded-lg transition-colors gap-2
        ${variant === 'primary' ?
          'bg-blue-600 text-white hover:bg-blue-900'
          :
          'bg-none text-white border border-white hover:bg-gray-700 '}
          ${disabled ?
          'opacity-50 cursor-not-allowed'
          :
          ''}`
      }>

        {children && (
          <div>
            {children}
          </div>
        )}

      {icon && (
        <div className="">
          {icon}
        </div>
      )}
      </div>
    </button>
  )
}
