import { DummyIcon } from '../atoms/UserIcon'

interface Props {
  liked: number
  commentCount: number
}

export default function LoadingCommentArea({ liked, commentCount }: Props) {
  return (
    <>
      <div className="px-[13px]">
        <div className="flex items-center h-[40px]">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-[50%] w-[24px] h-[24px] ml-[8px] text-pinkish">
              <svg
                className={`inline-block align-middle w-[24px] h-[24px] fill-none hover:text-lightpinkish
                `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                strokeWidth={1.3}
                stroke="currentColor"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </div>
            <span className="text-[14px] ml-[4px] weight-400 select-none text-pinkish">{liked}</span>
          </div>
          <div className="ml-[4px] flex items-center">
            <div className="flex items-center justify-center select-none ml-[6px] rounded-[50%] w-[24px] h-[24px] text-turquoise">
              <svg
                className="inline-block align-middle mb-[1px] w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </div>
            <span className="text-[14px] ml-[4px] weight-400 select-none text-turquoise">{commentCount}</span>
          </div>
        </div>
        <div className="flex w-full py-[8px] pr-[8px]">
          <div className="h-full w-[40px] pt-[4px] mr-[8px] flex">
            <DummyIcon />
          </div>
          <div className="flex border border-solid border-gray-3 rounded-[20px] w-[100vw]">
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
