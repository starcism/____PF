import React from 'react'

async function getPost() {

}

export default async function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
