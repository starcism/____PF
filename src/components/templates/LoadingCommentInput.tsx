import { DummyIcon } from '../atoms/UserIcon'

interface Props {
}

export default function LoadingCommentInput({}: Props) {
  return (
    <>
      <div className="px-[13px]">
        <div className="flex w-full py-[8px] pr-[8px]">
          <div className="h-full w-[40px] pt-[4px] mr-[8px] flex">
            <DummyIcon />
          </div>
          <div className="flex border border-solid border-gray-3 rounded-[20px] w-[100vw] max-w-[768px]">
            <div
              className={`w-full max-h-[150px] rounded-[20px] leading-[22px] max-w-[800px] pl-[15px] py-[10px] outline-none resize-none text-[14px] overflow-y-auto scrollbar-hide font-400 placeholder:text-gray-3`}
              style={{ height: '44px' }}
            />
            <div className={`flex-col w-[80px] items-end justify-end max-h-[150px] select-none rounded-[20px]`} style={{ height: '44px' }}>
              <div className="flex justify-center font-sans text-lightgold text-outlined items-center h-full w-[64px] text-[14px]">GIF</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
