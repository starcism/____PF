import Image from "next/image"
import { VoidExpression } from "typescript"

interface Props {
  key: number
  blobUrl: string
  onDelete: (key: number) => void
}

export default function PreviewImage({ key, blobUrl, onDelete }: Props) {
  return (
    <div key={key} className="relative flex-shrink-0 h-[95px] w-[85px] ml-[20px] rounded-[10px]">
      <button className="absolute top-0 right-0 text-black rounded-full w-6 h-6 flex items-center justify-center" onClick={() => onDelete(key)}>
        X
      </button>
      <Image src={blobUrl} fill alt={`Image Preview`} className="h-full w-full object-cover rounded-[10px]" />
    </div>
  )
}
