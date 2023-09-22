export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="z-[1] bg-white">
        <div className="grid-container">{children}</div>
      </div>
    </>
  )
}