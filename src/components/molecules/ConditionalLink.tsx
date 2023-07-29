'use client'

import { MainMenuContext } from '@/libs/MainMenuProvider'
import { useContext } from 'react'
import LinkContainer, { ContainerVariant, LinkVariant } from '../atoms/LinkContainer'

interface Props {
  children: (session: string | null) => React.ReactNode
  hrefLoggedIn: string
  hrefLoggedOut: string
  size: ContainerVariant | LinkVariant
  session: string | null
  onClickLoggedIn?: React.MouseEventHandler<HTMLAnchorElement>
  onClickLoggedOut?: React.MouseEventHandler<HTMLAnchorElement>
}

export default function ConditionalLink({
  children,
  hrefLoggedIn,
  hrefLoggedOut,
  size,
  session,
  onClickLoggedIn = undefined,
  onClickLoggedOut = undefined,
}: Props) {
  return (
    <LinkContainer href={session ? hrefLoggedIn : hrefLoggedOut} size={size} onClick={session ? onClickLoggedIn : onClickLoggedOut}>
      {children(session)}
    </LinkContainer>
  )
}
