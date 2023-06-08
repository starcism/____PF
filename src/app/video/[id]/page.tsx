'use client'

import React from 'react'

type TProps = {
  params: {
    id: number | string;
  }
}

export default function Page(props: TProps) {
  return <div>boardid: {props.params.id}</div>
}