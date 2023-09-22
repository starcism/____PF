export default function LoadingSpinner({ isPost = false, isBeforePost = false }: { isPost?: boolean; isBeforePost?: boolean }) {
  return (
    <>
      <div className={`w-full flex justify-center items-center ${isPost ? 'h-[150px]' : isBeforePost ? 'h-[305px]' : 'h-[50vh]'}`}>
        <div className="w-[200px] h-[200px] flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      </div>
    </>
  )
}

export function SmallLoadingSpinner({ size = '20px' }: { size?: string }) {
  return (
    <>
      <div className={`w-[${size}] h-[${size}] spinner-small`} />
    </>
  )
}
