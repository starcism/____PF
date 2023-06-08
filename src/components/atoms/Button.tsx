'use client'

interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function ClearButton({ onClick }: IButton) {
  return (
    <button
      onClick={onClick}
      className="h-[2rem] w-[2rem] flex items-center justify-center mr-1 text-[#373737] rounded-[50%] hover:bg-[rgba(0, 0, 0, 0.05)] duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-viva-gray-1">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}
