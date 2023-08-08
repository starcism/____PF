'use client'

import { createContext, useCallback, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const MainMenuContext = createContext({ mainMenu: false, handleMainMenu: (e: boolean): void => {} })

export default function MainMenuProvider({ children }: Props) {
  const [mainMenu, setMainMenu] = useState(false)
  const handleMainMenu = useCallback((e: boolean) => {
    setMainMenu(e)
  }, [])
  
  return <MainMenuContext.Provider value={{ mainMenu, handleMainMenu }}>{children}</MainMenuContext.Provider>
}