import { Button, Container, Input, Stack } from '@mui/material'
import React, { FC } from 'react'

const Login: FC = () => (
  <Container>
    <form>
      <Stack spacing={1}>
        <Input />
        <Input />
        <Button>Login</Button>
      </Stack>
    </form>
  </Container>
)

export default Login
