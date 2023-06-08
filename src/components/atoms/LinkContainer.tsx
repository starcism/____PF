'use client'

import Link from 'next/link'

export type ContainerVariant = keyof typeof containerVariants
export type LinkVariant = keyof typeof linkVariants

interface ILinkContainer {
  children: React.ReactNode
  href: string
  size: ContainerVariant | LinkVariant
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const containerVariants = {
  m_menu_footer: "h-[3.5rem]",
  m_menu_footer_small: "h-[2.5rem]",
  m_menu_page: "h-[2.8rem]",
  m_menu_profile: "h-[5rem]",
  post: "w-full h-[8rem]",
  sm: "",
  m: "",
  lg: "",
}

const linkVariants = {
  m_menu_footer: "flex items-center",
  m_menu_footer_small: "flex items-center",
  m_menu_page: "flex items-center",
  m_menu_profile: "flex items-center",
  post: "",
  sm: "flex items-center",
  m: "flex items-center",
  lg: "flex items-center",
}

const styles = {
  container: ({ size }: { size: ContainerVariant }) => [containerVariants[size], "bg-white"].filter(Boolean).join(' '),
  link: ({ size }: { size: LinkVariant }) => [linkVariants[size], "w-full h-full bg-white"].filter(Boolean).join(' '),
}

export default function LinkContainer({ children, href, size, onClick = undefined }: ILinkContainer) {
  return (
    <>
      <div className={styles.container({ size })}>
        <Link href={href} className={styles.link({ size })} onClick={onClick}>
          {children}
        </Link>
      </div>
    </>
  )
}
