'use client'

export default function Home() {
  return (
    <>
      <div className="flex pl-4 pt-8">
        일정표
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="mt-[52px] h-[100px] w-full bg-white flex items-center justify-center">LOGO</div>
      <div className="flex items-center justify-center h-[300px] w-full bg-gray-1">
        {/* <YoutubeViewer url={'https://youtu.be/SxHmoifp0oQ'} hasBorderRadius={true} /> */}
      </div>
    </>
  )
}
