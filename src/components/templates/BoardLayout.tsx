'use client'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="z-[1] bg-white">
        <div className="flex flex-wrap justify-center">{children}</div>
      </div>
    </>
  )
}