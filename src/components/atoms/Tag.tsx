interface Props {
  text: string
  key?: number
}

export default function Tag({ text, key }: Props) {
  return (
    <div className="flex items-center justify-center bg-white w-[60px] h-[24px] my-1 rounded-[10px] border border-solid border-gray-2">
      <span className="text-[12px] text-gray-4">{`#${text}`}</span>
    </div>
  )
}
