'use client'

import { createContext, useState } from 'react'

interface IMainMenuProvider {
  children: React.ReactNode
}

export const MainMenuContext = createContext({ mainMenu: false, handleMainMenu: (e: boolean) => {console.log(e)}});

export function MainMenuProvider({ children }: IMainMenuProvider) {
  const [mainMenu, setMainMenu] = useState(false)
  const handleMainMenu = (e: boolean) => {
    setMainMenu(e)
  }
  return <MainMenuContext.Provider value={{ mainMenu, handleMainMenu }}>{children}</MainMenuContext.Provider>
}