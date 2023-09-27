export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="z-[1] bg-white min-h-[100vh]">
        <div className="grid-container">{children}</div>
      </div>
    </>
  )
}