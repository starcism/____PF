import { ButtonToBackPage } from '../atoms/Button'

interface Props {
  children: React.ReactNode
  boardType: string
}

export default function PostLayout({ children, boardType }: Props) {
  return (
    <>
      <div className="fixed left-0 top-0 z-[1010] bg-white w-screen h-[54px]">
        <div className="flex-col justify-center">
          <div className="w-[100vw] h-[53px] custom-border-b-1 bg-white">
            <div className="flex justify-between items-center">
              <div className="h-[53px] w-[53px] flex justify-center items-center">
                <ButtonToBackPage />
              </div>
              <div className="flex items-center">
                <h1 className="text-[16px] font-500 text-gray-4 select-none">{boardType}</h1>
              </div>
              <div className="h-[53px] w-[53px] flex justify-center items-center select-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[54px]">
        {children}
      </div>
    </>
  )
}
