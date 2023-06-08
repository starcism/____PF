'use client'

import { MainMenuContext } from '@/libs/ContextProvider'
import { Session } from 'next-auth'
import { useContext } from 'react'
import LinkContainer, { ContainerVariant, LinkVariant } from '../atoms/LinkContainer'

interface IConditionalLink {
  children: (session: Session | null) => React.ReactNode
  hrefLoggedIn: string
  hrefLoggedOut: string
  size: ContainerVariant | LinkVariant
  session: Session | null
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
}: IConditionalLink) {
  return (
    <LinkContainer href={session ? hrefLoggedIn : hrefLoggedOut} size={size} onClick={session ? onClickLoggedIn : onClickLoggedOut}>
      {children(session)}
    </LinkContainer>
  )
}
