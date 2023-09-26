export default function LoadingSpinner({
  isPost = false,
  isBeforePost = false,
  isObserver = false,
}: {
  isPost?: boolean
  isBeforePost?: boolean
  isObserver?: boolean
}) {
  return (
    <>
      <div className={`w-full flex justify-center items-center ${isPost ? 'h-[150px]' : isBeforePost ? 'h-[305px]' : isObserver ? 'h-[80px]' : 'h-[50vh]'}`}>
        <div className="w-full h-full flex items-center justify-center">
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
