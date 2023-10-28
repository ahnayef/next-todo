import React from 'react'
import CreateTodo from './CreateTodo'

export default function Page({ searchParams, }: { searchParams?: { [key: string]: string | string[] | undefined } }) {



  return (
    <>
      <CreateTodo searchParams={searchParams} />
    </>
  )
}
