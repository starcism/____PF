'use client'

import UserIcon from '../atoms/UserIcon'
import Divider from '../atoms/Divider'
import Link from 'next/link'
import formatDate from '@/libs/getFormDate'
import { IPost } from '@/types/types'
import { useLayoutEffect, useState } from 'react'

export default function PostItem({ boardid, title, view, likeCount, commentCount, createdAt }: IPost) {
  const createdDate = createdAt && formatDate(createdAt)
  return (
    <>
      <Link href={`/forum/${boardid}`} prefetch={false}>
        <div className="flex w-full h-[72px] justify-between items-center py-[12px] px-[11px] cursor-pointer">
          <div className="flex items-center">
            <UserIcon />
            <div className="mx-[11px]">
              <h1 className="max-h-[35px] text-[15px] leading-[19px] weight-400 select-none">{title}</h1>
              <div className="mt-[4px] max-h-[15px] leading-[15px] overflow-hidden">
                <span className="text-[12px] weight-450 pl-[2px] text-[rgba(113,113,113,0.7)] select-none">{`조회 ${view}`}</span>
                <span className="pl-[6px] text-viva-4 select-none">
                  <svg className="inline-block align-middle w-[12px] h-[12px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                  </svg>
                </span>
                <span className="text-[12px] weight-450 text-viva-4 select-none">{` ${likeCount}`}</span>
                <span className="pl-[6px] text-[rgba(38,187,152,0.9)] select-none">
                  <svg
                    className="inline-block [vertical-align: middle] w-[12px] h-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* <svg
                        className="inline-block [vertical-align: middle] w-[12px] h-[12px]`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                      </svg> */}
                </span>
                <span className="text-[12px] weight-450 text-[rgba(38,187,152,0.9)] select-none">{` ${commentCount}`}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[14px] weight-500 text-gray-3 select-none">{createdDate}</span>
          </div>
        </div>
        <Divider size="m_sm" />
      </Link>
    </>
  )
}

//       <div className="flex w-full h-[72px] justify-between items-center [padding: 12px 11px] cursor-pointer`}>
//         <div className="flex items-center`}>
//           <UserIcon />
//           <div className="mx-[11px]`}>
//             <div className="flex`}>
//               <h1 className="[max-height: 35px] [font-size: 16px] [line-height: 19px] [font-weight: 400] select-none`}>베스트드라이버.jpg</h1>
//               <span className="inline-block ml-[6px]`}>
//                 <svg className="text-viva-gray-2`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
//                   <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
//                   <path
//                     fillRule="evenodd"
//                     d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </span>
//             </div>
//             <div className="mt-[4px] [line-height: 15px]`}>
//               <span className="[font-size: 12px] [font-weight: 450] pl-[2px] text-viva-gray-1 select-none`}>조회 1</span>
//               <span className="[font-size: 12px] [font-weight: 450] pl-[4px] text-viva-gray-1 select-none`}>추천 0</span>
//             </div>
//           </div>
//         </div>
//         <div>
//           <span className="[font-size: 14px] [font-weight: 500] text-gray-3 select-none`}>01:23</span>
//         </div>
//       </div>
//       <Divider size="m_sm" />
//     </>
//   )
// }
