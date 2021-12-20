import { Page, PageProps } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Container } from '@mui/material'
import React from 'react'

interface IUser {
  id: number
  username: string
  email: string
}

interface IHomePageProps extends PageProps {
  user: IUser
}

export default function Index() {
  const { user } = usePage<Page<IHomePageProps>>().props

  return (
    <Container>
      <h1>Home</h1>
      <p>Olá, {user?.username ?? 'pessoa'}!</p>
    </Container>
  )
}
